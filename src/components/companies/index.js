'use client'

import { useRouter } from "next/navigation";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import {Button} from "../ui/button"

function Companies({jobsList}){
    console.log("all jobs",jobsList)
    const router = useRouter()
    const createUniqueSetofCompanies = [...new Set(jobsList.filter((jobItem)=>jobItem?.companyName && jobItem?.companyName.trim() !=='')
    .map((item)=>item.companyName.trim()))]

    function handleFilterJobsByCompanyName(getCompanyName){
        sessionStorage.setItem('filterParams', JSON.stringify({
            companyName:[getCompanyName],
        }))

        router.push('/jobs')
    }
    
    return(
        <div className="mx-auto max-w-7xl">
            <div className="flex items-baseline justify-between border-b pb-6 pt-24 dark:border-white">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Browse Companies</h1>
            </div>
            <div className="pt-6 pb-24">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 ">
                    <div className = "lg:col-span-4">
                        <div className ="container mx-auto p-0 space-y-4">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-3 ">
                            {
                                createUniqueSetofCompanies && createUniqueSetofCompanies.length>0?
                                createUniqueSetofCompanies.map((companyName) => (
                                    <CommonCard
                                      key={companyName} 
                                      icon={<JobIcon />}
                                      title={companyName}
                                      footerContent={
                                        <Button onClick={()=> handleFilterJobsByCompanyName(companyName)}
                                         className="h-11 flex items-center justify-center px-5">See Jobs</Button>
                                      }
                                    />
                                  ))                                  
                                :<h1>No Companies Available!</h1>
                            }
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Companies;