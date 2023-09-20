import { createContext } from 'react';

export type LoginType = {
  email: string,
  password: string,
};

const LoginContext = createContext({} as LoginType);

export default LoginContext;
