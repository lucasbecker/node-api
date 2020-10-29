const { Router } = require('express');

const authMiddleware = require('../middlewares/auth');
const Project = require('../models/project');
const Task = require('../models/task');

const router = Router();
router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().populate(['user', 'tasks']); // populate trás os dados do user do project
    return res.status(200).send({ projects });

  } catch (error) {
    return res.status(400).send({ error: 'Error loading projects' });
  }
});

router.get('/:projectId', async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId).populate(['user', 'tasks']);
    return res.status(200).send({ project });

  } catch (error) {
    return res.status(400).send({ error: 'Error loading project' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, tasks } = req.body;

    const project = await Project.create({ title, description, user: req.userId });

    await Promise.all(tasks.map(async task => {
      const projectTask = new Task({...task, project: project._id });
      
      await projectTask.save();

      project.tasks.push(projectTask);
    }))

    await project.save();

    return res.status(200).send({ project });

  } catch (error) {
    return res.status(400).send({ error: 'Error creating new project' });
  }
});

router.put('/:projectId', async (req, res) => {
  try {
    const { title, description, tasks } = req.body;

    const project = await Project.findByIdAndUpdate(req.params.projectId, { 
      title, 
      description
    }, { new: true });

    project.tasks = [];
    await Task.deleteMany({ project: project._id }); // removendo tasks do projeto antes de criar novamente

    await Promise.all(tasks.map(async task => {
      const projectTask = new Task({...task, project: project._id });
      
      await projectTask.save();

      project.tasks.push(projectTask);
    }))

    await project.save();

    return res.status(200).send({ project });

  } catch (error) {
    return res.status(400).send({ error: 'Error updating project' });
  }
});

router.delete('/:projectId', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.projectId);
    return res.status(200).send({ message: 'Project deleted' });

  } catch (error) {
    return res.status(400).send({ error: 'Error deleting project' });
  }
});

module.exports = app => app.use('/projects', router);