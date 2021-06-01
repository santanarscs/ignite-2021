import { memo, useState } from 'react'
import dynamic from 'next/dynamic'
import { AddProductToWishListProps } from './AddProductToWishList'

const AddProductToWishList = dynamic<AddProductToWishListProps>(() => {
  return import('./AddProductToWishList').then(mod => mod.AddProductToWishList)
}, {
  loading: () => <span>Carregando...</span>
})

interface ProductItemProps {
  product: {
    id: number,
    price: number,
    priceFormatted: string,
    title: string,
  }
}
function ProductItemComponent({product}: ProductItemProps) {
  const [isAddingToWishList, setIsAddingToWishList] = useState(false)

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishList(true)}>Adicionar aos favoritos</button>

      {isAddingToWishList && (
        <AddProductToWishList 
          onAddToWishList={() => console.log('add')}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      )}
    </div>
  )
}
export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.product, nextProps.product)
})

