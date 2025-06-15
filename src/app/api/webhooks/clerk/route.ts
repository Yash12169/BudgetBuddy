import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
export async function POST(req: Request) {
  const headerPayload =await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing svix headers', { status: 400 });
  }
  const payload = await req.json();
  const body = JSON.stringify(payload);
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '');

  let evt: WebhookEvent;
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
  const eventType = evt.type;
  try {
    if (eventType === 'user.created') {
      const { id, email_addresses, first_name, last_name, image_url } = evt.data;
      
      const primaryEmail = email_addresses.find(email => email.id === evt.data.primary_email_address_id);
      const emailAddress = primaryEmail ? primaryEmail.email_address : null;

      await prisma.user.create({
        data: {
          id: id,
          email: emailAddress,
          firstName: first_name || '',
          lastName: last_name || '',
          profileImage: image_url || '',
        },
      });
    } 
    else if (eventType === 'user.updated') {
      const { id, email_addresses, username, first_name, last_name, image_url } = evt.data;
      
      const primaryEmail = email_addresses.find(email => email.id === evt.data.primary_email_address_id);
      const emailAddress = primaryEmail ? primaryEmail.email_address : null;

      await prisma.user.update({
        where: { id: id },
        data: {
          email: emailAddress,
          username: username || '',
          firstName: first_name || '',
          lastName: last_name || '',
          profileImage: image_url || '',
        },
      });
    }
    else if (eventType === 'user.deleted') {
      const { id } = evt.data;

      await prisma.user.delete({
        where: { id: id },
      });
    }

    return new Response('Webhook processed successfully', { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response('Error processing webhook', { status: 500 });
  }
}