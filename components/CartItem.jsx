import { useDispatch } from "react-redux"
import { decreaseCartItemQty, increaseCartItemQty } from "../store/cartReducer"

export default function CartItem({ title, productId, rating, price, imageUrl, quantity }) {
  const dispatch = useDispatch()
  return (
    <div className="cart-item-container">
      <div className="cart-item">
        <img src={imageUrl} alt={title} />
        <div>
          <h3>{title}</h3>
          <p>{rating} ★ ★ ★ ★</p>
        </div>
      </div>
      <div className="item-price">${price}</div>
      <div className="item-quantity">
        <button onClick={() => dispatch(decreaseCartItemQty(productId))}>-</button>
        <span>{quantity}</span>
        <button onClick={() => dispatch(increaseCartItemQty(productId))}>+</button>
      </div>
      <div className="item-total">${quantity * price}</div>
    </div>
  )
}