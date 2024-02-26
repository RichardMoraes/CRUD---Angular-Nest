import { Entity } from "../views/entity/models/entity";
import { User } from "./user";

export interface GlobalState {
  user: User;
  entities: Entity[];
  loading: boolean;
  error: any;
}

export interface SelectObject {
  value?: string;
  label?: string;
}
