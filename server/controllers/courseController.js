
import Course from '../models/Course.js';

// Get All Courses
export const getAllCourse = async (req, res) => {
    try {
        const courses = await Course.find({ isPublished: true })
            .select(['-courseContent', '-enrolledStudents'])
            .populate({ path: 'educator' });

        res.json({ success: true, courses });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }

}

// Get Course by Id
export const getCourseId = async (req, res) => {
    const {id} = req.params;

    try {
        const courseData = await Course.findById(id).populate({path:'educator'})

        if (!courseData) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        // Remove lectureUrl if isPreview is false
        courseData.courseContent.forEach(chapter => {
            chapter.chapterContent.forEach(lecture => {
                if (!lecture.isPreview) {
                    lecture.lectureUrl = "";

                }
            })
        })

        res.json({ success: true, courseData });

    } catch (error){
        res.json({ success: false, message: error.message });

    }
}

// Development helper: create a test course
export const createTestCourse = async (req, res) => {
    try {
        const courseData = req.body;
        if (!courseData || !courseData.courseTitle) {
            return res.status(400).json({ success: false, message: 'Missing course data or courseTitle' });
        }
        const course = await Course.create(courseData);
        res.json({ success: true, course });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

