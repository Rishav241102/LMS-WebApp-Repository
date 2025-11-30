import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks, stripeWebhooks } from './controllers/webhooks.js'
import educatorRouter from './routes/educatorRoutes.js'
import { clerkMiddleware } from '@clerk/express'
import connectCloudinary from './configs/cloudinary.js'
import courseRouter from './routes/courseRoute.js'
import userRouter from './routes/userRoutes.js'

//Initialize Express
const app = express()

// Connect to database and cloudinary with error handling
try {
  await connectDB();
  await connectCloudinary();
} catch (err) {
  console.error('Startup error:', err.message || err);
  console.error('Make sure your environment variables (MONGODB_URI, CLOUDINARY_*) are set and services are running.');
  process.exit(1);
}

//Middlewares
app.use(cors({
  origin: process.env.CLERK_FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())

// Clerk middleware - extracts token from Authorization header
if (process.env.CLERK_SECRET_KEY) {
  app.use(
    clerkMiddleware({
      secretKey: process.env.CLERK_SECRET_KEY,
    })
  );
} else {
  // In local development, skip Clerk middleware to avoid crashes when secret is missing.
  console.warn('Warning: CLERK_SECRET_KEY not set — skipping Clerk middleware (local dev).');
  // Provide a lightweight shim so routes expecting req.auth won't crash
  app.use((req, res, next) => {
    req.auth = req.auth || {};
    next();
  });
}

//Routes
app.get('/',(req,res)=> res.send("API Working."))
//app.post('/clerk',express.json(),clerkWebhooks)
//app.use('/api/educator',express.json(),educatorRouter)
app.use('/api/course', courseRouter)
app.use('/api/user', userRouter)
app.post('/stripe',express.raw({type: 'application/json'}), stripeWebhooks)

// Debug endpoint to check auth
app.get('/debug/auth', (req,res)=> {
  res.json({
    auth: req.auth,
    userId: req.auth?.userId,
    message: req.auth?.userId ? "Authenticated" : "Not authenticated"
  })
})

app.post('/clerk/webhooks', express.raw({type: 'application/json'}), clerkWebhooks)
app.use('/api/educator', educatorRouter)
//Port
const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)

})
