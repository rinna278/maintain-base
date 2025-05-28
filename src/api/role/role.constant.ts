import { swaggerSchemaExample } from '../../share/utils/swagger_schema';
import { PERMISSIONS } from '../permission/permission.constant';

export const ROLE_CONST = {
  MODEL_NAME: 'role',
  MODEL_ROLE_COMPANY_NAME: 'company_role',
  MODEL_PROVIDER: 'ROLE_MODEL',
  MODEL_ROLE_COMPANY_PROVIDER: 'ROLE_COMPANY_MODEL',
};

export enum RoleTypes {
  Admin = 1,
  User = 2,
  Doctor = 3,
}

export enum RoleStatus {
  ACTIVE = 1,
  INACTIVE = 2,
}

export enum RoleName {
  Administrator = 'Administrator',
  User = 'User',
  Doctor = 'Doctor',
}

export const ROLES_DEFAULT = [
  {
    name: RoleName.Administrator,
    permissions: [PERMISSIONS.ALL],
    type: RoleTypes.Admin,
  },
  {
    name: RoleName.Doctor,
    permissions: Object.values([
      PERMISSIONS.USER_READ,
      PERMISSIONS.USER_EDIT,
      PERMISSIONS.USER_DELETE,
      PERMISSIONS.APP_GET_ALL,
      PERMISSIONS.PET_READ,
      PERMISSIONS.APP_CONFIRM,
    ]),
    type: RoleTypes.Doctor,
  },
  {
    name: RoleName.User,
    permissions: [
      PERMISSIONS.USER_READ,
      PERMISSIONS.USER_EDIT,
      PERMISSIONS.PET_CREATE,
    ],
    type: RoleTypes.User,
  },
];

export const MOCK_DATA = {
  id: '1',
  name: 'BO Admin',
};

export const ROLE_SWAGGER_RESPONSE = {
  GET_ADMIN_ROLE_SUCCESS: swaggerSchemaExample(
    {
      data: [
        {
          id: '1',
          name: 'BO Admin',
        },
        {
          id: '2',
          name: 'BO Accounting',
        },
        {
          id: '4',
          name: 'BO Sales',
        },
        {
          id: '5',
          name: 'BO Manager',
        },
      ],
    },
    'Get success',
  ),
};
