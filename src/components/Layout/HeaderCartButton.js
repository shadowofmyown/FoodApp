import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [bump, setBump] = useState(false);
  const CartCtx = useContext(CartContext);
  const { items } = CartCtx;
  console.log("numberOfCartItems", CartCtx);
  const numberOfCartItems = CartCtx.items.reduce((curNumber, item) => {
    console.log("curNumber", item);
    return curNumber + item.amount;
  }, 0);
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBump(true);

    const timer=setTimeout(()=>{
      setBump(false);
    },300)
    return()=>{
      clearTimeout(timer);
    }
  }, [items]);
  console.log("bump", numberOfCartItems);
  const btnClasses = `${classes.button} ${bump ? classes.bump : ""}`;
  return (
    <button className={btnClasses} onClick={props.onclick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};
export default HeaderCartButton;
