import React from 'react'
import { Typography } from '../customComponents/CustomComponents'

const DetailPrevNextSection = async() => {
  return (
    <section className=' animate-pulse py-12 bg-primary/10'>
            <div className=' gap-x-40 flex justify-between max-w-screen-lg mx-auto'>
                <div className=' pb-0.5 border-b border-b-bgdark space-y-5'>
                    <div className=' gap-x-2 items-center flex'>
                        <Typography as="div" variant="h4" 
                        className="mb-4 text-wrap font-bold p-2 text-2xl h-3 w-20 rounded-full bg-gray-300">
                            &nbsp;
                        </Typography>
                        <Typography as="div" variant="h4" 
                        className="mb-4 text-wrap font-bold px-2 text-2xl h-3 w-40 rounded-full bg-gray-300">
                            &nbsp;
                        </Typography>
                    </div>
                    <div className=' border-l-4 border-l-bgdark'>
                        <Typography as="div" variant="paragraph" 
                        className="mb-4 text-wrap font-semibold px-2 text-lg h-3 w-56 rounded-full bg-gray-300">
                            &nbsp;
                        </Typography>
                    </div>
                </div>

                <div className=' border-b pb-0.5 border-b-bgdark space-y-5'>
                    <div className=' gap-x-2 items-center justify-end flex'>
                    <Typography as="div" variant="h4" 
                        className="mb-4 text-wrap font-bold p-2 text-2xl h-3 w-20 rounded-full bg-gray-300">
                            &nbsp;
                        </Typography>
                        <Typography as="div" variant="h4" 
                        className="mb-4 text-wrap font-bold px-2 text-2xl h-3 w-40 rounded-full bg-gray-300">
                            &nbsp;
                        </Typography>
                    </div>
                    <div className=' border-r-4 border-r-bgdark'>
                    <Typography as="div" variant="paragraph" 
                        className="mb-4 text-wrap font-semibold px-2 text-lg h-3 w-56 rounded-full bg-gray-300">
                            &nbsp;
                        </Typography>
                    </div>
                </div>
                

            </div>
        </section>
  )
}

export default DetailPrevNextSection