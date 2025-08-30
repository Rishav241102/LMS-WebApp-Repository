import React from 'react'
import { assets, dummyTestimonial } from '../../assets/assets'

const TestimonialsSection = () => {
  return (
    <div className="pb-14 px-4 md:px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800">Testimonials</h2>
        <p className="md:text-base text-gray-500 mt-3">
          Hear from our learners as they share their journeys of transformation,
          success, and how our <br /> platform has made a difference in their lives.
        </p>
      </div>

      {/* Grid with equal spacing */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-10">
        {dummyTestimonial.map((testimonial, index) => (
          <div
            key={index}
            className="flex flex-col justify-between text-sm text-left border border-gray-200 
                       rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-200
                       p-5 h-64"
          >
            {/* Top: Avatar + name */}
            <div className="flex items-center gap-3">
              <img
                className="h-12 w-12 rounded-full object-cover"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <h1 className="text-base font-semibold text-gray-800">{testimonial.name}</h1>
                <p className="text-gray-500 text-xs">{testimonial.role}</p>
              </div>
            </div>

            {/* Middle: Feedback */}
            <p className="text-gray-600 text-sm mt-3 flex-1 line-clamp-4">
              {testimonial.feedback}
            </p>

            {/* Bottom: Rating + Link */}
            <div>
              <div className="flex gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => (
                  <img
                    className="h-4"
                    key={i}
                    src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank}
                    alt="star"
                  />
                ))}
              </div>
              <a
                href="#"
                className="text-blue-600 text-xs font-medium hover:underline"
              >
                Read more →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TestimonialsSection
