import React from 'react'
import TestimonialWidget from './TestimonialWidget/TestimonialWidget'
interface SpaceNameprops {
    spaceName : string ;
}
const TestimonalTest: React.FC<SpaceNameprops> = ({spaceName}) => {
    return (
        <div className='m-2'>
            <TestimonialWidget spaceName={spaceName} />
        </div>
    )
}

export default TestimonalTest