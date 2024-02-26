import { Entity } from "../../entity/models/entity";

export interface ListState {
  data: Entity[];
  totalItems: number;
  pageIndex: number;
  pageSize: number;
  loading: boolean;
  error: any;
}

export interface ListParams {
  search?: string,
  page?: string,
  size?: string
}


