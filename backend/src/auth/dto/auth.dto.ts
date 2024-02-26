import { User } from 'src/users/entities/user.entity';

export class AuthResponseDto {
  status: string;
  data?: User | { access_token: string };
}

export class AuthDto {
  email: string;
  password: string;
}
