import React from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

const filterData = [
  {
    filterType: "Location",
    array: [
      "Delhi",
      "Bangalore",
      "Pune",
      "Hyderabad",
      "Mumbai",
      "Chennai",
      "Gurugram",
      "Noida",
      "Kolkata",
      "Ahmedabad",
      "Remote"
    ]
  },
  {
    filterType: "Industry",
    array: [
      "Information Technology",
      "Marketing",
      "Healthcare",
      "Education",
      "Finance",
      "E-commerce",
      "Telecommunication",
      "Manufacturing",
      "Hospitality",
      "Construction",
      "Consulting",
      "Government"
    ]
  },
  {
    filterType: "Experience",
    array: [
      "Fresher (0-1 years)",
      "1-3 years",
      "3-5 years",
      "5-7 years",
      "7-10 years",
      "10+ years",
      "Managerial Level",
      "Executive Level"
    ]
  },
  {
    filterType: "Salary",
    array: [
      "Below ₹3 LPA",
      "₹3 - ₹6 LPA",
      "₹6 - ₹10 LPA",
      "₹10 - ₹15 LPA",
      "₹15 - ₹25 LPA",
      "Above ₹25 LPA"
    ]
  },
  {
    filterType: "Job Type",
    array: [
      "Full-Time",
      "Part-Time",
      "Contract",
      "Internship",
      "Temporary",
      "Freelance",
      "Remote"
    ]
  },
  {
    filterType: "Education Level",
    array: [
      "High School",
      "Diploma",
      "Bachelor’s Degree",
      "Master’s Degree",
      "Doctorate",
      "Other Certification"
    ]
  },
  {
    filterType: "Company Size",
    array: [
      "1-10 employees",
      "11-50 employees",
      "51-200 employees",
      "201-500 employees",
      "501-1000 employees",
      "1000+ employees"
    ]
  },
  {
    filterType: "Posted Date",
    array: [
      "Last 24 hours",
      "Last 3 days",
      "Last 7 days",
      "Last 14 days",
      "Last 30 days",
      "Anytime"
    ]
  }
];

const FiltersCard = () => {
    return (
        <div className=' w-full h-full'>
            <h2 className='border-b border-gray-300 '>
                Filters
            </h2>
            <RadioGroup className="max-h-[82vh] overflow-y-auto">
                {filterData?.map((data, index) => (
                    <div key={index} className=''>
                        <h2 className='font-bold'>
                            {data?.filterType}
                        </h2>
                        {
                            data?.array?.map((item, ind) => (
                                <div key={ind} className='flex gap-2 items-center'>
                                    <div className=' my-1 flex gap-2 cursor-pointer'>
                                        <RadioGroupItem value={item} >
                                       
                                    </RadioGroupItem>
                                    <label>{item }</label>
                                    </div>
                                </div>
                                
                            ))
                        }
                    </div>

                ))}
            </RadioGroup>

        </div>
    )
}

export default FiltersCard

{/* <input
                    type='checkbox'
                    id={index}
                    name={data?.filterType}
                    value={data}

                    >
                    </input> */}
