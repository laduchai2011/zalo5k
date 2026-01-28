import { HOME, SIGNUP, SIGNIN, SIGNOUT, MESSAGE, MEMBERS, PROFILE, NOTE, OA, OA_SETTING } from '@src/const/text';

const _HOME = HOME;
const _SIGNUP = SIGNUP;
const _SIGNIN = SIGNIN;
const _SIGNOUT = SIGNOUT;
const _MESSAGE = MESSAGE;
const _MEMBERS = MEMBERS;
const _NOTE = NOTE;
const _PROFILE = PROFILE;
const _OA = OA;
const _OA_SETTING = OA_SETTING;

export enum select_enum {
    HOME = _HOME,
    SIGNUP = _SIGNUP,
    SIGNIN = _SIGNIN,
    SIGNOUT = _SIGNOUT,
    MESSAGE = _MESSAGE,
    MEMBERS = _MEMBERS,
    NOTE = _NOTE,
    PROFILE = _PROFILE,
    OA = _OA,
    OA_SETTING = _OA_SETTING,
}
export type selected_type =
    | select_enum.HOME
    | select_enum.SIGNUP
    | select_enum.SIGNIN
    | select_enum.SIGNOUT
    | select_enum.MESSAGE
    | select_enum.MEMBERS
    | select_enum.NOTE
    | select_enum.PROFILE
    | select_enum.OA
    | select_enum.OA_SETTING;

export enum route_enum {
    HOME = '/',
    SIGNUP = '/signup',
    SIGNIN = '/signin',
    SIGNOUT = '/signout',
    MESSAGE = '/message',
    MEMBERS = '/members',
    NOTE = '/note',
    PROFILE = '/profile',
    MEMBER_RECEIVE_MESSAGE = '/member_receive_message',
    MANAGE_MEMBERS = '/manage_members',
    OA = '/oa',
    OA_SETTING = '/oa_setting',
}
export type routed_type =
    | route_enum.HOME
    | route_enum.SIGNUP
    | route_enum.SIGNIN
    | route_enum.SIGNOUT
    | route_enum.MESSAGE
    | route_enum.MEMBERS
    | route_enum.NOTE
    | route_enum.MEMBER_RECEIVE_MESSAGE
    | route_enum.MANAGE_MEMBERS
    | route_enum.PROFILE
    | route_enum.OA
    | route_enum.OA_SETTING;
