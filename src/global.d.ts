interface ExternalUser {
  source: 'external';
  email: string;
  firstName: string;
  lastName: string;
}

interface JwtUser {
  source: 'jwt';
  id: string;
  role: 'admin' | 'buyer' | 'seller' | 'investor';
}

declare namespace Express {
  export interface Request {
    user?: JwtUser | ExternalUser;
  }
}
