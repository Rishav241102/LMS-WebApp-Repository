import mongoose from "mongoose"

// Coonect to the MongoDB database

const connectDB = async()=>{
    const uriBase = process.env.MONGODB_URI;
    if(!uriBase){
        throw new Error('MONGODB_URI is not set in environment. Please set it in .env or environment variables.');
    }
    const fullUri = `${uriBase.replace(/\/$/, '')}/LMS`;
    console.log('Attempting MongoDB connect to:', fullUri.replace(/:[^:@]+@/, ':*****@'));
    mongoose.connection.on('connected',()=> console.log('Database connected'))
    try{
        // Mongoose 6+ enables the new parser and unified topology by default.
        // Passing `useNewUrlParser` / `useUnifiedTopology` is deprecated
        // and will be ignored by the driver, so connect without them.
        await mongoose.connect(fullUri);
        console.log('Database connection established');
    }catch(err){
        console.error('MongoDB connection error:', err.message || err);
        throw err;
    }
}
export default connectDB