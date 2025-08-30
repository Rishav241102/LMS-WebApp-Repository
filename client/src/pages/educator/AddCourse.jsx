import React, { useState } from "react";

const AddCourse = () => {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    discount: 0,
    thumbnail: "",
    chapters: [],
  });

  const [chapterTitle, setChapterTitle] = useState("");
  const [lectureTitle, setLectureTitle] = useState("");
  const [lectureUrl, setLectureUrl] = useState("");

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  // Calculate final price after discount
  const finalPrice = course.price
    ? (course.price - (course.price * course.discount) / 100).toFixed(2)
    : 0;

  // add chapter
  const addChapter = () => {
    if (!chapterTitle.trim()) return;
    setCourse({
      ...course,
      chapters: [...course.chapters, { title: chapterTitle, lectures: [] }],
    });
    setChapterTitle("");
  };

  // add lecture to chapter
  const addLecture = (chapterIndex) => {
    if (!lectureTitle.trim() || !lectureUrl.trim()) return;
    const updatedChapters = [...course.chapters];
    updatedChapters[chapterIndex].lectures.push({
      title: lectureTitle,
      url: lectureUrl,
    });
    setCourse({ ...course, chapters: updatedChapters });
    setLectureTitle("");
    setLectureUrl("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📌 Course Data:", course);
    alert("Course submitted successfully!");
    // API call to save in DB would go here
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
              name="title"
              value={course.title}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-indigo-300"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-600 font-medium">Description</label>
            <textarea
              name="description"
              value={course.description}
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
                name="price"
                value={course.price}
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

          {/* Thumbnail */}
          <div>
            <label className="block text-gray-600 font-medium">Thumbnail URL</label>
            <input
              type="text"
              name="thumbnail"
              value={course.thumbnail}
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
              {course.chapters.map((chapter, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <h3 className="font-semibold text-gray-700">{chapter.title}</h3>
                  <ul className="list-disc ml-6 text-sm text-gray-600">
                    {chapter.lectures.map((lec, i) => (
                      <li key={i}>{lec.title}</li>
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
