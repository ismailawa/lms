export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'code',
  })
    .format(price)
    .replace('USD', '₦')
    .trim();
};
