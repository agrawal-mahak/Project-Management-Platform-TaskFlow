export const mockActivities = [
  { id: 1, user: 'John Doe', action: 'moved task', target: 'ERP-15', detail: 'to Done', time: '10 minutes ago' },
  { id: 2, user: 'Jane Smith', action: 'created task', target: 'ERP-18', detail: '"Fix Navbar layout"', time: '1 hour ago' },
  { id: 3, user: 'Admin User', action: 'assigned', target: 'Jane Smith', detail: 'to ERP-18', time: '1 hour ago' },
  { id: 4, user: 'Divya Jain', action: 'changed priority of', target: 'ERP-12', detail: 'to Urgent', time: '3 hours ago' },
  { id: 5, user: 'John Doe', action: 'commented on', target: 'ERP-09', detail: '"I will start working on this tomorrow."', time: 'Yesterday' },
  { id: 6, user: 'Jane Smith', action: 'moved task', target: 'ERP-14', detail: 'to In Progress', time: 'Yesterday' },
  { id: 7, user: 'Admin User', action: 'deleted task', target: 'ERP-07', detail: 'permanently', time: '2 days ago' },
  { id: 8, user: 'Divya Jain', action: 'uploaded attachment to', target: 'ERP-05', detail: '"design_v2.png"', time: '3 days ago' },
];

export const mockDevelopmentPRs = [
  { id: '#42', title: 'feat: add kanban drag and drop', repo: 'taskflow-frontend', branch: 'feature/dnd', status: 'merged', time: '2 hours ago' },
  { id: '#43', title: 'fix: resolving JWT expiration issue', repo: 'taskflow-backend', branch: 'bugfix/jwt-auth', status: 'open', time: '5 hours ago' },
  { id: '#44', title: 'chore: update dependencies', repo: 'taskflow-frontend', branch: 'chore/deps', status: 'merged', time: '1 day ago' },
  { id: '#45', title: 'feat: implement timesheet UI', repo: 'taskflow-frontend', branch: 'feature/timesheet', status: 'open', time: '1 day ago' },
  { id: '#46', title: 'fix: crashing on null avatar', repo: 'taskflow-frontend', branch: 'bugfix/avatar-crash', status: 'merged', time: '2 days ago' },
  { id: '#47', title: 'docs: update API endpoints', repo: 'taskflow-backend', branch: 'docs/api', status: 'merged', time: '2 days ago' },
  { id: '#48', title: 'feat: timeline gantt chart', repo: 'taskflow-frontend', branch: 'feature/timeline', status: 'open', time: '3 days ago' },
  { id: '#49', title: 'refactor: split mock data', repo: 'taskflow-frontend', branch: 'refactor/mock-data', status: 'open', time: '3 days ago' },
];

export const mockTimesheets = [
  { id: 1, name: 'Divya Jain', logged: 32, capacity: 40 },
  { id: 2, name: 'John Doe', logged: 45, capacity: 40 },
  { id: 3, name: 'Jane Smith', logged: 20, capacity: 40 },
  { id: 4, name: 'Admin User', logged: 8, capacity: 40 },
  { id: 5, name: 'Alex Johnson', logged: 38, capacity: 40 },
  { id: 6, name: 'Samantha Lee', logged: 40, capacity: 40 },
  { id: 7, name: 'Michael Brown', logged: 12, capacity: 20 },
  { id: 8, name: 'Emily White', logged: 42, capacity: 35 },
];

export const mockCodeFiles = [
  { name: 'client', type: 'folder', message: 'feat: add UI tabs', time: '1 hour ago' },
  { name: 'server', type: 'folder', message: 'fix: update card controller', time: '2 hours ago' },
  { name: 'package.json', type: 'file', message: 'chore: update dependencies', time: 'Yesterday' },
  { name: 'README.md', type: 'file', message: 'docs: update readme instructions', time: 'Last week' },
  { name: 'docker-compose.yml', type: 'file', message: 'chore: add docker support', time: '2 weeks ago' },
  { name: '.gitignore', type: 'file', message: 'chore: ignore environment files', time: '1 month ago' },
  { name: 'LICENSE', type: 'file', message: 'docs: add MIT license', time: '1 month ago' },
  { name: 'tsconfig.json', type: 'file', message: 'config: strict typescript mode', time: '1 month ago' },
];

export const mockTimelineTasks = [
  { name: 'Setup Authentication', start: 0, width: 15, color: 'var(--accent-green)' },
  { name: 'Build Kanban Board UI', start: 10, width: 30, color: 'var(--accent-blue)' },
  { name: 'Integrate API Routes', start: 35, width: 20, color: 'var(--accent-orange)' },
  { name: 'Create Mockup Pages', start: 50, width: 15, color: 'var(--accent-purple)' },
  { name: 'Extract Mock Data', start: 60, width: 10, color: 'var(--accent-blue)' },
  { name: 'Add Unit Tests', start: 65, width: 20, color: 'var(--text-secondary)' },
  { name: 'Deploy to Staging', start: 80, width: 10, color: 'var(--accent-red)' },
  { name: 'Production Launch', start: 90, width: 10, color: 'var(--text-heading)' },
];
