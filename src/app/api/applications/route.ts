import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const applications = await prisma.application.findMany({
    orderBy: { appliedOn: 'desc' },
    include: { notes: { orderBy: { createdAt: 'desc' }, take: 1 } },
  });

  return NextResponse.json(applications);
}

export async function POST(request: Request) {
  const body = await request.json();

  const created = await prisma.application.create({
    data: {
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
