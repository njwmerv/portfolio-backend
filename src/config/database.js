import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		const mongoURI = process.env.MONGO_URI;
		if(!mongoURI) throw new Error('MongoDB URI is not defined in .env');

		await mongoose.connect(mongoURI);
		console.log(`MongoDB Connected... ${mongoose.connection.name}`);
	} catch (err) {
		console.error('Error connecting to MongoDB:', err.message);
		process.exit(1);
	}
};

export default connectDB;
