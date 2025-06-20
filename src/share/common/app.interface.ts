import { IRole } from 'src/api/role/role.interface';

export interface IAdminPayload {
  sub: number;
  email: string;
  fullName?: string;
}

export interface IUserPayload {
  id?: number | string;
  sub?: number | string;
  name: string;
  email: string;
  createdBy: string;
  phone: string;
  status?: string | number;
  createdAt?: string;
  updatedAt?: string;
  lastLogin: string;
  roleId: number;
  role?: IRole;
}

export interface IPaginateParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
  status?: string;
  companyId?: string;
  roleIds?: string;
}
