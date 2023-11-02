import { Coffee } from '../../db/coffeeList'

export enum ActionTypes {
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  ADD_QUANTITY = 'ADD_QUANTITY',
  REMOVE_QUANTITY = 'REMOVE_QUANTITY',
  CLEAR_CART = 'CLEAR_CART',
}

export function addItemToCartAction(coffeeToAdd: Coffee, quantity: number = 1) {
  return {
    type: ActionTypes.ADD_ITEM,
    payload: {
      newCoffee: coffeeToAdd,
      quantity,
    },
  }
}

export function removeItemFromCartAction(id: number) {
  return {
    type: ActionTypes.REMOVE_ITEM,
    payload: {
      itemIdToRemove: id,
    },
  }
}

export function addQuantityAction(coffeeIdToAddQuantity: number) {
  return {
    type: ActionTypes.ADD_QUANTITY,
    payload: {
      coffeeIdToAddQuantity,
    },
  }
}

export function removeQuantityAction(coffeeIdToRemove: number) {
  return {
    type: ActionTypes.REMOVE_QUANTITY,
    payload: {
      coffeeIdToRemove,
    },
  }
}

export function clearCartAction() {
  return {
    type: ActionTypes.CLEAR_CART,
  }
}
