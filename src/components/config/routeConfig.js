// config/routeConfig.js

/**
 * Centralized route configuration for the application
 * This makes it easy to manage routes, breadcrumbs, icons, and metadata
 * 
 * active -> current tab
 * isBreadcrumb -> true if the breadcrumb is clickable, it wont be unless active is set false, or it isnt the last tab opened
 */

export const ROUTE_CONFIG = {
    // Dashboard
    '/dashboard': {
        title: 'Dashboard',
        icon: 'home',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Dashboard', path: '/dashboard', active: true, isBreadcrumb: false }
        ]
    },

    // Profile routes
    '/profile': {
        title: 'Profile',
        icon: 'profile',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Profile', path: '/profile', active: true, isBreadcrumb: true }
        ]
    },
    '/profile/change-password': {
        title: 'Change Password',
        icon: 'password',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Profile', path: '/profile', active: false, isBreadcrumb: true },
            { label: 'Change Password', path: '/profile/change-password', active: true, isBreadcrumb: true }
        ]
    },

    '/users/students': {
        title: 'Students',
        icon: 'students',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Users', path: '/users', active: false, isBreadcrumb: false },
            { label: 'Students', path: '/users/students', active: true, isBreadcrumb: true }
        ]
    },
    '/users/students/add-student': {
        title: 'Add Student',
        icon: 'addStudent',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Users', path: '/users', active: false, isBreadcrumb: false },
            { label: 'Students', path: '/users/students', active: false, isBreadcrumb: false },
            { label: 'Add Student', path: '/users/students/add-student', active: true, isBreadcrumb: true }
        ]
    },

    '/users/teachers': {
        title: 'Teachers',
        icon: 'teachers',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Users', path: '/users', active: false, isBreadcrumb: false },
            { label: 'Teachers', path: '/users/teachers', active: true, isBreadcrumb: true }
        ]
    },
    '/users/teachers/add-teacher': {
        title: 'Add Teacher',
        icon: 'addTeacher',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Users', path: '/users', active: false, isBreadcrumb: false },
            { label: 'Teachers', path: '/users/teachers', active: false, isBreadcrumb: false },
            { label: 'Add Teacher', path: '/users/teachers/add-teacher', active: true, isBreadcrumb: true }
        ]
    },
    '/users/staff': {
        title: 'Staff',
        icon: 'staff',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Users', path: '/users', active: false, isBreadcrumb: false },
            { label: 'Staff', path: '/users/staff', active: true, isBreadcrumb: true }
        ]
    },
    '/users/staff/add-staff': {
        title: 'Add Staff',
        icon: 'addStaff',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Users', path: '/users', active: false, isBreadcrumb: false },
            { label: 'Staff', path: '/users/staff', active: false, isBreadcrumb: false },
            { label: 'Add Staff', path: '/users/staff/add-staff', active: true, isBreadcrumb: true }
        ]
    },
    '/users/parents': {
        title: 'Parents',
        icon: 'parents',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Users', path: '/users', active: false, isBreadcrumb: false },
            { label: 'Parents', path: '/users/parents', active: true, isBreadcrumb: true }
        ]
    },
    '/users/parents/add-parents': {
        title: 'Add Parent',
        icon: 'addParent',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Users', path: '/users', active: false, isBreadcrumb: false },
            { label: 'Parents', path: '/users/parents', active: false, isBreadcrumb: false },
            { label: 'Add Parent', path: '/users/parents/add-parents', active: true, isBreadcrumb: true }
        ]
    },
     '/users/roles': {
        title: 'Roles',
        icon: 'roles',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Users', path: '/users', active: false, isBreadcrumb: false },
            { label: 'Roles', path: '/users/roles', active: true, isBreadcrumb: true }
        ]
    },





     
    '/academic/classes': {
        title: 'Classes',
        icon: 'classes',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Academic', path: '/academic', active: false, isBreadcrumb: false },
            { label: 'Classes', path: '/academic/classes', active: true, isBreadcrumb: true }
        ]
    },

    '/academic/classes/all-classes': {
        title: 'All Classes',
        icon: 'classes',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Academic', path: '/academic', active: false, isBreadcrumb: false },
            { label: 'Classes', path: '/academic/classes', active: false, isBreadcrumb: true },
            { label: 'All Classes', path: '/academic/classes/all-classes', active: true, isBreadcrumb: true }
        ]
    },

    '/academic/schedule': {
        title: 'Schedule',
        icon: 'schedule',   
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Academic', path: '/academic', active: false, isBreadcrumb: false },
            { label: 'Classes', path: '/academic/classes', active: false, isBreadcrumb: false },
            { label: 'Schedule', path: '/academic/schedule', active: true, isBreadcrumb: true }
          

        ]
    },
    '/academic/timetable': {
        title: 'Timetable',
        icon: 'timetable',   
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Academic', path: '/academic', active: false, isBreadcrumb: false },
            { label: 'Timetable', path: '/academic/timetable', active: true, isBreadcrumb: true }
        ]
    },

    '/academic/assignments': {
        title: 'Assignments',
        icon: 'assignments',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Academic', path: '/academic', active: false, isBreadcrumb: false },
            { label: 'Assignments', path: '/academic/assignments', active: true, isBreadcrumb: true }
        ]
    },

    '/academic/leaves/leave-history': {
        title: 'Leaves History',
        icon: 'leaves',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Academic', path: '/academic', active: false, isBreadcrumb: false },
            { label: 'Leaves', path: '/academic/leaves', active: false, isBreadcrumb: true },
            { label: 'Leaves History', path: '/academic/leaves/leave-history', active: true, isBreadcrumb: true }
        ]
    },
    '/academic/timetable/add-timetable': {
        title: 'Add Timetable',
        icon: 'addTimetable',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Academic', path: '/academic', active: false, isBreadcrumb: false },
            { label: 'Timetable', path: '/academic/timetable', active: false, isBreadcrumb: false },
            { label: 'Add Timetable', path: '/academic/timetable/add-timetable', active: true, isBreadcrumb: true }
        ]
    },
    '/academic/exams': {
        title: 'Exams',
        icon: 'exams',   
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Academic', path: '/academic', active: false, isBreadcrumb: false },
            { label: 'Exams', path: '/academic/exams', active: false, isBreadcrumb: true },
            { label: 'Exams List', path: '/academic/exams', active: true, isBreadcrumb: true }
        ]
    },

    '/academic/exams/attendance': {
        title: 'Exam Attendance',
        icon: 'attendance',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Academic', path: '/academic', active: false, isBreadcrumb: false },
            { label: 'Exams', path: '/academic/exams', active: false, isBreadcrumb: true },
            { label: 'Exams List', path: '/academic/exams', active: false, isBreadcrumb: true },
            { label: 'Attendance', path: '/academic/exams/attendance', active: true, isBreadcrumb: true }
        ]
    },

    '/academic/exams/result': {
        title: 'Exam Result',
        icon: 'exams',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Academic', path: '/academic', active: false, isBreadcrumb: false },
            { label: 'Exams', path: '/academic/exams', active: false, isBreadcrumb: true },
            { label: 'Exams List', path: '/academic/exams', active: false, isBreadcrumb: true },
            { label: 'Result', path: '/academic/exams/result', active: true, isBreadcrumb: true }
        ]
    },
   
    '/reports/attendance': {
        title: 'Attendance',
        icon: 'attendance',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Reports', path: '/reports', active: false, isBreadcrumb: false },
            { label: 'Attendance', path: '/reports/attendance', active: true, isBreadcrumb: true }
        ]
    },
    '/reports/attendance/student-attendance': {
        title: 'Student Attendance',
        icon: 'attendance',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Reports', path: '/reports', active: false, isBreadcrumb: false },
            { label: 'Attendance', path: '/reports/attendance', active: false, isBreadcrumb: true },
            { label: 'Student Attendance', path: '/reports/attendance/student-attendance', active: true, isBreadcrumb: true }
        ]
    },
    '/reports/marks': {
        title: 'Marks',
        icon: 'marks',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Reports', path: '/reports', active: false, isBreadcrumb: false },
            { label: 'Marks', path: '/reports/marks', active: true, isBreadcrumb: true }
        ]
    },
    '/reports/marks/marks-report-list': {
        title: 'Marks Report List',
        icon: 'marks',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Reports', path: '/reports', active: false, isBreadcrumb: false },
            { label: 'Marks', path: '/reports/marks', active: false, isBreadcrumb: true },
            { label: 'Marks Report List', path: '/reports/marks/marks-report-list', active: true, isBreadcrumb: true }
        ]
    },
    
   


    


    '/announcements': {
        title: 'Announcements',
        icon: 'announcements',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Announcements', path: '/announcements', active: true, isBreadcrumb: true }
        ]
    },
    '/announcements/holidays-list': {
        title: 'Holidays List',
        icon: 'holidays',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Announcements', path: '/announcements', active: false, isBreadcrumb: false },
            { label: 'Holidays List', path: '/announcements/holidays-list', active: true, isBreadcrumb: true }
        ]
    },
    '/announcements/notice-board': {
        title: 'Notice Board',
        icon: 'noticeboard',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Announcements', path: '/announcements', active: false, isBreadcrumb: false },
            { label: 'Notice Board', path: '/announcements/notice-board', active: true, isBreadcrumb: true }
        ]
    },
    '/announcements/events': {
        title: 'Events',
        icon: 'events',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Announcements', path: '/announcements', active: false, isBreadcrumb: false },
            { label: 'Events', path: '/announcements/events', active: true, isBreadcrumb: true }
        ]
    },
    '/announcements/competitions': {
        title: 'Competitions',
        icon: 'competitions',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Announcements', path: '/announcements', active: false, isBreadcrumb: false },
            { label: 'Competitions', path: '/announcements/competitions', active: true, isBreadcrumb: true }
        ]
    },
    '/announcements/workshops': {
        title: 'Workshops',
        icon: 'workshops',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Announcements', path: '/announcements', active: false, isBreadcrumb: false },
            { label:  'Workshops', path: '/announcements/workshops', active: true, isBreadcrumb: true }
        ]
    },

    // Chat routes
    '/chat': {
        title: 'All Chats',
        icon: 'chat',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Chat', path: '/chat', active: false, isBreadcrumb: false },
            { label: 'All Chats', path: '/chat', active: true, isBreadcrumb: true }
        ]
    },
    '/chat/archived': {
        title: 'Archived Chats',
        icon: 'archive',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Chat', path: '/chat', active: false, isBreadcrumb: false },
            { label: 'Archived Chats', path: '/chat/archived', active: true, isBreadcrumb: true }
        ]
    },
    '/chat/edit': {
        title: 'Edit Chat',
        icon: 'edit',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Chat', path: '/chat', active: false, isBreadcrumb: true },
            { label: 'Edit Chat', path: '/chat/edit', active: true, isBreadcrumb: true }
        ]
    }
}

