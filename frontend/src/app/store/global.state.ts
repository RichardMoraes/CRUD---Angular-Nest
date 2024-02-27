import { GlobalState } from '../models/global';
import { UserState } from '../models/user';

export const initialUserState: UserState = {
  id: 0,
  email: '',
  access_token: '',
  loading: false,
  error: null
};

export const initialGlobalState: GlobalState = {
  user: initialUserState,
  loading: false,
  error: null
};
