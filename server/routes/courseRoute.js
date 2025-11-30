import express from 'express';
import { getAllCourse, getCourseId } from '../controllers/courseController.js';


const courseRouter = express.Router();

courseRouter.get('/all',getAllCourse)
courseRouter.get('/:id',getCourseId)

// Dev-only: create test course
if (process.env.NODE_ENV !== 'production') {
	import('../controllers/courseController.js').then(mod => {
		courseRouter.post('/create-test', mod.createTestCourse);
	}).catch(err => console.warn('Could not register create-test route', err));
}

export default courseRouter;