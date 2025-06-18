import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const headerPayload = await headers();
    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');

    console.log('Received webhook with headers:', {
      svix_id,
      svix_timestamp,
      svix_signature: svix_signature ? 'present' : 'missing',
    });

    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.error('Missing svix headers:', { svix_id, svix_timestamp, svix_signature });
      return new Response('Error: Missing svix headers', { status: 400 });
    }

    const payload = await req.json();
    console.log('Received webhook payload:', JSON.stringify(payload, null, 2));

    const body = JSON.stringify(payload);
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '');

    let evt: WebhookEvent;
    try {
      evt = wh.verify(body, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      }) as WebhookEvent;
      console.log('Webhook verified successfully');
    } catch (err) {
      console.error('Error verifying webhook:', err);
      return new Response('Error verifying webhook', { status: 400 });
    }

    const eventType = evt.type;
    console.log('Processing webhook event:', eventType);

    try {
      if (eventType === 'user.created') {
        console.log('Processing user.created event');
        const { id, email_addresses, first_name, last_name, image_url } = evt.data;

        const primaryEmail = email_addresses.find(email => email.id === evt.data.primary_email_address_id);
        const emailAddress = primaryEmail ? primaryEmail.email_address : null;

        if (!emailAddress) {
          console.error('No primary email found for user:', id);
          return new Response('Error: No primary email found', { status: 400 });
        }

        try {
          // Create user and default related financial records in a transaction
          const result = await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
              data: {
                id: id,
                email: emailAddress,
                firstName: first_name || '',
                lastName: last_name || '',
                profileImage: image_url || '',
              },
            });

            const financial = await tx.financials.create({
              data: {
                id: id,
                userId: id,
                salary: 0,
                expenses: 0,
                extraExpenses: 0,
                insurancePremium: 0,
              },
            });

            const debt = await tx.debt.create({
              data: {
                id: id,
                userId: id,
                loanAmount: 0,
                loanTenure: 0,
                interestRate: 0,
                emiAmount: 0,
              },
            });

            const emergencyFund = await tx.emergencyFund.create({
              data: {
                id: id,
                userId: id,
                emergencyFund: 0,
                status: '', // Set default status
              },
            });

            return { user, financial, debt, emergencyFund };
          });

          console.log('Successfully created user and default financial records:', result);
        } catch (dbError) {
          console.error('Database error while creating user and financial records:', dbError);
          throw dbError;
        }
      } else if (eventType === 'user.updated') {
        console.log('Processing user.updated event');
        const { id, email_addresses, first_name, last_name, image_url } = evt.data;

        const primaryEmail = email_addresses.find(email => email.id === evt.data.primary_email_address_id);
        const emailAddress = primaryEmail ? primaryEmail.email_address : null;

        if (!emailAddress) {
          console.error('No primary email found for user:', id);
          return new Response('Error: No primary email found', { status: 400 });
        }

        try {
          const user = await prisma.user.update({
            where: { id: id },
            data: {
              email: emailAddress,
              firstName: first_name || '',
              lastName: last_name || '',
              profileImage: image_url || '',
            },
          });

          console.log('Successfully updated user:', user);
        } catch (dbError) {
          console.error('Database error while updating user:', dbError);
          throw dbError;
        }
      } else if (eventType === 'user.deleted') {
        console.log('Processing user.deleted event');
        const { id } = evt.data;

        try {
          await prisma.$transaction(async (tx) => {
            await tx.financials.deleteMany({ where: { userId: id } });
            await tx.debt.deleteMany({ where: { userId: id } });
            await tx.emergencyFund.deleteMany({ where: { userId: id } });
            await tx.lifeGoal.deleteMany({ where: { userId: id } });

            await tx.user.delete({ where: { id: id } });
          });

          console.log('Successfully deleted user and related records:', id);
        } catch (dbError) {
          console.error('Database error while deleting user:', dbError);
          throw dbError;
        }
      }

      return new Response(JSON.stringify({ success: true, message: 'Webhook processed successfully' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error processing webhook event:', error);
      return new Response(JSON.stringify({
        success: false,
        error: 'Error processing webhook',
        details: error instanceof Error ? error.message : 'Unknown error',
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Unexpected error in webhook handler:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Unexpected error',
      details: error instanceof Error ? error.message : 'Unknown error',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await prisma.$disconnect();
  }
}
