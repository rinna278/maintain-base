import { swaggerSchemaExample } from '../../share/utils/swagger_schema';

export const BREED_CONST = {
  MODEL_NAME: 'breed',
};

export const ERROR_BREED = {
  BREED_NOT_FOUND: {
    CODE: 'BR001',
    MESSAGE: 'Breed not found',
  },
  BREED_ALREADY_EXIST: {
    CODE: 'BR002',
    MESSAGE: 'Breed already exists',
  },
};

export const BREED_SWAGGER_RESPONSE = {
  CREATE_SUCCESS: swaggerSchemaExample(
    {
      data: [
        {
          id: 1,
          name: 'Pitbull',
          createdBy: 1,
          speciesId: 1,
        },
      ],
      page: 1,
      pageSize: 20,
      totalPage: 1,
      totalItem: 1,
    },
    'Create breed successfully',
  ),
  GET_SUCCESS: swaggerSchemaExample(
    [
      {
        id: 1,
        name: 'Golden Retriever',
        speciesId: 1,
        createdBy: 1,
      },
    ],
    'Get all breeds successfully',
  ),
  GET_ONE_SUCCESS: swaggerSchemaExample(
    [
      {
        id: 1,
        name: 'Golden Retriever',
        speciesId: 1,
        createdBy: 1,
      },
    ],
    'Get the breed successfully',
  ),
  UPDATE_SUCCESS: swaggerSchemaExample('', 'Update breed successfully'),
  DELETE_SUCCESS: swaggerSchemaExample('', 'Delete breed successfully'),
};
