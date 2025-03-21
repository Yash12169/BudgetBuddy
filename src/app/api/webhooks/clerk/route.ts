// app/api/webhooks/clerk/route.ts
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
export async function POST(req: Request) {
  // Get the headers
  const headerPayload =await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no svix headers, return error
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing svix headers', { status: 400 });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '');

  let evt: WebhookEvent;

  // Verify the webhook
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }

  // Handle the webhook event
  const eventType = evt.type;

  try {
    if (eventType === 'user.created') {
      // Extract user data from the webhook payload
      const { id, email_addresses, first_name, last_name, image_url } = evt.data;
      
      // Get primary email
      const primaryEmail = email_addresses.find(email => email.id === evt.data.primary_email_address_id);
      const emailAddress = primaryEmail ? primaryEmail.email_address : null;

      // Create a new user in your database
      await prisma.user.create({
        data: {
          id: id,
          email: emailAddress,
          firstName: first_name || '',
          lastName: last_name || '',
          profileImage: image_url || '',
          // Add any other fields you want to store
        },
      });

      console.log(`User created: ${id}`);
    } 
    else if (eventType === 'user.updated') {
      // Extract user data from the webhook payload
      const { id, email_addresses, username, first_name, last_name, image_url } = evt.data;
      
      // Get primary email
      const primaryEmail = email_addresses.find(email => email.id === evt.data.primary_email_address_id);
      const emailAddress = primaryEmail ? primaryEmail.email_address : null;

      // Update user in your database
      await prisma.user.update({
        where: { id: id },
        data: {
          email: emailAddress,
          username: username || '',
          firstName: first_name || '',
          lastName: last_name || '',
          profileImage: image_url || '',
          // Update any other fields as needed
        },
      });

      console.log(`User updated: ${id}`);
    }
    else if (eventType === 'user.deleted') {
      // Extract user ID from the webhook payload
      const { id } = evt.data;

      // Delete user from your database (or mark as inactive)
      await prisma.user.delete({
        where: { id: id },
      });

      console.log(`User deleted: ${id}`);
    }

    return new Response('Webhook processed successfully', { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response('Error processing webhook', { status: 500 });
  }
}