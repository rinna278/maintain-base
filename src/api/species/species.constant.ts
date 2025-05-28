import { swaggerSchemaExample } from '../../share/utils/swagger_schema';

export const SPECIES_CONST = {
  MODEL_NAME: 'species',
};

export const ERROR_SPECIES = {
  SPECIES_NOT_FOUND: {
    CODE: 'SP001',
    MESSAGE: 'Species not found',
  },
  SPECIES_NAME_EXISTED: {
    CODE: 'SP002',
    MESSAGE: 'This species name already exists',
  },
  SPECIES_CANNOT_DELETE: {
    CODE: 'SP003',
    MESSAGE: 'Cannot delete species that has associated breeds or pets',
  },
};

export const MOCK_SPECIES = [
  {
    id: 1,
    name: 'Dog',
    createdBy: 1,
    breeds: [
      {
        id: 1,
        name: 'Pitbull',
        createdBy: 1,
        speciesId: 1,
      },
    ],
  },
];

export const SPECIES_SWAGGER_RESPONSE = {
  GET_LIST_SUCCESS: swaggerSchemaExample(
    {
      data: [MOCK_SPECIES],
      page: 1,
      pageSize: 20,
      totalPage: 1,
      totalItem: 1,
    },
    'Get species list success',
  ),
  CREATE_SUCCESS: swaggerSchemaExample(MOCK_SPECIES, 'Create species success'),
  UPDATE_SUCCESS: swaggerSchemaExample('', 'Update species success'),
  GET_SUCCESS: swaggerSchemaExample(MOCK_SPECIES, 'Get species success'),
  DELETE_SUCCESS: swaggerSchemaExample('', 'Delete species success'),
};
