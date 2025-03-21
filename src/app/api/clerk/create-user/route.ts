import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }

  try {
    // Parse request body
    const body = await req.json();
    const { data } = body;

    if (!data || !data.id) {
      return NextResponse.json({ error: 'Invalid webhook payload' }, { status: 400 });
    }

    const userId = data.id;
    const email = data.email_addresses?.[0]?.email_address || '';
    const firstName = data.first_name || '';
    const lastName = data.last_name || '';

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          id: userId,
          email,
          firstName,
          lastName,
        },
      });
    }

    return NextResponse.json({ message: 'User processed successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
