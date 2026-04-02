import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const applicationId = searchParams.get('applicationId');

  if (!applicationId) {
    return NextResponse.json(
      { message: 'applicationId query param is required' },
      { status: 400 },
    );
  }

  const notes = await prisma.note.findMany({
    where: { applicationId, application: { userId: session.user.id } },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(notes);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  if (!body.applicationId || !body.content) {
    return NextResponse.json(
      { message: 'applicationId and content are required' },
      { status: 400 },
    );
  }

  const application = await prisma.application.findFirst({
    where: { id: body.applicationId, userId: session.user.id },
  });

  if (!application) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }

  const note = await prisma.note.create({
    data: {
      applicationId: body.applicationId,
      content: body.content,
    },
  });

  return NextResponse.json(note, { status: 201 });
}
