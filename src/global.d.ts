interface ExternalUser {
  email: string;
  firstName: string;
  lastName: string;
}

interface JwtUser {
  id: string;
  role: 'buyer' | 'seller' | 'investor';
}

declare namespace Express {
  export interface Request {
    user?: JwtUser | ExternalUser;
  }
}
