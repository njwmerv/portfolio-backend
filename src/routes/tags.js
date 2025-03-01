import express from 'express';
import Project from '../models/project.js';

const router = express.Router();

// @route  GET /tags
// @desc   Get a list of tags on all projects
// @access Public
router.get('/', async (req, res) => {
	try {
		const tags = await Project.distinct('tags');
		res.json(tags);
	} catch (aError) {
		console.log(aError.message);
		return res.status(500).json({error: 'Server error'});
	}
});

export default router;
