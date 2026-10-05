import { Bell, CalendarDays, Menu, Search } from 'lucide-react';

type HeaderProps = { onMenu: () => void };

export function Header({ onMenu }: HeaderProps) {
  return <header className="topbar">
    <button className="menu-btn" aria-label="Open menu" onClick={onMenu}><Menu size={20} /></button>
    <div className="search"><Search size={16} /><input placeholder="Search students, parents, teachers, classes, fees, etc..." /></div>
    <div className="top-actions">
      <button className="academic-year"><CalendarDays size={14} /> Academic Year 2024 - 2025</button>
      <button className="notification-btn"><Bell size={18} /><span>12</span></button>
      <div className="profile"><div className="avatar">AM</div><div><strong>Admin</strong><small>Super Admin</small></div></div>
    </div>
  </header>;
}
