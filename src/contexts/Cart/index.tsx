import { ReactNode, createContext, useEffect, useReducer } from 'react'
import { Coffee } from '../../db/coffeeList'
import { cartReducer } from '../../reducers/cart/reducer'
import {
  addItemToCartAction,
  addQuantityAction,
  removeItemFromCartAction,
  removeQuantityAction,
} from '../../reducers/cart/actions'

export interface CartProps extends Coffee {
  quantity?: number
}

interface CartContextType {
  items: CartProps[]
  addToCart: (coffee: Coffee, quantity: number) => void
  removeFromCart: (id: number) => void
  removeQuantity: (coffeeIdToRemove: number) => void
  addQuantity: (coffeeIdToAddQuantity: number) => void
}

export const CartContext = createContext({} as CartContextType)

interface CartProviderProps {
  children: ReactNode
}
export function CartProvider({ children }: CartProviderProps) {
  const [items, dispatch] = useReducer(cartReducer, [], (initialState) => {
    const storedStateAsJSON = sessionStorage.getItem(
      '@coffee-delivery:cart-1.0.0',
    )

    if (storedStateAsJSON) {
      return JSON.parse(storedStateAsJSON)
    }

    return initialState
  })

  function addToCart(coffeeToAdd: CartProps, quantity: number = 1) {
    dispatch(addItemToCartAction(coffeeToAdd, quantity))
  }

  function removeFromCart(id: number) {
    dispatch(removeItemFromCartAction(id))
  }

  function addQuantity(coffeeIdToAddQuantity: number) {
    dispatch(addQuantityAction(coffeeIdToAddQuantity))
  }

  function removeQuantity(coffeeIdToRemove: number) {
    dispatch(removeQuantityAction(coffeeIdToRemove))
  }

  useEffect(() => {
    sessionStorage.setItem('@coffee-delivery:cart-1.0.0', JSON.stringify(items))
  }, [items])

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, removeQuantity, addQuantity }}
    >
      {children}
    </CartContext.Provider>
  )
}
