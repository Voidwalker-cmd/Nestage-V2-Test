"use client"

import * as T from "@/types"
import dayjs, { ConfigType } from "dayjs";
import { v4 as uuidv4 } from "uuid";

export const shortenHexString = (input: string, len: string = "lg"): string => {
  const limit = len === "sh" ? 40 : 35;
  if (input.length <= 10) return input;

  if (input.toLocaleLowerCase().includes("loading address...")) return input;

  const prefix = input.slice(0, 7);
  const suffix = input.slice(-6);
  const dots = ".".repeat(input.length - limit);
  return prefix + dots + suffix;
};

class F {
  locale: string;

  constructor(locale: string = "en-US") {
    this.locale = locale;
  }

  formatDecimal(
    number: number,
    minDigits: number = 3,
    maxDigits: number = 3
  ): string {
    const formatter = new Intl.NumberFormat(this.locale, {
      style: "decimal",
      minimumFractionDigits: minDigits,
      maximumFractionDigits: maxDigits,
    });
    return formatter.format(number);
  }

  formatCurrency(
    number: number,
    currency: string,
    minDigits: number = 2,
    maxDigits: number = 2
  ): string {
    const formatter = new Intl.NumberFormat(this.locale, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: minDigits,
      maximumFractionDigits: maxDigits,
    });
    return formatter.format(number);
  }
}

export const Formatter = (
  a: number | string,
  options: T.FormatterOptions = {}
): string => {

  if(Number(a) === 0) return "0.0"
  const { type = "c", currency = "USD", decimalOptions = {} } = options;
  const { n = 2, m = 3 } = decimalOptions;

  const f = new F(); // Assuming F is a class with methods formatCurrency and formatDecimal

  // Parse the input into a valid number
  let i: number;
  if (typeof a === "string") {
    i = parseFloat(a);
  } else {
    i = a;
  }

  if (isNaN(i)) {
    throw new Error("Invalid input: not a valid number");
  }

  // Determine the formatting type
  if (type === "c") {
    return f.formatCurrency(i, currency, n, m);
  } else if (type === "d") {
    return f.formatDecimal(i, n, m);
  }

  throw new Error("Invalid format type. Expected 'c' for currency or 'd' for decimal.");
};

export const uuid = uuidv4();

export const djs = dayjs;

/**
 * Convert a timestamp to a formatted date string.
 * @param timestamp - The timestamp to convert. Can be a number, string, Date, or Day.js object.
 * @param format - The date format string (default is "YYYY/MM/DD").
 * @returns The formatted date string.
 */
export const convertDateTime = (
  timestamp: ConfigType,
  format: string = "YYYY/MM/DD"
): string => {
  return djs(timestamp).format(format);
};