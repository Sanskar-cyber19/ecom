export const getDiscount = (price, oldPrice) => {
  const discount = oldPrice - price;
  const persentage = (discount / oldPrice) * 100;
  return persentage.toFixed(2);
};
