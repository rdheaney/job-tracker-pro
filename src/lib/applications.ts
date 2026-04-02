import { prisma } from '@/lib/prisma';
import type { Application, Stage } from '@/lib/types';

const VALID_STAGES: Stage[] = [
  'Applied',
  'Phone Screen',
  'Interview',
  'Offer',
  'Rejected',
  'Withdrawn',
];

function toDate(value: string): Date {
  return new Date(`${value}T00:00:00.000Z`);
}

function toDateInput(value: Date | null): string {
  if (!value) return '';
  return value.toISOString().slice(0, 10);
}

function toStage(value: string): Stage {
  return VALID_STAGES.includes(value as Stage) ? (value as Stage) : 'Applied';
}

function mapRowToApplication(
  row: {
    id: string;
    role: string;
    company: string;
    location: string;
    jobUrl: string | null;
    stage: string;
    appliedOn: Date;
    followUp: Date | null;
    notes: { content: string }[];
  },
): Application {
  return {
    id: row.id,
    role: row.role,
    company: row.company,
    location: row.location,
    jobUrl: row.jobUrl ?? '',
    stage: toStage(row.stage),
    appliedOn: toDateInput(row.appliedOn),
    followUp: toDateInput(row.followUp),
    notes: row.notes[0]?.content ?? '',
  };
}

export async function listApplications(userId: string): Promise<Application[]> {
  const rows = await prisma.application.findMany({
    where: { userId },
    orderBy: { appliedOn: 'desc' },
    include: { notes: { orderBy: { createdAt: 'desc' }, take: 1 } },
  });

  return rows.map(mapRowToApplication);
}

export async function getApplicationById(
  id: string,
  userId: string,
): Promise<Application | null> {
  const row = await prisma.application.findFirst({
    where: { id, userId },
    include: { notes: { orderBy: { createdAt: 'desc' }, take: 1 } },
  });

  if (!row) return null;
  return mapRowToApplication(row);
}

export async function createApplication(
  userId: string,
  input: Omit<Application, 'id'>,
): Promise<void> {
  await prisma.application.create({
    data: {
      userId,
      role: input.role,
      company: input.company,
      location: input.location,
      jobUrl: input.jobUrl || null,
      stage: input.stage,
      appliedOn: toDate(input.appliedOn),
      followUp: input.followUp ? toDate(input.followUp) : null,
      notes: input.notes
        ? {
            create: [{ content: input.notes }],
          }
        : undefined,
    },
  });
}

export async function updateApplication(
  id: string,
  userId: string,
  input: Omit<Application, 'id'>,
): Promise<void> {
  await prisma.$transaction(async (tx) => {
    const updated = await tx.application.updateMany({
      where: { id, userId },
      data: {
        role: input.role,
        company: input.company,
        location: input.location,
        jobUrl: input.jobUrl || null,
        stage: input.stage,
        appliedOn: toDate(input.appliedOn),
        followUp: input.followUp ? toDate(input.followUp) : null,
      },
    });

    if (updated.count === 0) {
      return;
    }

    await tx.note.deleteMany({
      where: { applicationId: id, application: { userId } },
    });

    if (input.notes) {
      await tx.note.create({
        data: {
          applicationId: id,
          content: input.notes,
        },
      });
    }
  });
}

export async function deleteApplication(id: string, userId: string): Promise<void> {
  await prisma.application.deleteMany({ where: { id, userId } });
}
