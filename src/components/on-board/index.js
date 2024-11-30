"use client"
import { useState ,useEffect} from 'react'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '../../components/ui/tabs'
import CommonForm from '../common-form'
import { adminOnboardFormControls, initialadminFormData, initialstudentFormData, studentOnboardFormControls } from '../../utils'
import {useUser} from "@clerk/nextjs";
import { createProfile } from '../../actions';
import { createClient } from '@supabase/supabase-js'
const supabaseClient = createClient('https://kbtkqdwvvrrpktlcesxw.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtidGtxZHd2dnJycGt0bGNlc3h3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3NTQxMTQsImV4cCI6MjA0NzMzMDExNH0.mNhlvQTdGsCSNzIEv5TNroQcJszF71v6N_UXa4l4O1c')
function OnBoard(){
    const [currentTab,setCurrentTab] = useState("student")
    const[adminFormData,setadminFormData] = useState(initialadminFormData);
    const[studentFormData,setstudentFormData] = useState(initialstudentFormData);
    const[file,setFile] = useState(null);

    const currentAuthUser = useUser()
    const {user}=currentAuthUser;

    function handleFileChange(event){
        event.preventDefault();
        console.log(event.target.files);
        setFile(event.target.files[0]);
    }
    
    async function handleUploadPdfToSupabase(){
        const {data,error} = await supabaseClient.storage.from('job-board-public').upload(`/public/${file.name}`,file,{
            cacheControl:"3600",
            upsert:false,
        });
        console.log(data,error);
        if(data){
            setstudentFormData({
                ...studentFormData,
                resume:data.path
            })
        }
    }

    useEffect(()=>{
        if(file) handleUploadPdfToSupabase();
    }, [file]);

    function handleTabChange(value){
        setCurrentTab(value)
    }

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
     function handleStudentFormValidation (){
        return (
        Object.keys(studentFormData).every(key=>studentFormData[key].trim()!=='')
        );
    }
    

    async function createProfileAction(){
        const data = currentTab === 'student' ? {
            studentInfo : studentFormData,
            role: 'student',
            isPremiumUser: false,
            userId:user?.id,
            email:user?.primaryEmailAddress?.emailAddress
        } :{
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
                        handleFileChange={handleFileChange}
                        isBtnDisabled={!handleStudentFormValidation()}
                        action = {createProfileAction}
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
