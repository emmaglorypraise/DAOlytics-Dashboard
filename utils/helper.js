export const addressShortner = (address, shorter) => {
  if (shorter)
    return `${address.slice(0, 2)}...${address.slice(
      address.length - 4,
      address.length
    )}`;
  return `${address?.slice(0, 6)}.....${address?.slice(
    address.length - 10,
    address.length
  )}`;
};