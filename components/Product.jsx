import { useDispatch } from "../react-redux"
import { cartAddItem } from "../store/slices/cartSlice"

export default function Product({ title, rating, productId, price, imageUrl }) {
    const dispatch = useDispatch()

    return (
      <div className="product">
        <div className="product-image">
          <img src={imageUrl} alt={title} />
        </div>
        <div className="title-container">
          <h3>
            <a href="#">{title}</a>
          </h3>
        </div>
        <div className="price-rating-container">
          <p className="rating">{+rating} ★ ★ ★ ★</p>
          <p className="price">${price}</p>
        </div>
        <div className="cta-container">
          <button onClick={() => dispatch(cartAddItem({ productId }))}>Add to Cart</button>
          <button>Buy Now</button>
        </div>
      </div>
    )
  }