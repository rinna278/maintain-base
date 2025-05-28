import { swaggerSchemaExample } from '../../share/utils/swagger_schema';

export const PET_CONST = {
  MODEL_NAME: 'pet',
};

export enum PetStatus {
  ACTIVE = 1,
  INACTIVE = 2,
  DECEASED = 3,
}

export enum PetGender {
  MALE = 'male',
  FEMALE = 'female',
  UNKNOWN = 'unknown',
}

export const ERROR_PET = {
  PET_NOT_FOUND: {
    CODE: 'PT001',
    MESSAGE: 'Pet not found',
  },
  PET_ACCESS_DENIED: {
    CODE: 'PT002',
    MESSAGE: 'You do not have permission to access this pet',
  },
  PET_CANNOT_DELETE: {
    CODE: 'PT003',
    MESSAGE: 'Cannot delete pet that has active appointments',
  },
};

export const MOCK_PET = {
  id: 1,
  createdAt: '2025-05-26T02:10:45.320Z',
  updatedAt: '2025-05-26T02:10:45.320Z',
  name: 'Cun',
  userId: 2,
  speciesId: 1,
  breedId: 1,
  species: {
    id: 1,
    name: 'Dog',
    createdBy: 1,
  },
  breed: {
    id: 1,
    name: 'Pitbull',
    createdBy: 1,
    speciesId: 1,
  },
};

export const PET_SWAGGER_RESPONSE = {
  GET_LIST_SUCCESS: swaggerSchemaExample(
    {
      data: [MOCK_PET],
      total: 1,
      page: 1,
      pageSize: 20,
      totalPage: 1,
    },
    'Get pets list success',
  ),
  CREATE_SUCCESS: swaggerSchemaExample(MOCK_PET, 'Create pet success'),
  UPDATE_SUCCESS: swaggerSchemaExample('', 'Update pet success'),
  GET_SUCCESS: swaggerSchemaExample(MOCK_PET, 'Get pet success'),
  DELETE_SUCCESS: swaggerSchemaExample('', 'Delete pet success'),
  GET_PETS_OF_USER_SUCCESS: swaggerSchemaExample(
    [MOCK_PET],
    'Get pets of user success',
  ),
  GET_MY_PETS_SUCCESS: swaggerSchemaExample([MOCK_PET], 'Get my pets success'),
};
