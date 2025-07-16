export const tableHeaders = [
    'ID',
    'Roles',
    'Status',
    'Actions'
];

export const classesData = [
    { id: 'RL101', type: 'Accountant', status: 'ACTIVE' },
    { id: 'RL102', type: 'Teacher', status: 'ACTIVE' },
    { id: 'RL103', type: 'Technical head', status: 'ACTIVE' },
    { id: 'RL104', type: 'Librarian', status: 'ACTIVE' },
    { id: 'RL105', type: 'Receptionist', status: 'ACTIVE' },
    { id: 'RL106', type: 'Role name', status: 'ACTIVE' },
    { id: 'RL107', type: 'Role name', status: 'ACTIVE' },
    { id: 'RL108', type: 'Role name', status: 'ACTIVE' },
    { id: 'RL109', type: 'Content', status: 'IN ACTIVE' },
    { id: 'RL110', type: 'Role name', status: 'ACTIVE' },
    ...Array.from({ length: 40 }, (_, index) => {
        const num = index + 111;
        return {
            id: `RL${num}`,
            type: 'Role name',
            status: 'ACTIVE'
        };
    })
];