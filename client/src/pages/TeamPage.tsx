import { useEffect, useState } from 'react';
import { fetchUsers, updateUserRole, getUserFromStorage } from '../api/authApi';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';

interface UserData {
  _id: string;
  name: string;
  email: string;
  role?: string;
}

const TeamPage = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const currentUser = getUserFromStorage();
  const isAdmin = currentUser?.role === 'admin';

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const data = await fetchUsers();
      setUsers(data);
    } catch {
      toast.error('Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadUsers();
    } else {
      setIsLoading(false);
    }
  }, [isAdmin]);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await updateUserRole(userId, newRole);
      setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u));
      toast.success('Role updated successfully');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to update role');
    }
  };

  if (!isAdmin) {
    return (
      <>
        <Navbar isManager={false} isAdmin={false} onCreateClick={() => {}} />
        <div style={{ padding: 40, textAlign: 'center', color: '#f87168' }}>
          <h2>Access Denied</h2>
          <p>You must be an admin to view this page.</p>
        </div>
      </>
    );
  }

  return (
    <div style={{ backgroundColor: '#1d2125', minHeight: '100vh', color: '#b6c2cf' }}>
      <Navbar isManager={true} isAdmin={true} onCreateClick={() => {}} />
      <div style={{ padding: '40px', maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{ marginBottom: 8, color: '#c7d1db' }}>Team Management</h1>
        <p style={{ marginBottom: 32, fontSize: 14 }}>View your workspace members and manage their roles.</p>
        
        {isLoading ? (
          <div className="auth-spinner" style={{ margin: '0 auto' }} />
        ) : (
          <div style={{ background: '#22272b', borderRadius: 8, overflow: 'hidden', border: '1px solid #3a4450' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #3a4450', background: '#2c333a' }}>
                  <th style={{ padding: '16px 24px', fontWeight: 600 }}>Name</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600 }}>Email</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600 }}>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id} style={{ borderBottom: '1px solid #3a4450' }}>
                    <td style={{ padding: '16px 24px', color: '#dee4ea' }}>{user.name}</td>
                    <td style={{ padding: '16px 24px' }}>{user.email}</td>
                    <td style={{ padding: '16px 24px' }}>
                      <select 
                        value={user.role || 'employee'} 
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        disabled={user._id === currentUser?._id}
                        style={{
                          background: '#1d2125',
                          color: '#dee4ea',
                          border: '1px solid #3a4450',
                          padding: '6px 12px',
                          borderRadius: 4,
                          outline: 'none',
                          cursor: user._id === currentUser?._id ? 'not-allowed' : 'pointer'
                        }}
                      >
                        <option value="employee">Employee</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamPage;
