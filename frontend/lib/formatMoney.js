export default function formatMoney(amount = 0) {
  const options = {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
  };

  // Removing .00 from round prices
  if (amount % 100 === 0) {
    options.minimumFractionDigits = 0;
  }

  const formatter = Intl.NumberFormat('en-GB', options);

  return formatter.format(amount / 100);
}
