import React from 'react'
import Product from './components/Product'
import './App.css'
import { useSelector } from 'react-redux'

export default function App() {
    const productsList = useSelector(state => state.products)
  return (
    <div className='products-container'>
      {
        productsList.map(({title, rating, id, image, price}) => 
            <Product key={id} title={title} rating={rating.rate} imageUrl={image} price={price} />
        )
      }
    </div>
  )
}
