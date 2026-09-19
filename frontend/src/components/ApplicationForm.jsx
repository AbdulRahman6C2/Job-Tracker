import { useState } from 'react';

function ApplicationForm({ onAdd }) {
  const [form, setForm] = useState({
    company: '',
    role: '',
    status: 'applied',
    resume_version: '',
    job_url: '',
    notes: '',
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.company || !form.role) return;
    await onAdd(form);
    setForm({ company: '', role: '', status: 'applied', resume_version: '', job_url: '', notes: '' });
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <input name="company" placeholder="Company" value={form.company} onChange={handleChange} required />
      <input name="role" placeholder="Role" value={form.role} onChange={handleChange} required />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="applied">Applied</option>
        <option value="interview">Interview</option>
        <option value="offer">Offer</option>
        <option value="rejected">Rejected</option>
        <option value="withdrawn">Withdrawn</option>
      </select>
      <input name="resume_version" placeholder="Resume version" value={form.resume_version} onChange={handleChange} />
      <input name="job_url" placeholder="Job URL" value={form.job_url} onChange={handleChange} />
      <input name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} />
      <button type="submit">Add Application</button>
    </form>
  );
}

export default ApplicationForm;