import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateLuhnAlgorithm(cardNumber: string) {
  let sum = 0;
  let isEven = false;

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i), 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    isEven = !isEven;
  }
  detectCardType(cardNumber);
  return sum % 10 === 0;
}

// Card Type Detection
export function detectCardType(cardNumber: string) {
  const patterns: any = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
  };

  for (const cardType in patterns) {
    if (patterns[cardType].test(cardNumber)) {
      return cardType;
    }
  }

  return 'Unknown';
}

// Expiration Date Validation

export function validateExpirationDate(
  expirationMonth: any,
  expirationYear: any
) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // January is 0

  if (expirationYear > currentYear) {
    return true;
  } else if (
    expirationYear === currentYear &&
    expirationMonth >= currentMonth
  ) {
    return true;
  }

  return false;
}

// CVV/CVC Validation

export function validateCVV(cvv: any) {
  const cvvPattern = /^[0-9]{3,4}$/;
  return cvvPattern.test(cvv);
}
