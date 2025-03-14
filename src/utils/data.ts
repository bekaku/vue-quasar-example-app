import type { IMenu, RefreshTokenResponse, UserDto } from '@/types/models';
import { biFolder, biGear, biHouseDoor, biPeople, biPerson, biPersonBadge, biShieldCheck } from '@quasar/extras/bootstrap-icons';

export const PermissionItems: string[] = [
    'api_client_view',
    'api_client_manage',
    'permission_list',
    'permission_view',
    'permission_manage',
    'role_list',
    'role_view',
    'role_manage',
    'user_list',
    'user_view',
    'user_manage',
    'file_manager_list',
    'file_manager_view',
    'file_manager_manage',
    'backend_login'
];
export const DrawerItems: IMenu[] = [
    {
        header: '',
        pages: [
            {
                icon: biHouseDoor,
                color: 'info',
                iconText: '',
                title: 'nav.dashboard',
                to: '/',
                permission: 'backend_login',
                noActiveLink: true
            }
        ]
    },
    {
        header: 'nav.developers',
        pages: [
            {
                color: 'red',
                title: 'nav.systemData',
                icon: biGear,
                iconText: '',
                items: [
                    {
                        title: 'model_permission',
                        icon: biShieldCheck,
                        to: '/permission',
                        permission: 'permission_list'
                    }
                ]
            }
        ]
    },
    {
        header: 'nav.forAdmin',
        pages: [
            {
                title: 'nav.userData',
                icon: biPersonBadge,
                color: 'yellow darken-4',
                items: [
                    {
                        'title': 'nav.userRole',
                        'icon': biPeople,
                        'to': '/role',
                        'permission': 'role_list'
                    },
                    {
                        'title': 'nav.appUser',
                        'icon': biPerson,
                        'to': '/user',
                        'permission': 'user_list'
                    }
                ]
            }
        ]
    },
    {
        border: false,
        header: 'nav.more',
        pages: [
            {
                'title': 'model_files_manager',
                'icon': biFolder,
                'to': '/myFiles?_id=root',
                'permission': 'file_manager_manage'
            }
        ]
    }
];

export const AuthenResponse: RefreshTokenResponse = {
    'userId': 1,
    'authenticationToken': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4MWUzZmI2YS1kZjE5LTQ1MzgtYThhNS1iYWQzODI1NWUzMjUtMTczMDc5NjQ2MzI1MSIsImV4cCI6MTczMDgwMDA2MywiaWF0IjoxNzMwNzk2NDYzLCJ1dWlkIjoiMGQxYWYwNjMtZWQ1Yy00Mzg3LTkxYjItMDQyOTI3OTliMDZjIn0.COKBzpF7uh8lGvPJVrOmKRfvNuRmO9kRz5S0RftW-uWrTPyZ6fjx432B_7L6xpjMn670Nnap5lCo9gBqCLpaLg',
    'refreshToken': '81e3fb6a-df19-4538-a8a5-bad38255e325-1730796463251',
    'expiresAt': '2024-11-05T09:47:43.261+00:00'
}
export const UserData: UserDto = {
    'id': 1,
    'email': 'admin@mydomain.com',
    'username': 'admin',
    'token': null,
    'fcmToken': null,
    'accessTokenId': null,
    'avatarFileId': 3403,
    'coverFileId': null,
    'avatar': {
        'image': 'http://127.0.0.1:8080/cdn/images/202410/1_1729563356542_dc9f45bd7ebe48f9976fc84e91571983.jpg',
        'thumbnail': 'http://127.0.0.1:8080/cdn/images/202410/1_1729563356542_dc9f45bd7ebe48f9976fc84e91571983_thumb.jpg'
    },
    'cover': null,
    'active': true,
    'selectedRoles': [
        1
    ],
    'defaultLocale': 'th'
}