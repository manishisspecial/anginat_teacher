// mockdata.js - Sample data for Students table

export const studentsData = [
    {
        id: 'STU101',
        admissionNo: 'AD101',
        rollNo: '1',
        name: 'Student name III',
        class: 'A',
        section: 'A',
        gender: 'Female',
        dateOfJoining: '01-Jan-2025',
        dob: '01-Jan-2025'
    },
    {
        id: 'STU102',
        admissionNo: 'AD102',
        rollNo: '2',
        name: 'Student name X',
        class: 'B',
        section: 'B',
        gender: 'Male',
        dateOfJoining: '01-Jan-2025',
        dob: '01-Jan-2025'
    },
    {
        id: 'STU103',
        admissionNo: 'AD103',
        rollNo: '3',
        name: 'Student name III',
        class: 'C',
        section: 'C',
        gender: 'Female',
        dateOfJoining: '01-Jan-2025',
        dob: '01-Jan-2025'
    },
    {
        id: 'STU104',
        admissionNo: 'AD104',
        rollNo: '4',
        name: 'Student name V',
        class: 'A',
        section: 'A',
        gender: 'Male',
        dateOfJoining: '01-Jan-2025',
        dob: '01-Jan-2025'
    },
    {
        id: 'STU105',
        admissionNo: 'AD105',
        rollNo: '5',
        name: 'Student name Content',
        class: 'A',
        section: 'A',
        gender: 'Female',
        dateOfJoining: 'Content',
        dob: 'Content'
    },
    {
        id: 'STU106',
        admissionNo: 'AD106',
        rollNo: '6',
        name: 'Student name III',
        class: 'B',
        section: 'B',
        gender: 'Female',
        dateOfJoining: '01-Jan-2025',
        dob: '01-Jan-2025'
    },
    {
        id: 'STU107',
        admissionNo: 'AD107',
        rollNo: '7',
        name: 'Student name III',
        class: 'C',
        section: 'C',
        gender: 'Female',
        dateOfJoining: '01-Jan-2025',
        dob: '01-Jan-2025'
    },
    {
        id: 'STU108',
        admissionNo: 'AD108',
        rollNo: '8',
        name: 'Student name III',
        class: 'C',
        section: 'C',
        gender: 'Female',
        dateOfJoining: '01-Jan-2025',
        dob: '01-Jan-2025'
    },
    {
        id: 'STU109',
        admissionNo: 'AD109',
        rollNo: '9',
        name: 'Student name III',
        class: 'C',
        section: 'C',
        gender: 'Female',
        dateOfJoining: '01-Jan-2025',
        dob: '01-Jan-2025'
    },
    {
        id: 'STU110',
        admissionNo: 'AD110',
        rollNo: '10',
        name: 'Student name IV',
        class: 'C',
        section: 'C',
        gender: 'Female',
        dateOfJoining: '01-Jan-2025',
        dob: '01-Jan-2025'
    },
    // Generate additional 90 students with similar pattern
    ...Array.from({ length: 90 }, (_, index) => {
        const num = index + 111;
        const nameVariants = ['Student name III', 'Student name X', 'Student name V', 'Student name Content', 'Student name IV'];
        const classes = ['A', 'B', 'C'];
        const sections = ['A', 'B', 'C'];
        const isEvenIndex = index % 2 === 0;
        const gender = isEvenIndex ? 'Female' : 'Male';
        
        return {
            id: `STU${num}`,
            admissionNo: `AD${num}`,
            rollNo: `${num}`,
            name: nameVariants[index % nameVariants.length],
            class: classes[index % classes.length],
            section: sections[index % sections.length],
            gender: gender,
            dateOfJoining: '01-Jan-2025',
            dob: '01-Jan-2025'
        };
    })
];

export const tableHeaders = [
    'Admission No',
    'Roll No',
    'Name',
    'Class',
    'Section',
    'Gender',
    'Date of joining',
    'DOB',
    'Actions'
];