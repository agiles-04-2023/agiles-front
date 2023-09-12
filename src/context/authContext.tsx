/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useReducer } from 'react';
import Loading from '../components/Loading';
import { authReducer } from './../reducer/authReducer';
// import jwt_decode from 'jwt-decode';
// import http from '../api/axios';

export interface Iuser {
  fullName: string;
  email: string;
  id: number;
  photo: string;
}
export interface Ialert {
  title: string;
  message: string;
  show: boolean;
  color?: string;
}
export interface AuthState {
  checking: boolean;
  token: string | null;
  user: Iuser | null;
  alert: Ialert | null;
  theme: string,
  message: string | null,
}

// eslint-disable-next-line react-refresh/only-export-components
export const initialState = {
  checking: true,
  token: '',
  user: null,
  alert: null,
  theme: localStorage.theme || 'light',
  message: null,

};
export interface AuthContextProps {
  authState: AuthState;
  signIn: (data: any) => void;
  signOut: () => void;
  hideAlert: () => void;
  showAlert: (data: Ialert) => void;
  toggleTheme: (t: string) => void;
  message: string | null
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem(import.meta.env.VITE_HASH_USER_LOCAL_HOST) || null;
    if (!token) dispatch({ type: 'signOut' })
    else {
      // @ts-expect-error the token is not null
      const user = JSON.parse(localStorage.getItem(import.meta.env.VITE_CRUSRAHCD))
      dispatch({ type: 'signIn', payload: { token, user } })
    }
  }, []);

  const signIn = (data: { token: string, user: { email: string, fullName: string, passsword?: string, id?: number } }) => {
    localStorage.setItem(import.meta.env.VITE_HASH_USER_LOCAL_HOST, data.token);
    localStorage.setItem(import.meta.env.VITE_CRUSRAHCD, JSON.stringify(data.user));
    // http.defaults.headers.Authorization = `Bearer ${data.token}`;
    try {
      // var decoded = jwt_decode(data.token);
      dispatch({
        type: 'signIn',
        payload: {
          token: data.token,
          user: data.user,
        },
      });
      dispatch({ type: 'removeMessage' })
    } catch (error) {
      console.log(error)
    }
  };

  const signOut = () => {
    // http.defaults.headers.Authorization = '';
    dispatch({ type: 'signOut' });
    localStorage.removeItem(import.meta.env.VITE_HASH_USER_LOCAL_HOST);
  };
  const showAlert = (data: Ialert) => dispatch({ type: 'showAlert', payload: data });
  const hideAlert = () => dispatch({ type: 'hideAlert' });
  const toggleTheme = (t: string) => dispatch({ type: 'toggleTheme', payload: t });

  if (state.checking)
    return (
      <div className='flex gap-y-3 flex-col items-center justify-center mt-8 sm:mt-12 '>
        <Loading />
        <h3>Bienvenido de vuelta </h3>
      </div>
    );

  return (
    <AuthContext.Provider
      value={{
        authState: state,
        signIn,
        signOut,
        showAlert,
        hideAlert,
        toggleTheme,
        message: state.message,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
