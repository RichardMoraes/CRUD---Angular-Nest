import { GlobalState } from '../models/global';
import { UserState } from '../models/user';
import { ListState } from '../views/list/models/list';

export const initialUserState: UserState = {
  id: 0,
  email: '',
  access_token: '',
  loading: false,
  error: null
};

export const initialListState: ListState = {
  data: [],
  totalItems: 0,
  pageIndex: 0,
  pageSize: 10,
  loading: false,
  error: false
};

export const initialGlobalState: GlobalState = {
  user: initialUserState,
  entities: [],
  loading: false,
  error: null
};
