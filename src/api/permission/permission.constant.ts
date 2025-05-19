import { swaggerSchemaExample } from '../../share/utils/swagger_schema';

export const PERMISSION_CONST = {
  MODEL_NAME: 'permission',
  MODEL_PROVIDER: 'PERMISSIONS_MODEL',
};

export const PERMISSIONS = {
  ALL: 'all',
  // User
  USER_CREATE: 'user:create',
  USER_READ: 'user:read',
  USER_EDIT: 'user:update',
  USER_DELETE: 'user:delete',
  USER_APPROVE_DOCTOR: 'user:approve-doctor',
  USER_UPDATE: 'user:update',
  USER_VIEW: 'user:view',
  // Permission
  PERMISSION_READ: 'permission:read',

  //Admin
  ADMIN_CREATE: 'admin:create',
  // Pet
  PET_CREATE: 'pet:create',

  // Appointment
  APP_CREATE: 'appointment:create',
  APP_GET_ALL: 'appointment:get-all',
};

export const MOCK_DATA = {
  id: 1,
  name: 'user:create',
};

export const PERMISSION_SWAGGER_RESPONSE = {
  GET_PERMISSION_SUCCESS: swaggerSchemaExample(
    {
      data: [
        {
          id: 1,
          name: 'user:create',
        },
        {
          id: 2,
          name: 'user:read',
        },
        {
          id: 3,
          name: 'user:update',
        },
        {
          id: 4,
          name: 'user:delete',
        },
        {
          id: 5,
          name: 'role:create',
        },
        {
          id: 6,
          name: 'role:read',
        },
        {
          id: 7,
          name: 'role:update',
        },
        {
          id: 8,
          name: 'role:delete',
        },
        {
          id: 9,
          name: 'permission:read',
        },
      ],
    },
    'Get success',
  ),
};
