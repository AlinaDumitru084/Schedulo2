import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.43.2';

serve(async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 405,
    });
  }

  try {
    // This function will be triggered by a daily schedule.
    // It needs to:
    // 1. Fetch all users.
    // 2. For each user, fetch tasks due today.
    // 3. Send a push notification to the user with a summary of their tasks.

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          persistSession: false,
        },
      },
    );

    // Fetch all users (or users who have enabled notifications)
    const { data: users, error: usersError } = await supabaseClient
      .from('profiles') // Assuming a 'profiles' table linked to auth.users
      .select('id, expo_push_token');

    if (usersError) {
      console.error('Error fetching users:', usersError);
      return new Response(JSON.stringify({ error: usersError.message }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Start of tomorrow

    for (const user of users) {
      // Fetch tasks due today for each user
      const { data: tasks, error: tasksError } = await supabaseClient
        .from('tasks')
        .select('title, due_date')
        .eq('user_id', user.id)
        .eq('is_completed', false)
        .gte('due_date', today.toISOString())
        .lt('due_date', tomorrow.toISOString());

      if (tasksError) {
        console.error(`Error fetching tasks for user ${user.id}:`, tasksError);
        continue; // Continue to the next user even if one fails
      }

      if (tasks && tasks.length > 0) {
        const taskSummary = tasks.map((task: { title: string }) => `- ${task.title}`).join('\n');
        const notificationMessage = `You have ${tasks.length} tasks due today:\n${taskSummary}`;

        // TODO: Implement actual push notification sending logic here.
        // This would typically involve a push notification service (e.g., Expo Push Notifications, OneSignal, Firebase Cloud Messaging).
        // For now, we'll just log the notification message.
        // Send push notification
        if (user.expo_push_token) {
          await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Accept-encoding': 'gzip, deflate',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              to: user.expo_push_token,
              sound: 'default',
              title: 'Schedulo Daily Tasks',
              body: notificationMessage,
              data: { someData: 'goes here' },
            }),
          });
        }
      }
    }

    return new Response(JSON.stringify({ message: 'Daily notifications processed' }), {
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