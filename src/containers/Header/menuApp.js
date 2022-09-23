export const adminMenu = [
    {
        //quản lý người dùng
        name: 'menu.admin.user-manage',
        menus: [
            {
                name: 'menu.admin.crud',
                link: '/system/user-manage',
            },
            {
                name: 'menu.admin.crud-redux',
                link: '/system/user-redux',
            },
            {
                name: 'menu.admin.doctor-manage',
                link: '/system/manage-doctor',
            },
            //Quản lý kế hoạch khám bệnh của bác sĩ
            {
                name: 'menu.doctor.manage-schedule',
                link: '/doctor/manage-schedule',
            },
        ],
    },
    {
        //quản lý phong kham
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.clinic-manage',
                link: '/system/clinic-manage',
            },
        ],
    },
    {
        //quản lý chuyên khoa
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.specialty-manage',
                link: '/system/specialty-manage',
            },
        ],
    },
    {
        //quản lý cẩm nang
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.handbook-manage',
                link: '/system/handbook-manage',
            },
        ],
    },
];

export const doctorMenu = [
    {
        name: 'menu.admin.user-manage',
        menus: [
            //quản lý kế hoạch bác sĩ
            {
                name: 'menu.doctor.manage-schedule',
                menus: [
                    {
                        name: 'menu.doctor.schedule',
                        link: '/doctor/manage-schedule',
                    },
                ],
            },
        ],
    },
];
