// mockData.js - Sample data for Parents table

export const parentsData = [
    {
        id: 'P101',
        name: 'Rajesh Kumar',
        occupation: 'House Wife',
        phone: '+91 9674563210',
        email: 'example@gmail.com',
        childName: 'Name'
    },
    {
        id: 'P102',
        name: 'Priya Sharma',
        occupation: 'Engineer',
        phone: '+91 9674563210',
        email: 'example@gmail.com',
        childName: 'Name'
    },
    {
        id: 'P103',
        name: 'Amit Singh',
        occupation: 'House Wife',
        phone: '+91 9674563210',
        email: 'example@gmail.com',
        childName: 'Name'
    },
    {
        id: 'P104',
        name: 'Sunita Gupta',
        occupation: 'House Wife',
        phone: '+91 9674563210',
        email: 'example@gmail.com',
        childName: 'Name'
    },
    {
        id: 'P105',
        name: 'Vikram Patel',
        occupation: 'Doctor',
        phone: '+91 9674563210',
        email: 'example@gmail.com',
        childName: 'Name'
    },
    {
        id: 'P106',
        name: 'Meera Joshi',
        occupation: 'Engineer',
        phone: '+91 9674563210',
        email: 'example@gmail.com',
        childName: 'Name'
    },
    {
        id: 'S107',
        name: 'Ravi Agarwal',
        occupation: 'Engineer',
        phone: '+91 9674563210',
        email: 'example@gmail.com',
        childName: 'Name'
    },
    {
        id: 'S108',
        name: 'Kavya Reddy',
        occupation: 'Businessman',
        phone: '+91 9674563210',
        email: 'example@gmail.com',
        childName: 'Name'
    },
    {
        id: 'S109',
        name: 'Arjun Malhotra',
        occupation: 'Doctor',
        phone: '+91 9674563210',
        email: 'example@gmail.com',
        childName: 'Name'
    },
    {
        id: 'S110',
        name: 'Deepika Verma',
        occupation: 'Doctor',
        phone: '+91 9674563210',
        email: 'example@gmail.com',
        childName: 'Name'
    },
    // Generate additional 90 parents
    ...Array.from({ length: 90 }, (_, index) => {
        const num = index + 111;
        const occupations = ['Engineer', 'Doctor', 'Teacher', 'Businessman', 'House Wife', 'Lawyer', 'Accountant'];
        return {
            id: `P${num}`,
            name: `Parent ${num}`,
            occupation: occupations[index % occupations.length],
            phone: '+91 9674563210',
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