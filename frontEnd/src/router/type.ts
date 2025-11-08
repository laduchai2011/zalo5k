import { HOME, SIGNUP, SIGNIN, SIGNOUT, MESSAGE } from '@src/const/text';

const _HOME = HOME;
const _SIGNUP = SIGNUP;
const _SIGNIN = SIGNIN;
const _SIGNOUT = SIGNOUT;
const _MESSAGE = MESSAGE;

export enum select_enum {
    HOME = _HOME,
    SIGNUP = _SIGNUP,
    SIGNIN = _SIGNIN,
    SIGNOUT = _SIGNOUT,
    MESSAGE = _MESSAGE,
}
export type selected_type =
    | select_enum.HOME
    | select_enum.SIGNUP
    | select_enum.SIGNIN
    | select_enum.SIGNOUT
    | select_enum.MESSAGE;

export enum route_enum {
    HOME = '/',
    SIGNUP = '/signup',
    SIGNIN = '/signin',
    SIGNOUT = '/signout',
    MESSAGE = '/message',
}
export type routed_type =
    | route_enum.HOME
    | route_enum.SIGNUP
    | route_enum.SIGNIN
    | route_enum.SIGNOUT
    | route_enum.MESSAGE;
