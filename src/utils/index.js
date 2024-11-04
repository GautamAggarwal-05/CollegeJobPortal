export const adminOnboardFormControls = [
    {
        label: "Name",
        name: "name", // matches 'name' in initialadminFormData
        placeholder: "Enter Your Name",
        componentType:"input",
    },
    {
        label: 'College/University Name',
        name: 'collegeName', // matches 'collegeName' in initialadminFormData
        placeholder: 'Please provide the name of your college or university.',
        componentType: 'input',
    },
    {
        label: 'College Location',
        name: 'collegeLocation', // matches 'collegeName' in initialadminFormData
        placeholder: 'Enter the location of your college (City, State).',
        componentType: 'input',
    },
    {
        label: 'Role',
        name: 'collegeRole', // matches 'collegeRole' in initialadminFormData
        placeholder: 'What is your position at the college',
        componentType: 'input',
    },
    {
        label: 'Department',
        name: 'department', 
        placeholder: 'Which department or office are you associated with',
        componentType: 'input',
    },
];

export const initialadminFormData = {
    name: "",
    collegeName: "",
    collegeLocation: "",
    collegeRole: "",
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
    },
    {
        label: 'College Name',
        name: 'collegeName', 
        placeholder: 'Enter Your college name',
        componentType: 'input',
    },
    {
        label: 'Current Year',
        name: 'currentYear', 
        placeholder: 'Enter Your current year',
        componentType: 'input',
    },
    {
        label: 'Current Location (College)',
        name: 'currentLoaction', 
        placeholder: 'Please enter the address or select your current location if it’s near your college.',
        componentType: 'input',
    },
    {
        label: 'Hometown/Residential Address',
        name: 'homeAddress', 
        placeholder: 'Provide the address of your hometown or primary residence',
        componentType: 'input',
    },
    {
        label: 'Current Location (College)',
        name: 'currentLoaction', 
        placeholder: 'Please enter the address or select your current location if it’s near your college.',
        componentType: 'input',
    },
    {
        label: 'Current CGPA',
        name: 'currentCGPA', 
        placeholder: 'Enter your current CGPA',
        componentType: 'input',
    },
    {
        label: 'Availability to Start',
        name: 'currentCGPA', 
        placeholder: 'When would you be available to start the position if selected',
        componentType: 'input',
    },
    {
        label: 'Skills',
        name: 'skills', 
        placeholder: 'Enter your skills',
        componentType: 'input',
    },
    {
        label: 'Current Degree Program',
        name: 'degreeProgram', 
        placeholder: 'Enter your Degree Program',
        componentType: 'input',
    },
    {
        label: 'major or field of study.',
        name: 'filedStudy', 
        placeholder: 'Enter your major or field of study.',
        componentType: 'input',
    },    
    {
        label: 'List any extracurricular activities or leadership roles.',
        name: 'extracurricularActivity', 
        placeholder: 'List any extracurricular activities or leadership roles.(if any)',
        componentType: 'input',
    },    
    {
        label: 'Linkedin Profile',
        name: 'linkededinProfile', 
        placeholder: 'Enter your LinkedIn profile',
        componentType: 'input',
    },    
    {
        label: 'Github Profile',
        name: 'githubProfile', 
        placeholder: 'Enter your Github profile',
        componentType: 'input',
    },    

];

export const initialstudentFormData = {
    resume: '',
    name: '',
    collegeName: '',
    currentYear: '',
    currentLoaction: '',
    homeAddress: '',
    currentCGPA: '',
    currentAvailability: '',
    skills: '',
    degreeProgram: '',
    filedStudy: '',
    extracurricularActivity: '',
    linkededinProfile: '',
    githubProfile: '',
}