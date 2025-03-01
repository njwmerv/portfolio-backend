import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
	name:{
		type:String,
		unique:true,
		required:true
	},
	image:{
		type:String, // URL
		required:true
	},
	link:{
		type:String, // Repo
		required:true
	},
	description:{
		type:String,
		required:true
	},
	tags:[String],
	topThree:Boolean
}, {collection:'projects'});

const Project = mongoose.model('Project', projectSchema);

export default Project;
