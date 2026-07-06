import { mockCodeFiles } from '../data/mockData';

export default function CodePage() {
  const files = mockCodeFiles;

  return (
    <div className="mockup-page">
      <div className="mockup-header">
        <h2>Code Repository</h2>
        <p>Source code files linked to this project repository.</p>
      </div>

      <table className="code-repo-table">
        <tbody>
          {files.map((file, i) => (
            <tr key={i}>
              <td style={{ width: '30%', fontWeight: 500, color: 'var(--text-heading)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {file.type === 'folder' ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--accent-blue)" stroke="none">
                      <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                  )}
                  {file.name}
                </div>
              </td>
              <td style={{ color: 'var(--text-secondary)' }}>{file.message}</td>
              <td style={{ width: '15%', textAlign: 'right', color: 'var(--text-muted)' }}>{file.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
