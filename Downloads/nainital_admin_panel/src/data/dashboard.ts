export type Stat = {
  label: string;
  value: string;
  change: string;
  tone: 'blue' | 'green' | 'orange' | 'violet' | 'pink' | 'gold' | 'red' | 'indigo';
  icon: string;
};

export const stats: Stat[] = [
  { label: 'Total Students', value: '1,250', change: '+ 8% from last month', tone: 'blue', icon: 'users' },
  { label: 'Total Parents', value: '2,380', change: '+ 10% from last month', tone: 'green', icon: 'user-round' },
  { label: 'Total Teachers', value: '85', change: '+ 4% from last month', tone: 'orange', icon: 'presentation' },
  { label: 'Total Staff', value: '35', change: '+ 4% from last month', tone: 'violet', icon: 'briefcase' },
  { label: 'Attendance Today', value: '94%', change: '+ 2% from yesterday', tone: 'pink', icon: 'circle-check' },
  { label: 'Fee Collection (This Month)', value: '₹12.5 Lakh', change: '+ 18% from last month', tone: 'gold', icon: 'indian-rupee' },
  { label: 'Pending Fees', value: '₹4.2 Lakh', change: '- 5% from last month', tone: 'red', icon: 'receipt-text' },
  { label: 'Live Classes Today', value: '8', change: '3 ongoing', tone: 'indigo', icon: 'video' },
];

export const navGroups = [
  { label: 'Main', items: [['LayoutDashboard', 'Dashboard'], ['ChartNoAxesCombined', 'Analytics'], ['CalendarDays', 'Calendar'], ['Bell', 'Notifications']] },
  { label: 'Academics', items: [['UsersRound', 'Students'], ['ContactRound', 'Parents'], ['GraduationCap', 'Teachers & Staff'], ['BookOpen', 'Classes & Sections'], ['Library', 'Subjects'], ['CalendarClock', 'Timetable'], ['ClipboardCheck', 'Attendance'], ['NotebookPen', 'Homework'], ['ClipboardList', 'Assignments'], ['Video', 'Live Classes'], ['FileCheck2', 'Examinations'], ['BadgeCheck', 'Assessments'], ['ChartNoAxesColumnIncreasing', 'Results & Report Cards'], ['BookMarked', 'Study Material'], ['LibraryBig', 'Library']] },
  { label: 'Finance', items: [['WalletCards', 'Fee Management'], ['CreditCard', 'Payments & Receipts'], ['Receipt', 'Fee Reminders'], ['HandCoins', 'Salary & Payroll'], ['Banknote', 'Expenses'], ['FileBarChart', 'Financial Reports']] },
  { label: 'Communication', items: [['MessagesSquare', 'Notices & Announcements'], ['Megaphone', 'Messages'], ['Users', 'Events & Activities'], ['UserRoundCheck', 'Parent-Teacher Meetings'], ['Video', 'Video Call Meetings']] },
  { label: 'Other Modules', items: [['BusFront', 'Transport Management'], ['Building2', 'Hostel Management'], ['HeartPulse', 'Medical & Health'], ['ShieldCheck', 'Visitor Management']] },
];

export const schedule = [
  ['08:00 AM', '8-A', 'Mathematics', 'Room 101', 'Mrs. Sharma'],
  ['08:45 AM', '8-B', 'Science', 'Room 102', 'Mr. Verma'],
  ['09:30 AM', '9-A', 'English', 'Room 201', 'Ms. Mehta'],
  ['10:30 AM', '10-A', 'Computer (Lab)', 'Lab 1', 'Mr. Singh'],
  ['11:15 AM', '11-B', 'Physics', 'Room 301', 'Mrs. Gupta'],
];

export const activities = [
  ['Fee payment received', 'Aarav Kumar · Class 8-A', '₹15,000', '10 min ago', 'green'],
  ['Homework submitted', 'Ananya Singh · Class 7-B', '', '20 min ago', 'violet'],
  ['New admission', 'Rohan Verma · Class 6-A', '', '30 min ago', 'blue'],
  ['Leave application', 'Priya Sharma · Class 9-A', '', '45 min ago', 'orange'],
  ['New staff joined', 'Mr. Amit Singh · Sports Teacher', '', '1 hour ago', 'pink'],
];

export const events = [
  ['02', 'OCT', 'Gandhi Jayanti', 'School Holiday', 'All Classes'],
  ['05', 'OCT', 'Parent Teacher Meeting', '10:00 AM - 1:00 PM', 'School Campus'],
  ['12', 'OCT', 'Half Yearly Examination', 'Class 1 - 12', 'As per schedule'],
  ['20', 'OCT', 'Annual Function', 'School Auditorium', '04:00 PM'],
  ['25', 'OCT', 'Science Exhibition', 'Main Hall', '10:00 AM'],
];

export const liveClasses = [
  ['https://images.pexels.com/photos/8423069/pexels-photo-8423069.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Class 8-A · Mathematics', 'Mrs. Sharma', '32 students', '00:25:15'],
  ['https://images.pexels.com/photos/5212321/pexels-photo-5212321.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Class 9-B · Science', 'Mr. Verma', '30 students', '00:15:40'],
  ['https://images.pexels.com/photos/6981004/pexels-photo-6981004.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Class 11-A · Physics', 'Mrs. Gupta', '28 students', '00:42:10'],
];
