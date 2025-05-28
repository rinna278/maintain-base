import { swaggerSchemaExample } from 'src/share/utils/swagger_schema';

export const APPOINTMENT_CONST = {
  MODEL_NAME: 'appointment',
};

export enum AppointmentStatus {
  PENDING = 1,
  CONFIRMED = 2,
  COMPLETED = 3,
  CANCELLED = 0,
}

export const ERROR_APPOINTMENT = {
  APPOINTMENT_NOT_FOUND: {
    CODE: 'AP001',
    MESSAGE: 'Appointment not found',
  },
  APPOINTMENT_INVALID_STATUS: {
    CODE: 'AP002',
    MESSAGE: 'Invalid appointment status for this operation',
  },
  APPOINTMENT_ALREADY_CONFIRMED: {
    CODE: 'AP003',
    MESSAGE: 'Appointment is already confirmed',
  },
  APPOINTMENT_CANNOT_CONFIRM: {
    CODE: 'AP004',
    MESSAGE: 'Cannot confirm appointment with current status',
  },
  APPOINTMENT_TIME_CONFLICT: {
    CODE: 'AP005',
    MESSAGE: 'Appointment time conflicts with existing appointment',
  },
  APPOINTMENT_PAST_DATE: {
    CODE: 'AP006',
    MESSAGE: 'Cannot create appointment for past date',
  },
  APPOINTMENT_PET_EXISTED: {
    CODE: 'AP007',
    MESSAGE: 'Pet appointment is existed and pending',
  },
  APPOINTMENT_CONFIRM_ERROR: {
    CODE: 'AP008',
    MESSAGE: 'Error confirming appointment',
  },
  APPOINTMENT_PET_NOT_OWN: {
    CODE: 'AP009',
    MESSAGE: 'You do not own this pet',
  },
};

export const APPOINTMENT_SWAGGER_RESPONSE = {
  CREATE_SUCCESS: swaggerSchemaExample(
    [
      {
        id: 1,
        createdAt: '2025-05-26T02:10:55.141Z',
        updatedAt: '2025-05-26T02:11:10.145Z',
        status: 2,
        symptom: 'back hurts',
        appointmentTime: '2025-05-30T07:30:00.000Z',
        doctorId: 1,
        petId: 1,
        userId: 2,
      },
    ],
    'Create appointment success',
  ),
  GET_MY_APPOINTMENTS_SUCCESS: swaggerSchemaExample(
    [
      {
        id: 1,
        createdAt: '2025-05-26T02:10:55.141Z',
        updatedAt: '2025-05-26T02:11:10.145Z',
        status: 2,
        symptom: 'back hurts',
        appointmentTime: '2025-05-30T07:30:00.000Z',
        doctorId: 1,
        petId: 1,
        userId: 2,
      },
    ],
    'Get my appointments success',
  ),
  GET_LIST_SUCCESS: swaggerSchemaExample(
    [
      {
        id: 1,
        createdAt: '2025-05-26T02:10:55.141Z',
        updatedAt: '2025-05-26T02:11:10.145Z',
        status: 2,
        symptom: 'back hurts',
        appointmentTime: '2025-05-30T07:30:00.000Z',
        doctorId: 1,
        petId: 1,
        userId: 2,
      },
    ],
    'Get appointments list success',
  ),
  CONFIRM_SUCCESS: swaggerSchemaExample(
    [
      {
        id: 1,
        createdAt: '2025-05-26T02:10:55.141Z',
        updatedAt: '2025-05-26T02:11:10.145Z',
        status: 2,
        symptom: 'back hurts',
        appointmentTime: '2025-05-30T07:30:00.000Z',
        doctorId: 1,
        petId: 1,
        userId: 2,
      },
    ],
    'Confirm appointment success',
  ),
};
