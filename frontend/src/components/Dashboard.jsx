function Dashboard({ applications }) {
  const total = applications.length;
  const counts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
      <div><strong>Total:</strong> {total}</div>
      <div><strong>Applied:</strong> {counts.applied || 0}</div>
      <div><strong>Interview:</strong> {counts.interview || 0}</div>
      <div><strong>Offer:</strong> {counts.offer || 0}</div>
      <div><strong>Rejected:</strong> {counts.rejected || 0}</div>
    </div>
  );
}

export default Dashboard;