"use client"
import { useState } from 'react'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '../../components/ui/tabs'
import CommonForm from '../common-form'
import { adminOnboardFormControls, initialadminFormData, initialstudentFormData, studentOnboardFormControls } from '../../utils'
import {useUser} from "@clerk/nextjs";
import { createProfile } from '../../actions';
function OnBoard(){
    const [currentTab,setCurrentTab] = useState("student")
    const[adminFormData,setadminFormData] = useState(initialadminFormData);
    const[studentFormData,setstudentFormData] = useState(initialstudentFormData);

    const currentAuthUser = useUser()
    const {user}=currentAuthUser;
    console.log(currentAuthUser,'clerk hook')

    function handleTabChange(value){
        setCurrentTab(value)
    }
    console.log(adminFormData,"adminFormData")

    function HandleadminFormValidation (){
        return (
        adminFormData && 
        adminFormData.name.trim()!==''&&
        adminFormData.collegeName.trim()!=='' &&
        adminFormData.collegeLocation.trim()!=='' &&
         adminFormData.collegeRole.trim()!==''&&
         adminFormData.department.trim()!==''
        );
    }

    async function createProfileAction(){
        const data = {
            adminInfo : adminFormData,
            role:'admin',
            isPremiumUser : false,
            userId:user?.id,
            email:user?.primaryEmailAddress?.emailAddress
        }

        await createProfile(data,"/onborad")
    }

    return (
            <div className="bg-white">
                <Tabs value={currentTab} onValueChange={handleTabChange}>
                    <div className='w-full'>
                        <div className='flex items-baseline justify-between border-b pb-6 pt-20 '>
                            <h1 className='text-4xl font-bold tracking-tight text-gray-900'>Welcome     To Onboarding
                            </h1>
                            <TabsList>
                                <TabsTrigger value="student">Student</TabsTrigger>
                                <TabsTrigger value="collegeAdmin"> College Admin </TabsTrigger>
                            </TabsList>
                        </div>
                    </div>
                    <TabsContent value='student'>
                        <CommonForm
                        formControls={studentOnboardFormControls}
                        buttonText={'Onboard as a student'}
                        formData={studentFormData}
                        setFormData={setstudentFormData}
                       />
                    </TabsContent>
                    <TabsContent value="collegeAdmin">
                        <CommonForm
                        formControls={adminOnboardFormControls}
                        buttonText={'Onboard as Admin'  } 
                        formData = {adminFormData}
                        setFormData={setadminFormData}
                        isBtnDisabled={!HandleadminFormValidation()}
                        action={createProfileAction}/>
                    </TabsContent>
                </Tabs>
            </div>
    )
}
export default OnBoard
