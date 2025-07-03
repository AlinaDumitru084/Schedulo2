import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.43.2';

// Define types for incoming data
interface Task {
  id: string;
  title: string;
  due_date: string | null; // ISO string
  is_completed: boolean;
  is_priority: boolean;
  priority: 'High' | 'Medium' | 'Low' | null;
}

interface CalendarEvent {
  id: string;
  title: string;
  start_time: string; // ISO string
  end_time: string;   // ISO string
}

// Helper function to check for overlap
function hasOverlap(taskDueDate: Date, eventStart: Date, eventEnd: Date): boolean {
  // If task has a specific time, check for time overlap
  // For simplicity, if taskDueDate is just a date (no time), consider it an all-day task
  // and check if it falls within the event's day.
  const taskDay = new Date(taskDueDate.getFullYear(), taskDueDate.getMonth(), taskDueDate.getDate());
  const eventStartDay = new Date(eventStart.getFullYear(), eventStart.getMonth(), eventStart.getDate());
  const eventEndDay = new Date(eventEnd.getFullYear(), eventEnd.getMonth(), eventEnd.getDate());

  // Check if task day overlaps with event day range
  if (taskDay.getTime() >= eventStartDay.getTime() && taskDay.getTime() <= eventEndDay.getTime()) {
    // If task has a time, check for specific time overlap
    if (taskDueDate.getHours() !== 0 || taskDueDate.getMinutes() !== 0 || taskDueDate.getSeconds() !== 0) {
      // Assuming tasks are 1 hour long for time overlap
      return (taskDueDate.getTime() < eventEnd.getTime() && eventStart.getTime() < taskDueDate.getTime() + 60 * 60 * 1000);
    }
    return true; // All-day task overlaps with event day
  }
  return false;
}

// Function to find the next available day
function findNextAvailableDay(conflictingDate: Date, existingEvents: CalendarEvent[]): Date {
  let nextDay = new Date(conflictingDate);
  nextDay.setDate(nextDay.getDate() + 1); // Start checking from the next day

  while (true) {
    let isAvailable = true;
    for (const event of existingEvents) {
      const eventStart = new Date(event.start_time);
      const eventEnd = new Date(event.end_time);

      // Check if the nextDay conflicts with any existing event
      if (hasOverlap(nextDay, eventStart, eventEnd)) {
        isAvailable = false;
        break;
      }
    }

    if (isAvailable) {
      return nextDay;
    } else {
      nextDay.setDate(nextDay.getDate() + 1); // Move to the next day
    }
  }
}

serve(async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 405,
    });
  }

  try {
    const { user_id, tasks, calendar_events } = await req.json();

    if (!user_id || !tasks || !calendar_events) {
      return new Response(JSON.stringify({ error: 'Missing user_id, tasks, or calendar_events' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          persistSession: false,
        },
      },
    );

    const conflicts: any[] = [];
    const suggestions: any[] = [];

    for (const task of tasks) {
      if (task.due_date) {
        const taskDueDate = new Date(task.due_date);
        for (const event of calendar_events) {
          const eventStart = new Date(event.start_time);
          const eventEnd = new Date(event.end_time);

          if (hasOverlap(taskDueDate, eventStart, eventEnd)) {
            conflicts.push({
              type: 'overlap',
              task_id: task.id,
              event_id: event.id,
              description: `Task "${task.title}" conflicts with event "${event.title}".`,
            });

            const suggestedNewDate = findNextAvailableDay(taskDueDate, calendar_events);
            suggestions.push({
              task_id: task.id,
              suggested_due_date: suggestedNewDate.toISOString(),
              reason: `Conflict with calendar event "${event.title}". Moved to ${suggestedNewDate.toLocaleDateString()}.`,
            });
            // For simplicity, we'll only suggest one move per task for the first conflict found.
            break;
          }
        }
      }
    }

    return new Response(JSON.stringify({ conflicts, suggestions }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error: unknown) {
    console.error('Request processing error:', error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});