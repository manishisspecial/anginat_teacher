// mockData.js - Sample data for Parents table

export const parentsData = [
    {
        id: 'P101',
        name: 'Name',
        occupation: 'House Wife',
        phone: '+91 9874563210',
        email: 'example@gmail.com',
        childName: 'Name'
    },
    {
        id: 'P102',
        name: 'Name',
        occupation: 'Engineer',
        phone: '+91 9874563210',
        email: 'example@gmail.com',
        childName: 'Name'
    },
    {
        id: 'P103',
        name: 'Name',
        occupation: 'House Wife',
        phone: '+91 9874563210',
        email: 'example@gmail.com',
        childName: 'Name'
    },
    {
        id: 'P104',
        name: 'Name',
        occupation: 'House Wife',
        phone: '+91 9874563210',
        email: 'example@gmail.com',
        childName: 'Name'
    },
    {
        id: 'P105',
        name: 'Name',
        occupation: 'Doctor',
        phone: '+91 9874563210',
        email: 'example@gmail.com',
        childName: 'Name'
    },
    {
        id: 'P106',
        name: 'Name',
        occupation: 'Engineer',
        phone: '+91 9874563210',
        email: 'example@gmail.com',
        childName: 'Name'
    },
    {
        id: 'P107',
        name: 'Name',
        occupation: 'Engineer',
        phone: '+91 9874563210',
        email: 'example@gmail.com',
        childName: 'Name'
    },
    {
        id: 'P108',
        name: 'Name',
        occupation: 'Businessman',
        phone: '+91 9874563210',
        email: 'example@gmail.com',
        childName: 'Name'
    },
    {
        id: 'P109',
        name: 'Name',
        occupation: 'Doctor',
        phone: '+91 9874563210',
        email: 'example@gmail.com',
        childName: 'Name'
    },
    {
        id: 'P110',
        name: 'Name',
        occupation: 'Doctor',
        phone: '+91 9874563210',
        email: 'example@gmail.com',
        childName: 'Name'
    },
    // Generate additional 90 parents
    ...Array.from({ length: 90 }, (_, index) => {
        const num = index + 111;
        const occupations = ['Engineer', 'Doctor', 'Teacher', 'Businessman', 'House Wife', 'Lawyer', 'Accountant'];
        return {
            id: `P${num}`,
            name: 'Name',
            occupation: occupations[index % occupations.length],
            phone: '+91 9874563210',
            email: 'example@gmail.com',
            childName: 'Name'
        };
    })
];

export const tableHeaders = [
    'ID',
    'Name', 
    'Occupation',
    'Phone',
    'Email',
    'Child Name',
    'Actions'
];