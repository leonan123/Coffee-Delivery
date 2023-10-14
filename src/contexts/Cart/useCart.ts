import { useContext } from 'react'
import { CartContext } from '.'

export function useCart() {
  const context = useContext(CartContext)
  return context
}
