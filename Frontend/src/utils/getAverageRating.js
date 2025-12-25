export const getAverageRating = (reviews = []) => {
  if (!reviews.length) return 1;
  const total = reviews.reduce((sum, r) => sum + Number(r.rating), 0);
  return total / reviews.length;
};
