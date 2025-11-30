import React, { useState } from "react";
import { useAuth } from "@clerk/clerk-react";

const AddCourse = () => {
  const { getToken } = useAuth();

  const [course, setCourse] = useState({
    courseTitle: "",
    courseDescription: "",
    category: "",
    coursePrice: "",
    discount: 0,
    courseThumbnail: "",
    courseContent: [],
  });
  const [imageFile, setImageFile] = useState(null);

  const [chapterTitle, setChapterTitle] = useState("");
  const [lectureTitle, setLectureTitle] = useState("");
  const [lectureUrl, setLectureUrl] = useState("");

  // handle input change
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setImageFile(files[0]);
    } else {
      setCourse({ ...course, [name]: value });
    }
  };

  // Calculate final price after discount
  const finalPrice = course.coursePrice
    ? (course.coursePrice - (course.coursePrice * course.discount) / 100).toFixed(2)
    : 0;

  // add chapter
  const addChapter = () => {
    if (!chapterTitle.trim()) return;
    setCourse({
      ...course,
      courseContent: [
        ...course.courseContent,
        {
          chapterId: `c${course.courseContent.length + 1}`,
          chapterOrder: course.courseContent.length + 1,
          chapterTitle: chapterTitle,
          chapterContent: [],
        },
      ],
    });
    setChapterTitle("");
  };

  // add lecture to chapter
  const addLecture = (chapterIndex) => {
    if (!lectureTitle.trim() || !lectureUrl.trim()) return;
    const updatedChapters = [...course.courseContent];
    updatedChapters[chapterIndex].chapterContent.push({
      lectureId: `l${updatedChapters[chapterIndex].chapterContent.length + 1}`,
      lectureOrder: updatedChapters[chapterIndex].chapterContent.length + 1,
      lectureTitle: lectureTitle,
      lectureUrl: lectureUrl,
      lectureDuration: 10, // default, you can add input for this
      isPreview: false, // default, you can add input for this
    });
    setCourse({ ...course, courseContent: updatedChapters });
    setLectureTitle("");
    setLectureUrl("");
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();
      const formData = new FormData();
      const courseData = {
        courseTitle: course.courseTitle,
        courseDescription: course.courseDescription,
        courseThumbnail: course.courseThumbnail,
        coursePrice: course.coursePrice,
        discount: course.discount,
        category: course.category,
        courseContent: course.courseContent,
      };
      formData.append("courseData", JSON.stringify(courseData));
      if (imageFile) {
        formData.append("image", imageFile);
      }
  const response = await fetch("http://localhost:5000/api/educator/add-course", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) {
        let errorMsg = response.statusText;
        try {
          const text = await response.text();
          errorMsg = text ? text : response.statusText;
        } catch {}
        alert("Failed to add course: " + errorMsg);
        return;
      }
      alert("Course submitted successfully!");
      setCourse({
        courseTitle: "",
        courseDescription: "",
        category: "",
        coursePrice: "",
        discount: 0,
        courseThumbnail: "",
        courseContent: [],
      });
      setImageFile(null);
    } catch (err) {
      alert("Error submitting course: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">➕ Add New Course</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-gray-600 font-medium">Course Title</label>
            <input
              type="text"
              name="courseTitle"
              value={course.courseTitle}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-indigo-300"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-600 font-medium">Description</label>
            <textarea
              name="courseDescription"
              value={course.courseDescription}
              onChange={handleChange}
              rows="4"
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-indigo-300"
              required
            />
          </div>

          {/* Category & Price & Discount */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-600 font-medium">Category</label>
              <input
                type="text"
                name="category"
                value={course.category}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-indigo-300"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium">Price ($)</label>
              <input
                type="number"
                name="coursePrice"
                value={course.coursePrice}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-indigo-300"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium">Discount (%)</label>
              <input
                type="number"
                name="discount"
                min="0"
                max="100"
                value={course.discount}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-indigo-300"
              />
            </div>
          </div>

          {/* Effective Price Preview */}
          <div className="text-sm text-gray-700">
            <span className="font-medium">Final Price: </span>
            {finalPrice > 0 ? `₹${finalPrice}` : "Enter price"}
          </div>

          {/* Thumbnail URL */}
          <div>
            <label className="block text-gray-600 font-medium">Thumbnail URL</label>
            <input
              type="text"
              name="courseThumbnail"
              value={course.courseThumbnail}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-indigo-300"
            />
          </div>
          {/* Image File */}
          <div>
            <label className="block text-gray-600 font-medium">Course Image (optional)</label>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-indigo-300"
            />
          </div>

          {/* Add Chapters */}
          <div className="border-t pt-4">
            <h2 className="text-lg font-semibold mb-3">📚 Add Chapters</h2>
            <div className="flex gap-3">
              <input
                type="text"
                value={chapterTitle}
                onChange={(e) => setChapterTitle(e.target.value)}
                placeholder="Chapter Title"
                className="flex-1 p-2 border rounded-lg"
              />
              <button
                type="button"
                onClick={addChapter}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
              >
                Add
              </button>
            </div>

            {/* Show chapters */}
            <div className="mt-4 space-y-4">
              {course.courseContent.map((chapter, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <h3 className="font-semibold text-gray-700">{chapter.chapterTitle}</h3>
                  <ul className="list-disc ml-6 text-sm text-gray-600">
                    {chapter.chapterContent.map((lec, i) => (
                      <li key={i}>{lec.lectureTitle}</li>
                    ))}
                  </ul>

                  {/* Add lecture */}
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      placeholder="Lecture Title"
                      value={lectureTitle}
                      onChange={(e) => setLectureTitle(e.target.value)}
                      className="flex-1 p-2 border rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Lecture URL"
                      value={lectureUrl}
                      onChange={(e) => setLectureUrl(e.target.value)}
                      className="flex-1 p-2 border rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => addLecture(index)}
                      className="bg-green-600 text-white px-3 py-2 rounded-lg"
                    >
                      Add Lecture
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Submit Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
