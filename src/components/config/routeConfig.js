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




    '/academic/course/courses': {
        title: 'Courses',
        icon: 'courses',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Academic', path: '/academic', active: false, isBreadcrumb: false },
            { label: 'Courses', path: '/academic/course/courses', active: true, isBreadcrumb: true }
        ]
    },

    '/academic/course/add-courses': {
        title: 'Add Course',
        icon: 'addCourse',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Academic', path: '/academic', active: false, isBreadcrumb: false },
            { label: 'Add Course', path: '/academic/course/add-courses', active: true, isBreadcrumb: true }
        ]
    },
    '/academic/study-material': {
        title: 'Study Material',
        icon: 'materials',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Academic', path: '/academic', active: false, isBreadcrumb: false },
            { label: 'Study Material', path: '/academic/study-material', active: true, isBreadcrumb: true }
        ]
    },
    '/academic/study-material/add-study-material': {
        title: 'Add Study Material',
        icon: 'addMaterial',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Academic', path: '/academic', active: false, isBreadcrumb: false },
            { label: 'Study Material', path: '/academic/study-material', active: false, isBreadcrumb: false },
            { label: 'Add Study Material', path: '/academic/study-material/add-study-material', active: true, isBreadcrumb: false }
        ]
    },
     
    '/academic/classes': {
        title: 'Classes',
        icon: 'classes',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Academic', path: '/academic', active: false, isBreadcrumb: false },
            { label: 'Classes', path: '/academic/classes', active: true, isBreadcrumb: true },
            { label: 'All Classes', path: '/academic/classes', active: false, isBreadcrumb: false }
          
        ]
    },

    '/academic/schedule': {
        title: 'Schedule ',
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
        title: 'Timetable ',
        icon: 'timetable',   
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Academic', path: '/academic', active: false, isBreadcrumb: false },
            { label: 'Timetable', path: '/academic/timetable', active: true, isBreadcrumb: true }


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
          
            { label: 'Exams', path: '/academic/exams', active: true, isBreadcrumb: true },
            { label: 'Exams List', path: '/academic/exams', active: false, isBreadcrumb: false }


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
    '/reports/leaves': {
        title: 'Leaves',
        icon: 'leaves',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Reports', path: '/reports', active: false, isBreadcrumb: false },
            { label: 'Leaves', path: '/reports/leaves', active: true, isBreadcrumb: true }
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
    '/reports/feestype': {
        title: 'Fees Type',
        icon: 'Fees Type',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Reports', path: '/reports', active: false, isBreadcrumb: false },
            { label: 'Fees', path: '/reports', active: true, isBreadcrumb: true },
            { label: 'Fees Type', path: '/reports/feestype', active: true, isBreadcrumb: true }
            
        ]
    },
    '/reports/feesassign': {
        title: 'Fees Assign',
        icon: 'Fees Type',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Reports', path: '/reports', active: false, isBreadcrumb: false },
            { label: 'Fees', path: '/reports', active: true, isBreadcrumb: true },
            { label: 'Fees Assign', path: '/reports/feestype', active: true, isBreadcrumb: true }
            
        ]
    },
    '/reports/collectfees': {
        title: 'Collect Fees',
        icon: 'Collect Fees',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Reports', path: '/reports', active: false, isBreadcrumb: false },
            { label: 'Fees', path: '/reports', active: true, isBreadcrumb: true },
            { label: 'Collect Fees', path: '/reports/collectfees', active: true, isBreadcrumb: true }
            
        ]
    },
    '/reports/feesreport': {
        title: 'Fees Report',
        icon: 'Fees Report',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Reports', path: '/reports', active: false, isBreadcrumb: false },
            { label: 'Fees', path: '/reports', active: true, isBreadcrumb: true },
            { label: 'Fees Report', path: '/reports/feesreport', active: true, isBreadcrumb: true }
            
        ]
    },
    
   


    
    '/academic/course/edit': {
        title: 'Edit Course',
        icon: 'editCourse',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Academic', path: '/academic', active: false, isBreadcrumb: true },
            { label: 'Courses', path: '/academic/course/courses', active: false, isBreadcrumb: true },
            { label: 'Edit Course', path: '/academic/course/edit', active: true, isBreadcrumb: true }
        ]
    },

    '/announcements/holidays': {
        title: 'Holidays',
        icon: 'holidays',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Announcements', path: '/announcements', active: false, isBreadcrumb: false },
            { label: 'Holidays', path: '/announcements/holidays', active: true, isBreadcrumb: true }
        ]
    },
    '/announcements/noticeboard': {
        title: 'Notice Board',
        icon: 'noticeboard',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Announcements', path: '/announcements', active: false, isBreadcrumb: false },
            { label: 'Notice Board', path: '/announcements/noticeboard', active: true, isBreadcrumb: true }
        ]
    },
     '/announcements/competition': {
        title: 'Events',
        icon: 'competition',
       
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Announcements', path: '/announcements', active: false, isBreadcrumb: false },
            { label: 'Competition', path: '/announcements/competition', active: true, isBreadcrumb: true }
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

    // Leads routes
    '/leads': {
        title: 'All Leads',
        icon: 'leads',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Leads', path: '/leads', active: false, isBreadcrumb: false },
            { label: 'All Leads', path: '/leads', active: true, isBreadcrumb: true }
        ]
    },
    '/leads/trash': {
        title: 'Trash Leads',
        icon: 'trash',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Leads', path: '/leads', active: false, isBreadcrumb: false },
            { label: 'Trash Leads', path: '/leads/trash', active: true, isBreadcrumb: true }
        ]
    },
    '/leads/edit': {
        title: 'Edit Lead',
        icon: 'edit',
        iconBgColor: '#0364F3',
        breadcrumbs: [
            { label: 'Home', path: '/dashboard', active: false, isBreadcrumb: true },
            { label: 'Leads', path: '/leads', active: false, isBreadcrumb: true },
            { label: 'Edit Lead', path: '/leads/edit', active: true, isBreadcrumb: true }
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
            text: "Courses",
            path: "/academic/course/courses",
            icon: "courses",
            disabled: false,
            hidden: false
        },
        {
            text: "Add Courses",
            path: "/academic/course/add-courses",
            icon: "addCourse",
            disabled: false,
            hidden: false
        },

        {
            text: "Study Material",
            path: "/academic/study-material",
            icon: "materials",
            disabled: false,
            hidden: false
        },

        {
            text: "Classes",
            path: "/academic/classes",
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
        }
        ,
        {
            text: "Exams",
            path: "/academic/exams",
            icon: "timetable",
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
            text: "Teachers",
            path: "/users/teachers",
            icon: "teachers",
            disabled: false,
            hidden: false
        },

        {
            text: "Staff",
            path: "/users/staff",
            icon: "staff",
            disabled: false,
            hidden: false
        },
        {
            text: "Parents",
            path: "/users/parents",
            icon: "parents",
            disabled: false,
            hidden: false
        },
        {
            text: "Roles",
            path: "/users/roles",
            icon: "roles",
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
            text: "Leaves",
            path: "/reports/leaves",
            icon: "leaves",
            disabled: false,
            hidden: false
        }
        ,{
            text: "Marks",
            path: "/reports/marks",
            icon: "marks",
            disabled: false,
            hidden: false
        }
        ,{
            text: "FeesType", 
            path: "/reports/feestype",
            icon: "marks",
            disabled: false,
            hidden: false
        }
        ,{
            text: "Fees Assign", 
            path: "/reports/feesassign",
            icon: "marks",
            disabled: false,
            hidden: false
        }
        ,{
            text: "Collect Fees", 
            path: "/reports/collectfees",
            icon: "marks",
            disabled: false,
            hidden: false
        }
        ,{
            text: "Fees Report", 
            path: "/reports/feesreport",
            icon: "marks",
            disabled: false,
            hidden: false
        }
        


    ],

    // Announcements navigation options
    announcements: [
        {
            text: "Holidays",
            path: "/announcements/holidays",
            icon: "holidays",
            disabled: false,    
            hidden: false
        },
        {
            text: "Notice Board",
            path: "/announcements/noticeboard",
            icon: "noticeboard",
            disabled: false,
            hidden: false
        },
        {
            text: "Events",
            path: "/announcements/competition",
            icon: "competition",
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

    // Leads navigation options
    leads: [
        {
            text: "All Leads",
            path: "/leads",
            icon: "leads",
            disabled: false,
            hidden: false
        },
        {
            text: "Trash Leads",
            path: "/leads/trash",
            icon: "trash",
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
    { id: "leads", name: "Leads", hasDropdown: true, disabled: false, hidden: false },
]

/**
 * NAVIGATION HELPER FUNCTIONS
 * These automatically determine what navigation to show based on current route
 */

/**
 * Get the navigation type from the current pathname
 * @param {string} pathname - Current pathname
 * @returns {string|null} - Navigation type (academic, leads, users, etc.) or null
 */
export function getNavigationType(pathname) {
    if (pathname.startsWith('/academic')) return 'academic'
    if (pathname.startsWith('/leads')) return 'leads'
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
export const LEADS_DROPDOWN_OPTIONS = NAVIGATION_OPTIONS.leads
export const USERS_DROPDOWN_OPTIONS = NAVIGATION_OPTIONS.users