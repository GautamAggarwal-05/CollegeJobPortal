import qs from 'query-string'

export const adminOnboardFormControls = [
    {
        label: "Name",
        name: "name", // matches 'name' in initialadminFormData
        placeholder: "Enter Your Name",
        componentType:"input",
        inputType:"text",
    },
    {
        label: 'College/University Name',
        name: 'collegeName', // matches 'collegeName' in initialadminFormData
        placeholder: 'Please provide the name of your college or university.',
        componentType: 'input',
        inputType:"text",
    },
    {
        label: 'College Location',
        name: 'collegeLocation', // matches 'collegeName' in initialadminFormData
        placeholder: 'Enter the location of your college (City, State).',
        componentType: 'input',
        inputType:"text",
    },
    {
        label: 'Role',
        name: 'role', // matches 'collegeRole' in initialadminFormData
        placeholder: 'What is your position at the college',
        componentType: 'input',
        inputType:"text",
    },
    {
        label: 'Department',
        name: 'department', 
        placeholder: 'Which department or office are you associated with',
        componentType: 'input',
        inputType:"text",
    },
];

export const initialadminFormData = {
    name: "",
    collegeName: "",
    collegeLocation: "",
    role: "",
    department: "",
};

export const studentOnboardFormControls = [
    {
        label:'Resume',
        name:'resume',
        placeholder: 'Upload Your Resume',
        componentType: 'file',
    },
    {
        label: 'Name',
        name: 'name', 
        placeholder: 'Enter Your Name',
        componentType: 'input',
        inputType:"text",
    },
    {
        label: 'College Name',
        name: 'collegeName', 
        placeholder: 'Enter Your college name',
        componentType: 'input',
        inputType:"text",
    },
    {
        label: 'Graduation Year',
        name: 'currentYear', 
        placeholder: 'Enter Your  Graduation year',
        componentType: 'input',
        inputType:"text",
    },
    {
        label: 'Current Location (College)',
        name: 'currentLocation', 
        placeholder: 'Please enter the address or select your current location if it’s near your college.',
        componentType: 'input',
        inputType:"text",
    },
    {
        label: 'Hometown/Residential Address',
        name: 'homeAddress', 
        placeholder: 'Provide the address of your hometown or primary residence',
        componentType: 'input',
        inputType:"text",
    },
    {
        label: 'Current CGPA',
        name: 'currentCGPA', 
        placeholder: 'Enter your current CGPA',
        componentType: 'input',
        inputType:"text",
    },
    {
        label: 'Skills',
        name: 'skills', 
        placeholder: 'Enter your skills',
        componentType: 'input',
        inputType:"text",
    },
    {
        label: 'Current Degree Program',
        name: 'degreeProgram', 
        placeholder: 'Enter your Degree Program',
        componentType: 'input',
        inputType:"text",
    },
    {
        label: 'major or field of study.',
        name: 'fieldStudy', 
        placeholder: 'Enter your major or field of study.',
        componentType: 'input',
        inputType:"text",
    },    
    {
        label: 'List any extracurricular activities or leadership roles.',
        name: 'extracurricularActivity', 
        placeholder: 'List any extracurricular activities or leadership roles.(if any)',
        componentType: 'input',
        inputType:"text",
    },    
    {
        label: 'Linkedin Profile',
        name: 'linkedinProfile', 
        placeholder: 'Enter your LinkedIn profile',
        componentType: 'input',
        inputType:"url",
    },    
    {
        label: 'Github Profile',
        name: 'githubProfile', 
        placeholder: 'Enter your Github profile',
        componentType: 'input',
        inputType:"url",
    },    

];

export const initialstudentFormData = {
    resume: '',
    name: '',
    collegeName: '',
    currentYear: '',
    currentLocation: '',
    homeAddress: '',
    currentCGPA: '',
    skills: '',
    degreeProgram: '',
    fieldStudy: '',
    extracurricularActivity: '',
    linkedinProfile: '',
    githubProfile: '',
}

export const initialstudentAccountFormData = {
    name: '',
    collegeName: '',
    currentYear: '',
    currentLocation: '',
    homeAddress: '',
    currentCGPA: '',
    skills: '',
    degreeProgram: '',
    fieldStudy: '',
    extracurricularActivity: '',
    linkedinProfile: '',
    githubProfile: '',
}

export const  postNewJobFormControls = [
    {
        label:"Company Name",
        name:"companyName",
        placeholder:"Company Name",
        componentType:"input",
        inputType:"text",
    },
    {
        label:"Job Role",
        name:"role",
        placeholder:"Job Role",
        componentType:"input",
        inputType:"text",
    },
    {
        label:"Batch Eligible",
        name:"batchEligible",
        placeholder:"Eligibility",
        componentType:"input",
        inputType:"text",
    },
    {
        label:"Expected Stipend",
        name:"expectedStipend",
        placeholder:"Enter the Stipend",
        componentType:"input",
        inputType:"text",
    },
    {
        label:"Job Location",
        name:"location",
        placeholder:"Enter the Job Location",
        componentType:"input",
        inputType:"text",
    },
    {
        label:"Apply Link",
        name:"applyLink",
        placeholder:"Put the link HERE",
        componentType:"input",
        inputType :"url",
    },


]
export const InitialpostNewJobFormData = {
    companyName : '',
    role:'',
    batchEligible:'',
    expectedStipend:'', 
    location: '',
    applyLink: '',
}

export const filterMenuDataArray = [
    {
        id: 'companyName',
        label: 'Company Name',
    },
    {
        id: 'role',
        label: 'Title',
    },
    {
        id: 'batchEligible',
        label: 'Eligibility',
    },
    {
        id: 'location',
        label: 'Location',
    },

]

// To Add ? = companyname etc etc to the url of the website i will use query string package
export function formUrlQuery({params, dataToAdd}){
    let currentURL = qs.parse(params);

    if(Object.keys(dataToAdd).length > 0){
        Object.keys(dataToAdd).map(key => {
            if(dataToAdd[key] === 0)
                delete currentURL[key];
            else
                currentURL[key] = dataToAdd[key].join(",");
        });
    }

    return qs.stringifyUrl({
        url: window.location.pathname,
        query: currentURL
    },
    {
        skipNull: true
    });
}