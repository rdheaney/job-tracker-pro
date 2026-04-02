import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const applications = await prisma.application.findMany({
    where: { userId: session.user.id },
    orderBy: { appliedOn: 'desc' },
    include: { notes: { orderBy: { createdAt: 'desc' }, take: 1 } },
  });

  return NextResponse.json(applications);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  const created = await prisma.application.create({
    data: {
      userId: session.user.id,
      role: body.role,
      company: body.company,
      location: body.location ?? '',
      jobUrl: body.jobUrl || null,
      stage: body.stage,
      appliedOn: new Date(`${body.appliedOn}T00:00:00.000Z`),
      followUp: body.followUp ? new Date(`${body.followUp}T00:00:00.000Z`) : null,
      notes: body.notes
        ? {
            create: [{ content: body.notes }],
          }
        : undefined,
    },
  });

  return NextResponse.json(created, { status: 201 });
}
