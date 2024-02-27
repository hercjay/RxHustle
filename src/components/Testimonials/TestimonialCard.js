import React from 'react'

const TestimonialCard = ({testimonial}) => {
  return (
    <div>
        <div className="w-full bg-white p-6 rounded-lg shadow-lg border border-sky-500">
            <div className="text-center">
                <h2 className="text-lg font-semibold">Pharm. {testimonial.name}</h2>
            </div>
            <p className="text-slate-600">{testimonial.message}</p>
            <div className="flex items-center mt-4">
                {/* <img
                    src={testimonial.avatar}
                    alt="avatar"
                    className="w-12 h-12 rounded-full"
                /> */}
            </div>
        </div>
    </div>
  )
}

export default TestimonialCard