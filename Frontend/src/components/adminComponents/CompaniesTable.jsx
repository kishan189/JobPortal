import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { PopoverContent, Popover, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
  
  const navigate = useNavigate()
  const companyList = useSelector((state) => state?.company?.companyList)
  console.log("companyList>>", companyList)

  const handleEditCompany =  (companyId)=>{
    console.log("hhh")
    navigate(`/admin/companies/${companyId}`)
  }
  return (
    <div>
      <Table>
        {/* <TableCaption> testingHello</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableCell>Company Logo</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Action</TableCell>

          </TableRow>
        </TableHeader>
        <TableBody>
          {
            companyList?.length > 0 ? (
              companyList?.map((item, index) => (
                <TableRow key={item}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={item?.logo}></AvatarImage>
                    </Avatar>
                  </TableCell>
                  <TableCell>{item?.name}</TableCell>
                  <TableCell>{item?.createdAt}</TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger>
                        {""}
                        <MoreHorizontal className='cursor-pointer' />
                        {""}
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        <div className='flex gap-3 cursor-pointer' onClick={()=>handleEditCompany(item?._id)}>
                          <Edit2></Edit2>
                          <span>Edit</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className='text-center  h-[50vh]'>No companies found</TableCell>
              </TableRow>
            )
          }

        </TableBody>
      </Table>
    </div>
  )
}

export default CompaniesTable