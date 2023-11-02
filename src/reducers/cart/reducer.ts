import { Coffee } from '../../db/coffeeList'
import { ActionTypes } from './actions'
import { produce } from 'immer'

export interface CartProps extends Coffee {
  quantity?: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function cartReducer(state: CartProps[], action: any): CartProps[] {
  switch (action.type) {
    case ActionTypes.ADD_ITEM: {
      const { newCoffee, quantity }: { newCoffee: Coffee; quantity: number } =
        action.payload

      return produce(state, (draft) => {
        const newCoffeeIndexInCart = draft.findIndex(
          (item) => item.id === newCoffee.id,
        )

        if (newCoffeeIndexInCart < 0) {
          draft.push({ ...newCoffee, quantity })
        }
      })
    }

    case ActionTypes.REMOVE_ITEM: {
      const { itemIdToRemove }: { itemIdToRemove: number } = action.payload

      return produce(state, (draft) => {
        const itemIndex = draft.findIndex((item) => item.id === itemIdToRemove)

        draft.splice(itemIndex, 1)
      })
    }

    case ActionTypes.ADD_QUANTITY: {
      const { coffeeIdToAddQuantity }: { coffeeIdToAddQuantity: number } =
        action.payload

      return produce(state, (draft) => {
        const itemIndex = draft.findIndex(
          (item) => item.id === coffeeIdToAddQuantity,
        )

        if (itemIndex < 0) return draft

        draft[itemIndex].quantity = (draft[itemIndex].quantity || 0) + 1
      })
    }

    case ActionTypes.REMOVE_QUANTITY: {
      const { coffeeIdToRemove }: { coffeeIdToRemove: number } = action.payload

      return produce(state, (draft) => {
        const itemIndex = draft.findIndex(
          (item) => item.id === coffeeIdToRemove,
        )

        if (itemIndex < 0 || draft[itemIndex].quantity === 0) return draft

        draft[itemIndex].quantity = (draft[itemIndex].quantity || 0) - 1
      })
    }

    case ActionTypes.CLEAR_CART: {
      return []
    }
  }

  return state
}