/**
 * UNIFIED NAVIGATION CONFIGURATION
 * Add new navigation types here - everything is automatically handled!
 */
export const NAVIGATION_OPTIONS = {
    // Academic navigation options
    academic: [
        {
            text: "Classes",
            path: "/academic/classes",
            icon: "classes",
            disabled: false,
            hidden: false
        },
        {
            text: "All Classes",
            path: "/academic/classes/all-classes",
            icon: "classes",
            disabled: false,
            hidden: false
        },
        {
            text: "Schedule",
            path: "/academic/schedule",
            icon: "schedule",
            disabled: false,
            hidden: false
        },
        {
            text: "Timetable",
            path: "/academic/timetable",
            icon: "timetable",
            disabled: false,
            hidden: false
        },
        {
            text: "Assignments",
            path: "/academic/assignments",
            icon: "assignments",
            disabled: false,
            hidden: false
        },
        {
            text: "Leaves",
            path: "/academic/leaves/leave-history",
            icon: "leaves",
            disabled: false,
            hidden: false
        },
        {
            text: "Exams",
            path: "/academic/exams",
            icon: "exams",
            disabled: false,
            hidden: false
        },
        {
            text: "Exam Attendance",
            path: "/academic/exams/attendance",
            icon: "attendance",
            disabled: false,
            hidden: false
        },
        {
            text: "Exam Result",
            path: "/academic/exams/result",
            icon: "exams",
            disabled: false,
            hidden: false
        }
    ],
    // Users navigation options
      users: [
        {
            text: "Students",
            path: "/users/students",
            icon: "students",
            disabled: false,
            hidden: false
        },
        {
            text: "Parents",
            path: "/users/parents",
            icon: "parents",
            disabled: false,
            hidden: false
        }
    ],

    // Reports navigation options
    reports: [
        
        {
            text: "Attendance",
            path: "/reports/attendance",
            icon: "attendance",
            disabled: false,
            hidden: false
        },
        {
            text: "Student Attendance",
            path: "/reports/attendance/student-attendance",
            icon: "attendance",
            disabled: false,
            hidden: false
        },
        {
            text: "Marks",
            path: "/reports/marks",
            icon: "marks",
            disabled: false,
            hidden: false
        },
        {
            text: "Marks Report List", 
            path: "/reports/marks/marks-report-list",
            icon: "marks",
            disabled: false,
            hidden: false
        }
    ],

    // Announcements navigation options
    announcements: [
        {
            text: "Holidays List",
            path: "/announcements/holidays-list",
            icon: "holidays",
            disabled: false,    
            hidden: false
        },
        {
            text: "Notice Board",
            path: "/announcements/notice-board",
            icon: "noticeboard",
            disabled: false,
            hidden: false
        },
        {
            text: "Events",
            path: "/announcements/events",
            icon: "events",
            disabled: false,
            hidden: false
        },
        {
            text: "Competitions",
            path: "/announcements/competitions",
            icon: "competitions",
            disabled: false,
            hidden: false
        },
        {
            text: "Workshops",
            path: "/announcements/workshops",
            icon: "workshops",
            disabled: false,
            hidden: false
        }
    ],

    // Chat navigation options
    chat: [
        {
            text: "All Chats",
            path: "/chat",
            icon: "chat",
            disabled: false,
            hidden: false
        },
        {
            text: "Archived Chats",
            path: "/chat/archived",
            icon: "archive",
            disabled: false,
            hidden: false
        }
    ],
}

