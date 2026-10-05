import { BriefcaseBusiness, CircleCheck, IndianRupee, Presentation, ReceiptText, UserRound, Users, Video } from 'lucide-react';
import type { Stat } from '@/data/dashboard';

const icons = { users: Users, 'user-round': UserRound, presentation: Presentation, briefcase: BriefcaseBusiness, 'circle-check': CircleCheck, 'indian-rupee': IndianRupee, 'receipt-text': ReceiptText, video: Video };

export function StatCard({ stat }: { stat: Stat }) {
  const Icon = icons[stat.icon as keyof typeof icons];
  return <article className={`stat-card ${stat.tone}`}><div className="stat-icon"><Icon size={20} /></div><div className="stat-copy"><span>{stat.label}</span><strong>{stat.value}</strong><small className={stat.change.startsWith('-') ? 'down' : ''}>{stat.change}</small></div></article>;
}
