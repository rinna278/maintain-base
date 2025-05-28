import { swaggerSchemaExample } from 'src/share/utils/swagger_schema';

export enum DoctorRequestStatus {
  PENDING = '1',
  APPROVED = '2',
  REJECTED = '3',
}

export const ERROR_DOCTOR_REQUEST = {
  DOCTOR_REQUEST_NOT_FOUND: {
    CODE: 'DR001',
    MESSAGE: 'Doctor request not found',
  },
  DOCTOR_REQUEST_ALREADY_EXISTS: {
    CODE: 'DR002',
    MESSAGE: 'Doctor request already exists for this user',
  },
  DOCTOR_REQUEST_INVALID_STATUS: {
    CODE: 'DR003',
    MESSAGE: 'Invalid doctor request status for this operation',
  },
};

export const DOCTOR_REQUEST_SWAGGER_RESPONSE = {
  GET_LIST_SUCCESS: swaggerSchemaExample(
    [
      {
        id: 1,
        createdAt: '2025-05-27T11:49:03.604Z',
        updatedAt: '2025-05-27T11:49:03.604Z',
        userId: 2,
        cv: "I'm Doctor",
        status: 1,
        user: {
          id: 2,
          createdAt: '2025-05-26T02:00:20.043Z',
          updatedAt: '2025-05-27T11:49:00.066Z',
          name: 'ntlinh278',
          email: 'ntlinh278@gmail.com',
          status: 1,
          createdBy: null,
          phone: null,
          userAgent: null,
          avatar: null,
          ipAddress: null,
          lastLogin: '2025-05-27T18:48:59.802Z',
          roleId: 3,
        },
      },
    ],
    'Get list doctor requests successfully',
  ),
  APPROVE_REQUEST_SUCCESS: swaggerSchemaExample(
    '',
    'Admin approve doctor request successfully',
  ),
  REJECT_REQUEST_SUCCESS: swaggerSchemaExample(
    '',
    'Admin reject doctor request successfully',
  ),
  REVOKE_DOCTOR_ROLE_SUCCESS: swaggerSchemaExample(
    '',
    "Admin revoke doctor's role successfully",
  ),
  CREATE_REQUEST_SUCCESS: swaggerSchemaExample(
    {
      userId: 2,
      cv: 'My CV',
      id: 1,
      createdAt: '2025-05-27T11:49:03.604Z',
      updatedAt: '2025-05-27T11:49:03.604Z',
      status: 1,
    },
    'Create doctor request successfully',
  ),
};
