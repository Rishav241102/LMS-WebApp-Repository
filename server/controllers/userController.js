import User from "../models/User.js";
import { Purchase } from "../models/Purchase.js";
import Stripe from "stripe";
import Course from "../models/Course.js";
// Get User Data
export const getUserData = async (req, res)=>{
    try {
        const userId = req.auth.userId;
        const user = await User.findById(userId)

        if(!user){
            return res.json({success:false,message:"User not found"})
        }

        res.json({success:true,user})


    } catch (error){
        res.json({success:false,message:error.message})

    }
}

// User Enrolled Courses With Lecture Links
export const userEnrolledCourses = async (req,res)=>{
    try{
        const userId = req.auth.userId;
        const userData = await User.findById(userId).populate('enrolledCourses');

        res.json({success:true,enrolledCourses:userData.enrolledCourses})

    } catch (error){
        res.json({success:false,message:error.message})

    }
}

// Development helper: create a test user
export const createTestUser = async (req, res) => {
    try {
        const { _id, name, email, imageUrl, enrolledCourses } = req.body;
        if (!_id || !name || !email) {
            return res.status(400).json({ success: false, message: 'Missing required fields: _id, name, email' });
        }
        const User = (await import('../models/User.js')).default;
        const existing = await User.findById(_id);
        if (existing) {
            return res.json({ success: true, message: 'User already exists', user: existing });
        }
        const user = new User({ _id, name, email, imageUrl: imageUrl || '', enrolledCourses: enrolledCourses || [] });
        await user.save();
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Dev helper: get user by id (no auth) - only in non-production
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const User = (await import('../models/User.js')).default;
        const user = await User.findById(id).populate('enrolledCourses');
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Dev helper: get all users (no auth) - only in non-production
export const getAllUsers = async (req, res) => {
    try {
        const User = (await import('../models/User.js')).default;
        const users = await User.find().populate('enrolledCourses');
        res.json({ success: true, count: users.length, users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Dev helper: get enrolled courses for a user by user ID (no auth)
export const getUserEnrolledCoursesById = async (req, res) => {
    try {
        const { id } = req.params;
        const User = (await import('../models/User.js')).default;
        const user = await User.findById(id).populate('enrolledCourses');
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        res.json({ success: true, userId: id, enrolledCourses: user.enrolledCourses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Purchase Course
export const purchaseCourse = async (req, res) => {
    try{
        const {courseId} = req.body;
        const {origin} = req.headers;
        // Support dev override for userId when Clerk is not available locally
        let userId = req.auth?.userId;
        if (!userId && process.env.NODE_ENV !== 'production') {
            userId = req.body.userId || req.query.userId || null;
        }
        const userData = await User.findById(userId);
        const courseData = await Course.findById(courseId)

        if(!userData || !courseData){
            return res.status(404).json({success:false,message:"User or Course not found"})
        }

        const purchaseData = {
            courseId: courseData._id,
            userId,
            amount: (courseData.coursePrice - (courseData.discount * courseData.coursePrice)/100).toFixed(2),

        }

        const newPurchase = await Purchase.create(purchaseData);
        // If Stripe isn't configured (local dev), return a mock session URL so frontend/dev can continue
        if (!process.env.STRIPE_SECRET_KEY || !process.env.CURRENCY) {
            const fallbackOrigin = origin || process.env.CLERK_FRONTEND_URL || 'http://localhost:5173';
            const mockUrl = `${fallbackOrigin}/mock-session?purchaseId=${newPurchase._id.toString()}`;
            return res.json({ success: true, session_url: mockUrl, mock: true, purchase: newPurchase });
        }

        // Stripe Gateway Initialize
        const stripInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
        const currency = process.env.CURRENCY.toLowerCase();

        // Creating line items for Stripe
        const amountCents = Math.round(parseFloat(newPurchase.amount) * 100);
        const line_items = [{
            price_data: {
                currency,
                product_data: { name: courseData.courseTitle },
                unit_amount: amountCents
            },
            quantity: 1
        }];

        const session = await stripInstance.checkout.sessions.create({
            success_url: `${origin}/loading/my-enrollments`,
            cancel_url: `${origin}/`,
            line_items: line_items,
            mode: 'payment',
            metadata: { purchaseId: newPurchase._id.toString() }

        });
        res.json({ success: true, session_url: session.url });

    } catch (error) {
        res.json({success:false,message:error.message})

    }

}
