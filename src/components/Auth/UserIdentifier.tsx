import { fetchUser, setLoadingFalse } from "@/redux/features/auth/auth-slice";
import { asyncGetCart } from "@/redux/features/cart/cart-thunk";
import { asyncGetPublicProducts } from "@/redux/features/product/product-thunk";
import { useAppDispatch } from "@/redux/store";
import { useEffect } from "react";

const UserIdentifier = () => {
  
  const dispatch = useAppDispatch();
  useEffect(() => {
    const accessToken = window.localStorage.getItem("accessToken");
    if (accessToken) {
      dispatch(fetchUser(accessToken));
      dispatch(asyncGetCart());
    } else {
      dispatch(setLoadingFalse());
    }
  }, []);
  useEffect(() => {
    dispatch(asyncGetPublicProducts({ page: 1, limit: 9 }));
  }, [dispatch]);
  return null;
};

export default UserIdentifier;
