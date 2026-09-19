function ApplicationList({ applications, onDelete }) {
  if (applications.length === 0) return <p>No applications yet.</p>;

  return (
    <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>Company</th>
          <th>Role</th>
          <th>Status</th>
          <th>Date Applied</th>
          <th>Resume Version</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {applications.map((app) => (
          <tr key={app.id}>
            <td>{app.company}</td>
            <td>{app.role}</td>
            <td>{app.status}</td>
            <td>{new Date(app.date_applied).toLocaleDateString()}</td>
            <td>{app.resume_version || '—'}</td>
            <td>
              <button onClick={() => onDelete(app.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ApplicationList;