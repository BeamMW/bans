import { isFloat, isNumeric } from "@app/library/base/appUtils";

export function isAmountValid(value) {
    if ((value[0] == '0' && (!!value[1] && !['.'].includes(value[1])))) {
        return;
    }

    if(((value.match(/\./g) || []).length > 1)) {
        return;
    }

    if (!((!!value && (isNumeric(value) || isFloat(value))) || !value)) {
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