/**
 * Main navigation tabs configuration
 */
export const NAVIGATION_TABS = [
    { id: "dashboard", name: "Dashboard", hasDropdown: false, disabled: false, hidden: false },
    { id: "users", name: "Users", hasDropdown: true, disabled: false, hidden: false },
    { id: "academic", name: "Academic", hasDropdown: true, disabled: false, hidden: false },
    { id: "reports", name: "Reports", hasDropdown: true, disabled: false, hidden: false },
    { id: "announcements", name: "Announcements", hasDropdown: true, disabled: false, hidden: false },
    { id: "accounts", name: "Accounts", hasDropdown: true, disabled: true, hidden: true },
    { id: "chat", name: "Chat", hasDropdown: true, disabled: false, hidden: false },
]

/**
 * NAVIGATION HELPER FUNCTIONS
 * These automatically determine what navigation to show based on current route
 */

/**
 * Get the navigation type from the current pathname
 * @param {string} pathname - Current pathname
 * @returns {string|null} - Navigation type (academic, leads, etc.) or null
 */
export function getNavigationType(pathname) {
    if (pathname.startsWith('/academic')) return 'academic'
    if (pathname.startsWith('/chat')) return 'chat'
    if (pathname.startsWith('/users')) return 'users'
    if (pathname.startsWith('/reports')) return 'reports'
    if (pathname.startsWith('/announcements')) return 'announcements'
    if (pathname.startsWith('/accounts')) return 'accounts'
    return null
}

/**
 * Get navigation options for a specific type
 * @param {string} navigationType - Type of navigation (academic, leads, etc.)
 * @returns {Array} - Array of navigation options
 */
export function getNavigationOptions(navigationType) {
    return NAVIGATION_OPTIONS[navigationType] || []
}

/**
 * Check if current route should show navigation
 * @param {string} pathname - Current pathname
 * @returns {boolean} - Whether to show navigation
 */
export function shouldShowNavigation(pathname) {
    const navigationType = getNavigationType(pathname)
    return navigationType !== null && getNavigationOptions(navigationType).length > 0
}

// Legacy exports for backward compatibility (you can remove these once everything is updated)
export const ACADEMIC_DROPDOWN_OPTIONS = NAVIGATION_OPTIONS.academic
export const CHAT_DROPDOWN_OPTIONS = NAVIGATION_OPTIONS.chat
export const USERS_DROPDOWN_OPTIONS = NAVIGATION_OPTIONS.users