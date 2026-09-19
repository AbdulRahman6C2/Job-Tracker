import { useState, useEffect } from 'react';
import { getApplications, createApplication, deleteApplication } from './api/applications';
import ApplicationForm from './components/ApplicationForm';
import ApplicationList from './components/ApplicationList';
import Dashboard from './components/Dashboard';

function App() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadApplications() {
    try {
      setLoading(true);
      const data = await getApplications();
      setApplications(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function loadInitialApplications() {
      try {
        const data = await getApplications();

        if (cancelled) return;

        setApplications(data);
        setError(null);
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadInitialApplications();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleAdd(formData) {
    await createApplication(formData);
    await loadApplications();
  }

  async function handleDelete(id) {
    await deleteApplication(id);
    await loadApplications();
  }

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Job Application Tracker</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Dashboard applications={applications} />
      <ApplicationForm onAdd={handleAdd} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ApplicationList applications={applications} onDelete={handleDelete} />
      )}
    </div>
  );
}

export default App;