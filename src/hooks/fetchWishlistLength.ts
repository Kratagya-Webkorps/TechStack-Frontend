import { WishlistState } from "../redux/interfaces/interfaces";

export const fetchWishlistLength = (
  username: string,
  wishlist: WishlistState
): number => {
  const userWishlist = wishlist.wishlistItems.find(
    (item) => item.username === username
  );

  if (userWishlist) {
    return userWishlist.products.length;
  }

  return 0;
};
