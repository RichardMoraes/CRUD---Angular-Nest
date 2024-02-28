import { Entity } from "../views/entity/models/entity";
import { User } from "./user";

export interface GlobalState {
  user: User;
  loading: boolean;
  error: any;
}

export interface Loading {
  type: 'default' | 'loading' | 'error',
  message: string,
  duration: number
}


