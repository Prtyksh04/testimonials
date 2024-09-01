//http:localhost:4000/testing/test
import React from 'react';

const TestIframe: React.FC = () => {
    return (
        <div className='w-full max-w-4xl mx-auto'>
            <iframe
                src="http://localhost:3000/test?space=Plura"
                width="100%"
                height="600px"
                allowFullScreen
                title="Testimonial Widget"
                className="border-none"
                style={{ borderRadius: '8px', overflow: 'hidden' }}
            ></iframe>
        </div>
    );
};

export default TestIframe;
