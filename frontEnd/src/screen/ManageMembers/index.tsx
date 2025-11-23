import { useRef, useState } from 'react';
import style from './style.module.scss';
import { MANAGE_MEMBERS, ADD_MEMBER, ADD } from '@src/const/text';
import { useAddMemberMutation } from '@src/redux/query/accountRTK';
import { AddMemberBodyField } from '@src/dataStruct/account';
import { member_enum, member_field_type } from './type';
import { isSpace, isFirstNumber, containsSpecialCharacters, isValidPhoneNumber } from '@src/utility/string';

const ManageMembers = () => {
    const inputContainer_element = useRef<HTMLDivElement>(null);

    const [note, setNote] = useState('');
    const [addMemberBody, setAddMemberBody] = useState<AddMemberBodyField>({
        userName: '',
        password: '',
        phone: '',
        firstName: '',
        lastName: '',
        addedById: -1,
    });
    const [userNameWarn, setUserNameWarn] = useState<string>('');
    const [passwordWarn, setPasswordWarn] = useState<string>('');
    const [phoneWarn, setPhoneWarn] = useState<string>('');
    const [firstNameWarn, setFirstNameWarn] = useState<string>('');
    const [lastNameWarn, setLastNameWarn] = useState<string>('');

    const [addMember] = useAddMemberMutation();

    const showInputContainer = () => {
        if (inputContainer_element.current) {
            inputContainer_element.current.classList.toggle(style.show);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: member_field_type) => {
        const value = e.target.value;
        checkString(value, field);
        switch (field) {
            case member_enum.USERNAME: {
                setAddMemberBody({ ...addMemberBody, userName: value });
                break;
            }
            case member_enum.PASSWORD: {
                setAddMemberBody({ ...addMemberBody, password: value });
                break;
            }
            case member_enum.PHONE: {
                setAddMemberBody({ ...addMemberBody, phone: value });
                break;
            }
            case member_enum.FIRST_NAME: {
                setAddMemberBody({ ...addMemberBody, firstName: value });
                break;
            }
            case member_enum.LAST_NAME: {
                setAddMemberBody({ ...addMemberBody, lastName: value });
                break;
            }
            default: {
                break;
            }
        }
    };

    const checkString = (str: string, field: member_field_type) => {
        switch (field) {
            case member_enum.USERNAME: {
                if (isSpace(str)) {
                    setUserNameWarn('Không được có khoảng trắng !');
                } else if (isFirstNumber(str)) {
                    setUserNameWarn('Ký tự đầu tiên không được là số !');
                } else if (containsSpecialCharacters(str)) {
                    setUserNameWarn('Tên tài khoản không được chứa ký tự đặc biệt !');
                } else {
                    setUserNameWarn('');
                }
                break;
            }
            case member_enum.PASSWORD: {
                if (isSpace(str)) {
                    setPasswordWarn('Không được có khoảng trắng !');
                } else if (containsSpecialCharacters(str)) {
                    setPasswordWarn('Mật khẩu không được chứa ký tự đặc biệt !');
                } else {
                    setPasswordWarn('');
                }
                break;
            }
            case member_enum.PHONE: {
                if (isSpace(str)) {
                    setPhoneWarn('Không được có khoảng trắng !');
                } else if (containsSpecialCharacters(str)) {
                    setPhoneWarn('Số điện thoại không được chứa ký tự đặc biệt !');
                } else if (!isValidPhoneNumber(str)) {
                    setPhoneWarn('Không phải là số điện thoại !');
                } else {
                    setPhoneWarn('');
                }
                break;
            }
            case member_enum.FIRST_NAME: {
                if (containsSpecialCharacters(str)) {
                    setFirstNameWarn('Tên không được chứa ký tự đặc biệt !');
                } else {
                    setFirstNameWarn('');
                }
                break;
            }
            case member_enum.LAST_NAME: {
                if (containsSpecialCharacters(str)) {
                    setLastNameWarn('Tên không được chứa ký tự đặc biệt !');
                } else {
                    setLastNameWarn('');
                }
                break;
            }
            default: {
                break;
            }
        }
    };

    const ischeckString = (): boolean => {
        let isUserName = false;
        let isPassword = false;
        let isPhone = false;
        let isFirstName = false;
        let isLastName = false;

        const userName = addMemberBody.userName;
        if (isSpace(userName)) {
            isUserName = false;
        } else if (isFirstNumber(userName)) {
            isUserName = false;
        } else if (containsSpecialCharacters(userName)) {
            isUserName = false;
        } else {
            isUserName = true;
        }

        const password = addMemberBody.password;
        if (isSpace(password)) {
            isPassword = false;
        } else if (containsSpecialCharacters(password)) {
            isPassword = false;
        } else {
            isPassword = true;
        }

        const phone = addMemberBody.phone;
        if (isSpace(phone)) {
            isPhone = false;
        } else if (containsSpecialCharacters(phone)) {
            isPhone = false;
        } else if (!isValidPhoneNumber(phone)) {
            isPhone = false;
        } else {
            isPhone = true;
        }

        const firstName = addMemberBody.firstName;
        if (containsSpecialCharacters(firstName)) {
            isFirstName = false;
        } else {
            isFirstName = true;
        }

        const lastName = addMemberBody.lastName;
        if (containsSpecialCharacters(lastName)) {
            isLastName = false;
        } else {
            isLastName = true;
        }

        return isFirstName && isLastName && isPassword && isPhone && isUserName;
    };

    const handleAdd = () => {
        if (ischeckString()) {
            addMember(addMemberBody)
                .then((res) => {
                    const resData = res.data;
                    if (resData?.isSuccess && resData?.data) {
                        setNote('Đã thêm thành viên thành công!');
                    } else {
                        setNote(resData?.message || 'Lỗi không xác định !');
                    }
                })
                .catch((err) => console.error(err));
        } else {
            setNote('Dữ liệu nhập không hợp lệ, vui lòng kiểm tra lại !');
        }
    };

    return (
        <div className={style.parent}>
            <div className={style.main}>
                <div className={style.header}>{MANAGE_MEMBERS}</div>
                <div className={style.row}>
                    <div className={style.btnContainer} onClick={() => showInputContainer()}>
                        <button>{ADD_MEMBER}</button>
                    </div>
                    <div className={style.inputContainer} ref={inputContainer_element}>
                        <input
                            onChange={(e) => handleChange(e, member_enum.USERNAME)}
                            type="text"
                            placeholder="Tên đăng nhập"
                        />
                        {userNameWarn.length > 0 && <p>{userNameWarn}</p>}
                        <input
                            onChange={(e) => handleChange(e, member_enum.PASSWORD)}
                            type="text"
                            placeholder="Mật khẩu"
                        />
                        {passwordWarn.length > 0 && <p>{passwordWarn}</p>}
                        <input
                            onChange={(e) => handleChange(e, member_enum.PHONE)}
                            type="text"
                            placeholder="Số điện thoại"
                        />
                        {phoneWarn.length > 0 && <p>{phoneWarn}</p>}
                        <input
                            onChange={(e) => handleChange(e, member_enum.FIRST_NAME)}
                            type="text"
                            placeholder="Tên đầu"
                        />
                        {firstNameWarn.length > 0 && <p>{firstNameWarn}</p>}
                        <input
                            onChange={(e) => handleChange(e, member_enum.LAST_NAME)}
                            type="text"
                            placeholder="Tên cuối"
                        />
                        {lastNameWarn.length > 0 && <p>{lastNameWarn}</p>}
                        <button className={style.btnAdd} onClick={() => handleAdd()}>
                            {ADD}
                        </button>
                        <div>{note}</div>
                    </div>
                    <div className={style.list}>
                        <div>sdfsdf</div>
                        <div>sdfsdf</div>
                        <div>sdfsdf</div>
                        <div>sdfsdf</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageMembers;
