import { format } from "number-currency-format";

export const isElementInViewport = (el, padding) => {
  const rect = el.getBoundingClientRect();
  const space = { left: 0, right: 0, top: 0, bottom: 0, ...padding };
  return (
    rect.top + space.top >= 0 &&
    rect.left + space.left >= 0 &&
    rect.bottom + space.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right + space.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
};

export const formatNumber = (n, numberFormat, appendUnit) => {
  let output;
  if (n == null) {
    return null;
  }

  if (numberFormat.showIn == "none") {
    output = format(n, {
      thousandSeparator: ".",
      decimalSeparator: ",",
      decimalsDigits: numberFormat.decimalPoints,
      showDecimals: "IF_NEEDED",
    });
  }
  if (numberFormat.showIn == "millions") {
    // output = Math.sign(n)*((Math.abs(n)/1000000).toFixed(numberFormat.decimalPoints))
    output = format(Math.sign(n) * (Math.abs(n) / 1000000), {
      thousandSeparator: ".",
      decimalSeparator: ",",
      decimalsDigits: numberFormat.decimalPoints,
      showDecimals: "IF_NEEDED",
    });
  }
  if (numberFormat.showIn == "thousands") {
    // output = Math.sign(n)*((Math.abs(n)/1000).toFixed(numberFormat.decimalPoints))
    output = format(Math.sign(n) * (Math.abs(n) / 1000), {
      thousandSeparator: ".",
      decimalSeparator: ",",
      decimalsDigits: numberFormat.decimalPoints,
      showDecimals: "IF_NEEDED",
    });
  }
  if (numberFormat.showIn === "units") {
    output = format(n, {
      thousandSeparator: ".",
      decimalSeparator: ",",
      showDecimals: "NEVER",
    });
  }
  if (numberFormat.showIn == "percent") {
    output = format(n * 100, {
      thousandSeparator: ".",
      decimalSeparator: ",",
      decimalsDigits: 1,
      showDecimals: "IF_NEEDED",
    });
  }

  if (appendUnit) {
    output = `${output}${numberFormat.display}`;
  }

  return output;
};

export const parseNumber = (n, numberFormat) => {
  if (!n) {
    return n;
  }
  return n
    .replace(/[^0-9.,-]/g, "")
    .replace(/[.]/g, "")
    .replace(/[,]/g, ".");
};

export const withThousandSeperator = (n) => {
  return format(n, {
    thousandSeparator: ".",
    decimalSeparator: ",",
    showDecimals: "NEVER",
  });
};

export function replaceEmptyCellValue(value) {
  return value.replace(/- -/g, '0')
}
