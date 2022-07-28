import { isFloat, isNumeric } from "@app/library/base/appUtils";

export function isAmountValid(value) {
    const dotRegexp = new RegExp(/\./g);
    const splits = value.toString().split('.');

    if ((value[0] == '0' && (!!value[1] && !['.'].includes(value[1])))) {
        return;
    }

    if(((value.match(dotRegexp) || []).length > 1)) {
        return;
    }

    if (!((!!value && (isNumeric(value) || isFloat(value))) || !value)) {
        return;
    }

    if (splits[0].length > 8 && splits[0][splits[0].length - 1] != '.') {
        return;
    }

    if (dotRegexp.test(value) && splits[1].length > 2) {
        return;
    }

    return true;
}

export function amountHandler(value, handler) {
    !!isAmountValid(value) && handler(value);
}

export const keyPressAmountHandler = (e) => {
    if (!/[0-9\b\.]/g.test(e.key)) {
        e.preventDefault();
    }
}