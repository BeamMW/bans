import { GROTHS_IN_BEAM, LENGTH_MAX } from '@app/shared/constants/common';

export function isNumeric(value: any): boolean {
  return !isNaN(value - parseFloat(value));
}

export function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}
export function measureText(str, fontSize = 10) {
  const widths = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2796875, 0.2765625, 0.3546875, 0.5546875, 0.5546875, 0.8890625, 0.665625, 0.190625, 0.3328125, 0.3328125, 0.3890625, 0.5828125, 0.2765625, 0.3328125, 0.2765625, 0.3015625, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.2765625, 0.2765625, 0.584375, 0.5828125, 0.584375, 0.5546875, 1.0140625, 0.665625, 0.665625, 0.721875, 0.721875, 0.665625, 0.609375, 0.7765625, 0.721875, 0.2765625, 0.5, 0.665625, 0.5546875, 0.8328125, 0.721875, 0.7765625, 0.665625, 0.7765625, 0.721875, 0.665625, 0.609375, 0.721875, 0.665625, 0.94375, 0.665625, 0.665625, 0.609375, 0.2765625, 0.3546875, 0.2765625, 0.4765625, 0.5546875, 0.3328125, 0.5546875, 0.5546875, 0.5, 0.5546875, 0.5546875, 0.2765625, 0.5546875, 0.5546875, 0.221875, 0.240625, 0.5, 0.221875, 0.8328125, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.3328125, 0.5, 0.2765625, 0.5546875, 0.5, 0.721875, 0.5, 0.5, 0.5, 0.3546875, 0.259375, 0.353125, 0.5890625];
  const avg = 0.5279276315789471;
  return str
    .split('')
    .map((c) => (c.charCodeAt(0) < widths.length ? widths[c.charCodeAt(0)] : avg))
    .reduce((cur, acc) => acc + cur) * fontSize;
}
export function truncate(value: string, len = LENGTH_MAX): string {
  if (!value) {
    return '';
  }

  if (value.length <= len) {
    return value;
  }

  return `${value.slice(0, len)}…`;
}
export function getTextWidth(text:string, font:string) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  context.font = font;
  return context.measureText(text).width;
}
export async function calcRelayerFee(ethRate, currRate, gasPrice) {
  const RELAY_COSTS_IN_GAS = 120000;
  const { FastGasPrice, ProposeGasPrice } = gasPrice;
  let gasValue = null;
  if (Number(FastGasPrice) > (2 * Number(ProposeGasPrice))) {
    gasValue = 2 * Number(ProposeGasPrice);
  } else {
    gasValue = Number(FastGasPrice);
  }
  const relayCosts = RELAY_COSTS_IN_GAS * gasValue * ethRate / 10 ** 9;
  const RELAY_SAFETY_COEFF = 2;// 1.1;
  return RELAY_SAFETY_COEFF * relayCosts / currRate;
}

export function toUSD(amount: number, rate: number): string {
  switch (true) {
    case amount === 0 || Number.isNaN(amount):
      return '0 USD';
    case amount > 0.011: {
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

export function beamNamePrice(name: string, currentPriceBeam) {
  let beamPrice = '0';
  if (name.length >= 5) {
    beamPrice = truncate((10 / currentPriceBeam).toString());
  } if (name.length === 4) {
    beamPrice = truncate((120 / currentPriceBeam).toString());
  } if (name.length === 3) {
    beamPrice = truncate((320 / currentPriceBeam).toString());
  }
  return beamPrice;
}
export const copyToClipboard = (value: string) => {
  const textField = document.createElement('textarea');
  textField.innerText = value;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand('copy');
  textField.remove();
};
