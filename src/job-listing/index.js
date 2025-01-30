"use client";

import AdminJobCard from "../components/admin-job-card/index.js";
import PostNewJob from "../components/post-new-jobs";
import StudentJobCard from "../components/student-job-card/index.js";
import { Label } from "@/components/ui/label"
import { filterMenuDataArray } from "../utils/index.js";
import {useRouter,useSearchParams} from "next/navigation"
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
  } from "@/components/ui/menubar"
import {formUrlQuery} from "../utils/index.js"
import { useEffect, useState } from "react";
function JobListing({ user, profileInfo, jobList, jobApplications,filterCategoties}) {
    console.log(jobList, "jobList");
    console.log(jobApplications, "jobApplications");
    console.log(filterCategoties, "filterCategoties");
    
    const [filterParams, setFilterParams] = useState({})
    const searchParams = useSearchParams()
    const router = useRouter()

    function handleFilter(getSectionID, getCurrentOption){
        let cpyFilterparams = {...filterParams};
        const indexofCurrentSection = Object.keys(cpyFilterparams).indexOf(getSectionID);
        if(indexofCurrentSection === -1){
            cpyFilterparams = {
                ...cpyFilterparams,
                [getSectionID]:[getCurrentOption]
            }
        }
        else{
            const indexofCurrentOption = cpyFilterparams[getSectionID].indexOf(getCurrentOption)
            if(indexofCurrentOption === -1)
                     cpyFilterparams[getSectionID].push(getCurrentOption)
            else cpyFilterparams[getSectionID].splice(indexofCurrentOption,1)
        }   
        setFilterParams(cpyFilterparams)
        sessionStorage.setItem('filterParams',JSON.stringify(cpyFilterparams))
    }

    useEffect(()=>{
        setFilterParams(JSON.parse(sessionStorage.getItem('filterParams')))
    },[])

    useEffect(()=>{
        if(filterParams && Object.keys(filterParams).length > 0){
            let url = '';
            url = formUrlQuery({
                params: searchParams.toString(),
                dataToAdd: filterParams

            })
            router.push(url,{scroll : false})
        }

    },[filterParams,searchParams])

    const filterMenus = filterMenuDataArray.map((item)=>({
        id:item.id,
        name:item.label,
        options:[
            ...new Set(filterCategoties.map((listItem) =>  listItem[item.id]))
        ]
    }));
    console.log(filterParams,'filterParams')


    return (
        <div>
            <div className="mx-auto max-w-7xl">
                <div
                    className="flex items-baseline justify-between border-b border-gray-200 pb-6 mt-24 mb-4 dark:border-white"
                    style={{ paddingTop: "2.5rem" }}
                >
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {profileInfo?.role === "student"
                            ? "Explore All Jobs"
                            : "Jobs Dashboard"}
                    </h1>
                    <div className="flex items-center">
                        {profileInfo?.role === "student" ? (
                            <Menubar >
                                {
                                    filterMenus.map((filterMenu) =>(
                                        <MenubarMenu key={filterMenu.id} >
                                                <MenubarTrigger className="cursor-pointer">
                                                    {filterMenu.name}
                                                </MenubarTrigger>
                                                <MenubarContent>
                                                    {
                                                        filterMenu.options.map((option,optionIdx) =>(
                                                        <MenubarItem
                                                         key={optionIdx}
                                                         className="flex item-center gap-3"
                                                         onClick={()=>handleFilter(filterMenu.id, option)}
                                                        >
                                                                    <div className={`h-4 w-4 border rounded-sm border-gray-900 dark:border-white ${filterParams && Object.keys(filterParams).length >0 && filterParams[filterMenu.id] && filterParams[filterMenu.id].indexOf(option) > -1 ?"bg-black dark:bg-white" : ""}`}/> {/* Check box  */}
                                                                    <Label className="cursor-pointer text-sm text-gray-600 dark:text-white">{option}</Label>
                                                        </MenubarItem>))
                                                    }
                                                </MenubarContent>
                                        </MenubarMenu>
                                    ))
                                }
                            </Menubar>
                        ) : (
                            <PostNewJob user={user} profileInfo={profileInfo} />
                        )}
                    </div>
                </div>
                {/* Job Listing Logic */}
                <div className="pt-6 pb-24 ">
                    <div className="grid grid-cols-1 gap-y-8 mb-3 ">
                        {/* Job Cards */}
                        {jobList && jobList.length > 0 ? (
                            jobList.map((jobItem) =>
                                profileInfo?.role === "student" ? (
                                    <StudentJobCard
                                        key={jobItem.id}
                                        jobItem={jobItem}
                                        profileInfo={profileInfo}
                                        jobApplications={jobApplications}
                                    />
                                ) : (
                                    <AdminJobCard
                                        key={jobItem.id}
                                        jobItem={jobItem}
                                        profileInfo={profileInfo}
                                        jobApplications={jobApplications}
                                    />
                                )
                            )
                        ) : (
                            <p className="text-center text-gray-500">
                                No jobs available.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobListing;
