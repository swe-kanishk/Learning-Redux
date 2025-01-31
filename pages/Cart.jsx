import { useSelector } from "../react-redux"
import CartItem from "../components/CartItem"
import { getAllCartItems, getCartError, getCartLoadingState } from "../store/slices/cartSlice"

export default function Cart() {
  const cartItems = useSelector(getAllCartItems)
  const isLoading = useSelector(getCartLoadingState)
  const error = useSelector(getCartError)

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  return isLoading ? <h1>Loading...</h1> : error || (
    <div className="cart-container">
      <h2>Items in Your Cart</h2>
      <div className="cart-items-container">
        <div className="cart-header cart-item-container">
          <div className="cart-item">Item</div>
          <div className="item-price">Price</div>
          <div className="quantity">Quantity</div>
          <div className="total">Total</div>
        </div>
        {cartItems.map(({ id, title, rating, price, image, quantity }) => (
          <CartItem
            key={id}
            productId={id}
            title={title}
            price={price}
            quantity={quantity}
            imageUrl={image}
            rating={rating.rate}
          />
        ))}
        <div className="cart-header cart-item-container">
          <div></div>
          <div></div>
          <div></div>
          <div className="total">${totalPrice}</div>
        </div>
      </div>
    </div>
  )
}