import express from 'express';
import Project from '../models/project.js';

const router = express.Router();

const getProjects = async (res) => {
	const projects = await Project.find();
	return res.json(projects);
};

const searchByName = async (res, searchString) => {
	const projects = await Project.find({name:{$regex:searchString, $options:'i'}});
	return res.json(projects);
};

const searchByTags = async (res, tags) => {
	const tagsArray = tags.split(',');
	const projects = await Project.find({tags:{$all:tagsArray}});
	return res.json(projects);
};

const searchByNameAndTags = async (res, searchString, tags) => {
	const tagsArray = tags.split(',');
	const projects = await Project.find({name:{$regex:searchString, $options:'i'}, tags:{$all:tagsArray}});
	return res.json(projects);
};

// @route  GET /projects
// @desc   Get a list of projects
// @access Public
router.get('/', async (req, res) => {
	try{
		return getProjects(res);
	}
	catch(aError){
		console.log(aError.message);
		return res.status(500).json({error:'Server error'});
	}
});

// @route  GET /projects/filter?searchString=searchString?tags=tag1,tag2...
// @desc   Get a list of projects filtered by searchString and/or tags
// @access Public
router.get('/filter', async (req, res) => {
	const {searchString, tags} = req.query;
	try{
		if(!searchString && !tags){
			return getProjects(res);
		}
		else if(!searchString){
			return searchByTags(res, tags);
		}
		else if(!tags){
			return searchByName(res, searchString);
		}
		else{
			return searchByNameAndTags(res, searchString, tags);
		}
	}
	catch(aError){
		console.log(aError.message);
		return res.status(500).json({error:'Server error'});
	}
});

// @route  GET /projects/top
// @desc   Get a list of top 3 projects
// @access Public
router.get('/top', async (req, res) => {
	try{
		const projects = await Project.find({topThree:true});
		return res.json(projects);
	}
	catch(aError){
		console.log(aError.message);
		return res.status(500).json({error:'Server error'});
	}
});

export default router;
