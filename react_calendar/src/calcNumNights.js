export const calcNumNights = (moveOut, moveIn) => {
  const getNights = Math.floor(
    (new Date(moveOut) - new Date(moveIn)) / (1000 * 60 * 60 * 24)
  );
  return getNights;
};
