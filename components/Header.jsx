import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CartIcon from '../assets/cart-icon.svg'
import { useDispatch, useSelector } from '../react-redux'
import { fetchProductsData } from '../store/slices/productsSlice'
import { fetchCartItemsData } from '../store/slices/cartSlice'

export default function Header() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProductsData())
    dispatch(fetchCartItemsData())
  }, [])

  const cartItems = useSelector((state) => state.cartItems.list)
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <header>
      <div className="header-contents">
        <h1>
          <Link to="/">Shopee</Link>
        </h1>
        <Link className="cart-icon" to="/cart">
          <img src={CartIcon} alt="cart-icon" />
          <div className="cart-items-count">{totalItemsInCart}</div>
        </Link>
      </div>
    </header>
  )
}