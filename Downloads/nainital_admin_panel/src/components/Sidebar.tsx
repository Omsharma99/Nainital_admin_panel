import { useState } from 'react';
import * as Icons from 'lucide-react';
import { navGroups } from '@/data/dashboard';

type SidebarProps = { open: boolean; onClose: () => void };

type IconName = keyof typeof Icons;

export function Sidebar({ open, onClose }: SidebarProps) {
  const [active, setActive] = useState('Dashboard');
  return (
    <>
      <div className={`sidebar-backdrop ${open ? 'is-visible' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${open ? 'is-open' : ''}`}>
        <div className="brand">
          <div className="crest"><Icons.ShieldCheck size={28} /></div>
          <div><strong>NAINITAL</strong><b>PUBLIC SCHOOL</b><small>Knowledge · Character · Excellence</small></div>
        </div>
        <div className="sidebar-scroll">
          <button className="sidebar-home" onClick={() => setActive('Dashboard')}><Icons.Home size={16} /> Dashboard</button>
          {navGroups.map((group) => <div className="nav-group" key={group.label}>
            <span className="nav-label">{group.label}</span>
            {group.items.map(([icon, label]) => {
              const Icon = Icons[icon as IconName] as React.ComponentType<{ size?: number }>;
              return <button className={`nav-item ${active === label ? 'active' : ''}`} key={label} onClick={() => setActive(label)}><Icon size={15} /><span>{label}</span>{['Students', 'Parents', 'Teachers & Staff', 'Classes & Sections', 'Attendance', 'Homework', 'Assignments', 'Fee Management', 'Payments & Receipts'].includes(label) && <Icons.ChevronRight size={13} className="nav-arrow" />}{label === 'Notifications' && <em>12</em>}</button>;
            })}
          </div>)}
        </div>
      </aside>
    </>
  );
}
