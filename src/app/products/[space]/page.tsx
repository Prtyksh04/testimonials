import React from 'react'

const SpacePage: React.FC = () => {
    return (
        <div className="min-h-screen bg-background">
            <header className="p-6 relative">
                <div className="flex flex-col">
                    <div>
                        <h1 className="text-white text-3xl font-medium">Testimonial</h1>
                    </div>
                    <div className="absolute top-4 right-4">
                        <h3 className="text-white font-medium text-2xl">Something will come here</h3>
                    </div>
                </div>
            </header>
            <hr className='border-gray-700'/>
        </div>
    )
}

export default SpacePage;