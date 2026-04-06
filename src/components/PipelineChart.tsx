'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import type { Stage } from '@/lib/types';

const stageColors: Record<Stage, string> = {
  Applied: '#127a72',
  'Phone Screen': '#3730a3',
  Interview: '#f3b34b',
  Offer: '#152038',
  Rejected: '#d35f57',
  Withdrawn: '#71717a',
};

interface Props {
  data: { stage: Stage; count: number }[];
}

export function PipelineChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ left: 8, right: 24, top: 4, bottom: 4 }}
      >
        <XAxis
          type="number"
          allowDecimals={false}
          tick={{ fontSize: 12, fill: '#5a6477' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="stage"
          width={100}
          tick={{ fontSize: 12, fill: '#5a6477' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          cursor={{ fill: 'rgba(21,32,56,0.04)' }}
          contentStyle={{
            border: '1px solid #e6dfcf',
            borderRadius: '12px',
            fontSize: '13px',
            background: '#fffdf8',
          }}
        />
        <Bar dataKey="count" radius={[0, 6, 6, 0]} maxBarSize={28} name="Applications">
          {data.map((entry) => (
            <Cell key={entry.stage} fill={stageColors[entry.stage]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
