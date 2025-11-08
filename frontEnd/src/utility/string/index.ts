// export function isString(value: unknown): boolean {
//     return typeof value === 'string' || value instanceof String;
// }

export function isSpace(str: string): boolean {
    const hasSpace = str.includes(' ');
    return hasSpace;
}

export function isFirstNumber(str: string): boolean {
    const firstChar = str[0];
    const isNumber = !isNaN(Number(firstChar));
    return isNumber;
}

// export function isNumber(str: string): boolean {
//     const isNumber = !isNaN(Number(str));
//     return isNumber;
// }

export function isPositiveInteger(str: string): boolean {
    const num = Number(str);
    return (
        str.trim() !== '' && // không phải chuỗi rỗng
        Number.isInteger(num) && // là số nguyên
        num > 0 // lớn hơn 0
    );
}

export function isValidPhoneNumber(phone: string): boolean {
    const regex = /^(0|\+84)[1-9][0-9]{8}$/;
    return regex.test(phone.trim());
}

export function containsSpecialCharacters(str: string): boolean {
    // Regex kiểm tra ký tự không phải chữ cái (a-z, A-Z) hoặc số (0-9)
    return /[^a-zA-Z0-9 ]/.test(str);
}

// export const handleCutPXInString = (s: string): string => {
//     const arr: string[] = ['p', 'x'];
//     let s_new: string = '';
//     for (let i: number = 0; i < s.length; i++) {
//         if (arr.indexOf(s[i]) === -1) {
//             s_new = `${s_new}${s[i]}`;
//         }
//     }
//     return s_new.trim();
// };
