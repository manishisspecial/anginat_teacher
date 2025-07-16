// mockdata.js - Sample data for Students table

export const studentsData = [
    {
        id: 'STU101',
        admissionNo: 'ADM101',
        rollNo: 'R101',
        name: 'John Doe',
        class: 'I',
        section: 'A',
        gender: 'Male',
        dateOfJoining: '01-Jan-2024'
    },
    {
        id: 'STU102',
        admissionNo: 'ADM102',
        rollNo: 'R102',
        name: 'Jane Smith',
        class: 'II',
        section: 'B',
        gender: 'Female',
        dateOfJoining: '01-Jan-2024'
    },
    {
        id: 'STU103',
        admissionNo: 'ADM103',
        rollNo: 'R103',
        name: 'Mike Johnson',
        class: 'III',
        section: 'A',
        gender: 'Male',
        dateOfJoining: '02-Jan-2024'
    },
    {
        id: 'STU104',
        admissionNo: 'ADM104',
        rollNo: 'R104',
        name: 'Sarah Williams',
        class: 'I',
        section: 'C',
        gender: 'Female',
        dateOfJoining: '02-Jan-2024'
    },
    {
        id: 'STU105',
        admissionNo: 'ADM105',
        rollNo: 'R105',
        name: 'David Brown',
        class: 'IV',
        section: 'A',
        gender: 'Male',
        dateOfJoining: '03-Jan-2024'
    },
    {
        id: 'STU106',
        admissionNo: 'ADM106',
        rollNo: 'R106',
        name: 'Emily Davis',
        class: 'II',
        section: 'B',
        gender: 'Female',
        dateOfJoining: '03-Jan-2024'
    },
    {
        id: 'STU107',
        admissionNo: 'ADM107',
        rollNo: 'R107',
        name: 'James Wilson',
        class: 'V',
        section: 'A',
        gender: 'Male',
        dateOfJoining: '04-Jan-2024'
    },
    {
        id: 'STU108',
        admissionNo: 'ADM108',
        rollNo: 'R108',
        name: 'Emma Taylor',
        class: 'III',
        section: 'C',
        gender: 'Female',
        dateOfJoining: '04-Jan-2024'
    },
    {
        id: 'STU109',
        admissionNo: 'ADM109',
        rollNo: 'R109',
        name: 'Daniel Anderson',
        class: 'VI',
        section: 'A',
        gender: 'Male',
        dateOfJoining: '05-Jan-2024'
    },
    {
        id: 'STU110',
        admissionNo: 'ADM110',
        rollNo: 'R110',
        name: 'Olivia Martin',
        class: 'IV',
        section: 'B',
        gender: 'Female',
        dateOfJoining: '05-Jan-2024'
    },
    // Generate additional 90 students
    ...Array.from({ length: 90 }, (_, index) => {
        const num = index + 111;
        const isEvenIndex = index % 2 === 0;
        const gender = isEvenIndex ? 'Male' : 'Female';
        return {
            id: `STU${num}`,
            admissionNo: `ADM${num}`,
            rollNo: `R${num}`,
            name: `Student ${num}`,
            class: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][index % 10],
            section: ['A', 'B', 'C', 'D'][index % 4],
            gender: gender,
            dateOfJoining: `${String(index % 28 + 1).padStart(2, '0')}-Jan-2024`,
            gender: gender
       
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
    'Actions'
];