import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { CartProvider } from './contexts/Cart'
import { LocationProvider } from './contexts/Location'

export function App() {
  return (
    <div className="min-h-screen bg-white-100 pb-5">
      <LocationProvider>
        <CartProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </CartProvider>
      </LocationProvider>
    </div>
  )
}
