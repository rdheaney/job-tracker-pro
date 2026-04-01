import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const applicationId = searchParams.get('applicationId');

  if (!applicationId) {
    return NextResponse.json(
      { message: 'applicationId query param is required' },
      { status: 400 },
    );
  }

  const notes = await prisma.note.findMany({
    where: { applicationId },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(notes);
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.applicationId || !body.content) {
    return NextResponse.json(
      { message: 'applicationId and content are required' },
      { status: 400 },
    );
  }

  const note = await prisma.note.create({
    data: {
      applicationId: body.applicationId,
      content: body.content,
    },
  });

  return NextResponse.json(note, { status: 201 });
}
