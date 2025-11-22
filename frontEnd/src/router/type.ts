import { HOME, SIGNUP, SIGNIN, SIGNOUT, MESSAGE, MEMBERS, PROFILE } from '@src/const/text';

const _HOME = HOME;
const _SIGNUP = SIGNUP;
const _SIGNIN = SIGNIN;
const _SIGNOUT = SIGNOUT;
const _MESSAGE = MESSAGE;
const _MEMBERS = MEMBERS;
const _PROFILE = PROFILE;

export enum select_enum {
    HOME = _HOME,
    SIGNUP = _SIGNUP,
    SIGNIN = _SIGNIN,
    SIGNOUT = _SIGNOUT,
    MESSAGE = _MESSAGE,
    MEMBERS = _MEMBERS,
    PROFILE = _PROFILE,
}
export type selected_type =
    | select_enum.HOME
    | select_enum.SIGNUP
    | select_enum.SIGNIN
    | select_enum.SIGNOUT
    | select_enum.MESSAGE
    | select_enum.MEMBERS
    | select_enum.PROFILE;

export enum route_enum {
    HOME = '/',
    SIGNUP = '/signup',
    SIGNIN = '/signin',
    SIGNOUT = '/signout',
    MESSAGE = '/message',
    MEMBERS = '/members',
    PROFILE = '/profile',
}
export type routed_type =
    | route_enum.HOME
    | route_enum.SIGNUP
    | route_enum.SIGNIN
    | route_enum.SIGNOUT
    | route_enum.MESSAGE
    | route_enum.MEMBERS;
