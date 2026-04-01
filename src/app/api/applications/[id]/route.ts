import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const application = await prisma.application.findUnique({
    where: { id },
    include: { notes: { orderBy: { createdAt: 'desc' } } },
  });

  if (!application) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(application);
}

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const body = await request.json();

  const updated = await prisma.application.update({
    where: { id },
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

  return NextResponse.json(updated);
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  await prisma.application.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
