import React from 'react';
import TestimonialCard from './TestimonialCard';

const TestimonialsCarousel = ({testimonials}) => {
  return (
    <div>
        <h2 className="font-bold text-4xl text-sky-700 text-start pb-8">
            What Our Users Are Saying
        </h2>
        <div className='flex overflow-x-auto gap-4 '>
            {
                testimonials.map((testimonial, index) => (
                    <div key={index} className='mb-8 min-w-[40vw]  md:min-w-[25vw] lg:min-w-[20vw]'>
                        <TestimonialCard testimonial={testimonial} />
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default TestimonialsCarousel