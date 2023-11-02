import { useContext } from 'react'
import { LocationContext } from '.'

export function useLocation() {
  const context = useContext(LocationContext)

  return context
}
