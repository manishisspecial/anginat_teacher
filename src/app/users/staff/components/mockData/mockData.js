// mockData.js - Sample data for Staff table

export const staffData = [
    {
        id: 'S101',
        name: 'Rajesh Kumar',
        designation: 'Technical Head',
        phone: '+91 9874563210',
        email: 'rajesh.kumar@gmail.com',
        dateOfJoining: '01-Jan-2025'
    },
    {
        id: 'S102',
        name: 'Priya Sharma',
        designation: 'Accountant',
        phone: '+91 9874563211',
        email: 'priya.sharma@gmail.com',
        dateOfJoining: '01-Jan-2025'
    },
    {
        id: 'S103',
        name: 'Amit Patel',
        designation: 'Receptionist',
        phone: '+91 9874563212',
        email: 'amit.patel@gmail.com',
        dateOfJoining: '01-Jan-2025'
    },
    {
        id: 'S104',
        name: 'Meera Singh',
        designation: 'Librarian',
        phone: '+91 9874563213',
        email: 'meera.singh@gmail.com',
        dateOfJoining: '01-Jan-2025'
    },
    {
        id: 'S105',
        name: 'Vikram Gupta',
        designation: 'Administrative Officer',
        phone: '+91 9874563214',
        email: 'vikram.gupta@gmail.com',
        dateOfJoining: '01-Jan-2025'
    },
    {
        id: 'S106',
        name: 'Sunita Yadav',
        designation: 'Lab Assistant',
        phone: '+91 9874563215',
        email: 'sunita.yadav@gmail.com',
        dateOfJoining: '01-Jan-2025'
    },
    {
        id: 'S107',
        name: 'Arjun Reddy',
        designation: 'Security Guard',
        phone: '+91 9874563216',
        email: 'arjun.reddy@gmail.com',
        dateOfJoining: '01-Jan-2025'
    },
    {
        id: 'S108',
        name: 'Kavya Nair',
        designation: 'Counselor',
        phone: '+91 9874563217',
        email: 'kavya.nair@gmail.com',
        dateOfJoining: '01-Jan-2025'
    },
    {
        id: 'S109',
        name: 'Rohit Joshi',
        designation: 'Maintenance Staff',
        phone: '+91 9874563218',
        email: 'rohit.joshi@gmail.com',
        dateOfJoining: '01-Jan-2025'
    },
    {
        id: 'S110',
        name: 'Anjali Das',
        designation: 'Clerk',
        phone: '+91 9874563219',
        email: 'anjali.das@gmail.com',
        dateOfJoining: '01-Jan-2025'
    },
    // Generate additional 90 staff members
    ...Array.from({ length: 90 }, (_, index) => {
        const num = index + 111;
        const designations = [
            'Administrative Officer', 'Teacher', 'Lab Assistant', 'Librarian', 
            'Counselor', 'Clerk', 'Accountant', 'Receptionist', 
            'Security Guard', 'Maintenance Staff', 'Sports Coordinator',
            'Head Teacher', 'Vice Principal', 'Janitor'
        ];
        
        const firstNames = [
            'Rahul', 'Sonia', 'Deepak', 'Neha', 'Kiran', 'Pooja', 'Manoj', 'Ritu',
            'Suresh', 'Geeta', 'Ashok', 'Rekha', 'Vinod', 'Shila', 'Ravi', 'Seema',
            'Anil', 'Usha', 'Prakash', 'Maya', 'Santosh', 'Lata', 'Ajay', 'Kamla'
        ];
        
        const lastNames = [
            'Kumar', 'Sharma', 'Patel', 'Singh', 'Gupta', 'Yadav', 'Reddy', 'Nair',
            'Joshi', 'Das', 'Verma', 'Agarwal', 'Mishra', 'Chopra', 'Mehta', 'Shah'
        ];
        
        const firstName = firstNames[index % firstNames.length];
        const lastName = lastNames[index % lastNames.length];
        const designation = designations[index % designations.length];
        
        return {
            id: `S${num}`,
            name: `${firstName} ${lastName}`,
            designation: designation,
            phone: `+91 987456${String(num).padStart(4, '0')}`,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`,
            dateOfJoining: `${String((index % 28) + 1).padStart(2, '0')}-Jan-2025`
        };
    })
];

export const tableHeaders = [
    'ID',
    'Name',
    'Designation',
    'Phone',
    'Email',
    'Date of joining',
    'Actions'
];