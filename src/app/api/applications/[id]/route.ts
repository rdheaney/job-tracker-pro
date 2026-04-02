import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const application = await prisma.application.findFirst({
    where: { id, userId: session.user.id },
    include: { notes: { orderBy: { createdAt: 'desc' } } },
  });

  if (!application) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(application);
}

export async function PATCH(request: Request, { params }: Params) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const updated = await prisma.application.updateMany({
    where: { id, userId: session.user.id },
    data: {
      role: body.role,
      company: body.company,
      location: body.location,
      jobUrl: body.jobUrl || null,
      stage: body.stage,
      appliedOn: body.appliedOn ? new Date(`${body.appliedOn}T00:00:00.000Z`) : undefined,
      followUp: body.followUp
        ? new Date(`${body.followUp}T00:00:00.000Z`)
        : body.followUp === ''
          ? null
          : undefined,
    },
  });

  if (updated.count === 0) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }

  const fresh = await prisma.application.findFirst({
    where: { id, userId: session.user.id },
    include: { notes: { orderBy: { createdAt: 'desc' } } },
  });

  return NextResponse.json(fresh);
}

export async function DELETE(_request: Request, { params }: Params) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  await prisma.application.deleteMany({ where: { id, userId: session.user.id } });
  return new NextResponse(null, { status: 204 });
}
