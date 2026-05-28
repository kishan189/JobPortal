import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { Button } from '../ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchJobQuery } from '@/redux/jobSlice';

const categories = [
    // --- Development ---
    "Mechanic",
    "Backend Developer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Mobile App Developer",
    "DevOps Engineer",
    "Software Engineer",
    "Data Engineer",
    "AI / ML Engineer",

    // --- Design & Creative ---
    "UI/UX Designer",
    "Graphic Designer",
    "Product Designer",

    // --- Data & Analytics ---
    "Data Analyst",
    "Business Analyst",

    // --- Product & Project ---
    "Product Manager",
    "Project Manager",

    // --- Marketing & Sales ---
    "Digital Marketing Specialist",
    "SEO Specialist",
    "Content Writer",
    "Sales Executive",

    // --- IT & Support ---
    "System Administrator",
    "IT Support Specialist",
    "Cybersecurity Specialist",

    // --- HR & Operations ---
    "HR Manager",
    "Recruiter",
    "Operations Manager",

    // --- Miscellaneous ---
    "Customer Support Executive",
    "Intern"
];

const Categories = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
     const searchJobHandler = (category)=>{
         console.log("ppppppppp")
          dispatch(setSearchJobQuery(category))
         //  setQuery("")
          navigate("/browse")
       }
   
    return (
        <div>
            <div>
                <h1 className='text-2xl font-bold text-center text-blue-600'>
                    Categories
                    <p className='text-center text-gray-700'>
                        Explore our extensive job market.
                    </p>
                </h1>
            </div>
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent >
                    {
                        categories?.map((category,index)=>{
                            // console.log("category",category)
                            return (
                                <CarouselItem className="md:-basis-1/2 lg:basis-1/3" key={index}>
                                    <Button onClick= {()=>searchJobHandler(category)} className="cursor-pointer">
                                        {category}
                                    </Button>
                                </CarouselItem>
                            )
                        })
                    }


                </CarouselContent>
                <CarouselPrevious className="cursor-pointer"/>
                <CarouselNext className="cursor-pointer"/>
            </Carousel>
        </div>
    )
}

export default Categories