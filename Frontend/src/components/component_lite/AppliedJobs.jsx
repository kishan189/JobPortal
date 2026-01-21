import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

const AppliedJobs = () => {
  return (
    <div>
        <Table>
            <TableCaption>Recent applied Jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    [1,2,3,4,5,6]?.map((item,index)=>{
                        return(
                            <TableRow key={index}>
                            <TableCell>11-22-2025</TableCell>
                            <TableCell>Front end developer</TableCell>
                            <TableCell>Dell</TableCell>
                            <TableCell>Selected</TableCell>

                        </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    </div>
  )
}

export default AppliedJobs