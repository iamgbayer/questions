export function toMoney(value, currency = 'BRL') {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  });
  return formatter.format(value);
}
