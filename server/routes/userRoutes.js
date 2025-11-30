import express from 'express';
import { getUserData, userEnrolledCourses, createTestUser, getUserById, getAllUsers, getUserEnrolledCoursesById, purchaseCourse } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/data', getUserData);
userRouter.get('/enrolled-courses', userEnrolledCourses);
userRouter.post('/purchase', purchaseCourse);

// Dev-only: create a test user
if (process.env.NODE_ENV !== 'production') {
	userRouter.post('/create-test', createTestUser);
}
if (process.env.NODE_ENV !== 'production') {
	userRouter.get('/by-id/:id', getUserById);
}

// Dev-only: get all users
if (process.env.NODE_ENV !== 'production') {
	userRouter.get('/all', getAllUsers);
}

// Dev-only: get enrolled courses for a user
if (process.env.NODE_ENV !== 'production') {
	userRouter.get('/:id/enrolled-courses', getUserEnrolledCoursesById);
}

export default userRouter;
