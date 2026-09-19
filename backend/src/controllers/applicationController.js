const Application = require('../models/application');

async function listApplications(req, res, next) {
  try {
    const apps = await Application.getAll();
    res.json(apps);
  } catch (err) { next(err); }
}

async function createApplication(req, res, next) {
  try {
    const app = await Application.create(req.body);
    res.status(201).json(app);
  } catch (err) { next(err); }
}

async function updateApplication(req, res, next) {
  try {
    const app = await Application.update(req.params.id, req.body);
    if (!app) return res.status(404).json({ error: 'Not found' });
    res.json(app);
  } catch (err) { next(err); }
}

async function deleteApplication(req, res, next) {
  try {
    await Application.remove(req.params.id);
    res.status(204).send();
  } catch (err) { next(err); }
}

module.exports = { listApplications, createApplication, updateApplication, deleteApplication };