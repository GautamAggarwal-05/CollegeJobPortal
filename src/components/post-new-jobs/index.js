'use client'
import { DialogTitle } from '@radix-ui/react-dialog';
import {Button} from '../ui/button'
import {Dialog, DialogContent, DialogHeader} from '../ui/dialog'
import { useState } from 'react';
import CommonForm from '../common-form/index';
import { InitialpostNewJobFormData, postNewJobFormControls } from '../../utils';
import { PostNewJobAction } from '../../actions';
import { useToast } from '@/hooks/use-toast';
function PostNewJob({profileInfo,user}){
    const [showJobDialog,setShowJobDialog] = useState(false);
    const[jobFormData,setJobFormData] = useState(InitialpostNewJobFormData);
    const {toast} = useToast() 
    function handlePostNewJobValid(){
        return Object.keys(jobFormData).every((control)=> jobFormData[control].trim()!=="");
    }
    async function createNewJob(){
        await PostNewJobAction({
            ...jobFormData,
            adminId:user?.id,
            applicants : [],
    },'/jobs')

    setJobFormData(InitialpostNewJobFormData)
    setShowJobDialog(false);

    toast({
        title: "New Job Posted Successfully",
        description: `A new job listing for ${jobFormData?.role} at ${jobFormData?.companyName} was created`,
      })
}

    return (
        <div>
            <Button onClick={()=>setShowJobDialog(true)}  className="disabled:opacity-60 flex h-11 items-center justify-center px-5"
            >Post A Job</Button>
            <Dialog open={showJobDialog} onOpenChange={()=>setShowJobDialog(false)}>
                    <DialogContent className='sm:mx-w-screen-md h-[600px] overflow-auto'>
                        <DialogHeader>
                            <DialogTitle>Post New Job</DialogTitle>
                            <div className='grid gap-4 py-4'>
                                <CommonForm
                                buttonText = {'Add'}
                                formData = {jobFormData}
                                setFormData={setJobFormData}
                                formControls={postNewJobFormControls}
                                isBtnDisabled={!handlePostNewJobValid()}
                                action={createNewJob}/>
                            </div>
                        </DialogHeader>
                    </DialogContent>
            </Dialog>   
        </div>
    )
}

export default PostNewJob;

