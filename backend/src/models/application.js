const pool = require('../config/db');

async function getAll() {
  const result = await pool.query('SELECT * FROM applications ORDER BY date_applied DESC');
  return result.rows;
}

async function create({ company, role, status, date_applied, resume_version, job_url, notes }) {
  const result = await pool.query(
    `INSERT INTO applications (company, role, status, date_applied, resume_version, job_url, notes)
     VALUES ($1, $2, $3, COALESCE($4, CURRENT_DATE), $5, $6, $7)
     RETURNING *`,
    [company, role, status || 'applied', date_applied, resume_version, job_url, notes]
  );
  return result.rows[0];
}

async function update(id, fields) {
  const { company, role, status, date_applied, resume_version, job_url, notes } = fields;
  const result = await pool.query(
    `UPDATE applications
     SET company = COALESCE($1, company),
         role = COALESCE($2, role),
         status = COALESCE($3, status),
         date_applied = COALESCE($4, date_applied),
         resume_version = COALESCE($5, resume_version),
         job_url = COALESCE($6, job_url),
         notes = COALESCE($7, notes),
         updated_at = NOW()
     WHERE id = $8
     RETURNING *`,
    [company, role, status, date_applied, resume_version, job_url, notes, id]
  );
  return result.rows[0];
}

async function remove(id) {
  await pool.query('DELETE FROM applications WHERE id = $1', [id]);
}

module.exports = { getAll, create, update, remove };