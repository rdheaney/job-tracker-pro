import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rows = [
  {
    role: 'Frontend Engineer',
    company: 'Northbeam Labs',
    location: 'Remote',
    stage: 'Interview',
    appliedOn: new Date('2026-03-22T00:00:00.000Z'),
    followUp: new Date('2026-04-03T00:00:00.000Z'),
    note: 'Spoke with recruiter. Strong interest in React + TypeScript.',
  },
  {
    role: 'React Developer',
    company: 'Pocketbase',
    location: 'Remote',
    stage: 'Applied',
    appliedOn: new Date('2026-03-27T00:00:00.000Z'),
    followUp: new Date('2026-04-04T00:00:00.000Z'),
    note: '',
  },
  {
    role: 'Product Engineer',
    company: 'Aster Studio',
    location: 'New York, NY',
    stage: 'Offer',
    appliedOn: new Date('2026-03-14T00:00:00.000Z'),
    followUp: new Date('2026-04-01T00:00:00.000Z'),
    note: 'Received offer. Comparing packages.',
  },
  {
    role: 'Full Stack Engineer',
    company: 'Meadowlark',
    location: 'Austin, TX',
    stage: 'Phone Screen',
    appliedOn: new Date('2026-03-30T00:00:00.000Z'),
    followUp: new Date('2026-04-07T00:00:00.000Z'),
    note: '',
  },
];

async function main() {
  await prisma.note.deleteMany();
  await prisma.application.deleteMany();

  for (const row of rows) {
    await prisma.application.create({
      data: {
        role: row.role,
        company: row.company,
        location: row.location,
        stage: row.stage,
        appliedOn: row.appliedOn,
        followUp: row.followUp,
        notes: row.note ? { create: [{ content: row.note }] } : undefined,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
