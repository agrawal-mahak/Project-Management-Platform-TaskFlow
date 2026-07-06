import { useEffect, useState } from 'react';
import { fetchCards } from '../api/cardApi';
import { fetchUsers } from '../api/authApi';
import type { Card } from '../types';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const SummaryPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [users, cards] = await Promise.all([
          fetchUsers(),
          fetchCards()
        ]);

        const chartData = users.map(user => {
          const userCards = cards.filter((c: Card) => c.assignedTo === user.name);

          return {
            name: user.name,
            'Done': userCards.filter((c: Card) => c.status === 'done').length,
            'In Progress': userCards.filter((c: Card) => ['inprogress', 'intest', 'revision'].includes(c.status)).length,
            'To Do': userCards.filter((c: Card) => ['todo', 'draft'].includes(c.status)).length,
          };
        });

        // Optionally filter out users with 0 tasks
        const activeUsersData = chartData.filter(d => d['Done'] > 0 || d['In Progress'] > 0 || d['To Do'] > 0);

        setData(activeUsersData);
      } catch (error) {
        console.error('Failed to load summary data', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', color: 'var(--text-secondary)' }}>
        <div className="auth-spinner" style={{ marginRight: 12 }} /> Loading summary...
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
      <h2 style={{ color: 'var(--text-heading)', marginBottom: '8px' }}>Users Performance</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '32px' }}>
        A breakdown of tasks assigned to each team member by their current status.
      </p>

      <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', height: '400px' }}>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#2c333a" vertical={false} />
              <XAxis dataKey="name" stroke="#8c9bab" fontSize={12} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="#8c9bab" fontSize={12} tickLine={false} axisLine={false} dx={-10} allowDecimals={false} />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ background: '#22272b', border: '1px solid #38414a', borderRadius: '8px', color: '#c7d1db' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey="Done" stackId="a" fill="#4bce97" radius={[0, 0, 4, 4]} barSize={40} />
              <Bar dataKey="In Progress" stackId="a" fill="#579dff" />
              <Bar dataKey="To Do" stackId="a" fill="#f5cd47" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
            No tasks assigned to any users yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryPage;
