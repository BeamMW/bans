import { GROTHS_IN_BEAM } from '@app/constants';

export const copyToClipboard = (value: string) => {
  let textField = document.createElement('textarea');
  textField.innerText = value;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand('copy');
  textField.remove();
};

export function compact(value: string, stringLength: number = 5): string {
  if (value.length <= 11) {
    return value;
  }
  return `${value.substr(0, stringLength)}…${value.substr(-stringLength, stringLength)}`;
}

const LENGTH_MAX = 8;

export function truncate(value: string): string {
  if (!value) {
    return '';
  }

  if (value.length <= LENGTH_MAX) {
    return value;
  }

  return `${value.slice(0, LENGTH_MAX)}…`;
}

export function toUSD(amount: number, rate: number): string {
  switch (true) {
    case amount === 0 || Number.isNaN(amount):
      return '0 USD';
    case amount > 0.01: {
      const value = amount * rate;
      return `${value.toFixed(2)} USD`;
    }
    default:
      return '< 1 cent';
  }
}

export function fromGroths(value: number): number {
  return value && value !== 0 ? value / GROTHS_IN_BEAM : 0;
}

export function toGroths(value: number): number {
  return value > 0 ? Math.floor(value * GROTHS_IN_BEAM) : 0;
}

export function getSign(positive: boolean): string {
  return positive ? '+ ' : '- ';
}

export function Base64DecodeUrl(str){
  if (str.length % 4 != 0)
    str += ('===').slice(0, 4 - (str.length % 4));
  return str.replace(/-/g, '+').replace(/_/g, '/');
}

export function Base64EncodeUrl(str){
  return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
}

export const delay = async (delay) => {
  return new Promise(function(resolve) {
      setTimeout(resolve, delay);
  });
}

export const id = (() => {
  let currentId = 0;
  const map = new WeakMap();

  return (object) => {
      if (!map.has(object)) {
          map.set(object, ++currentId);
      }

      return map.get(object);
  };
})();

export function getTextWidth(text:string, font:string) {
  let canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
  let context = canvas.getContext("2d");
  context.font = font;
  let metrics = context.measureText(text);
  return metrics.width;
}

export function isNumeric(value: any): boolean {
  return !isNaN(value - parseFloat(value));
}

export function isFloat(n){
  return Number(n) === n && n % 1 !== 0;
}