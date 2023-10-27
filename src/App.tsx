import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { CartProvider } from './contexts/Cart'

export function App() {
  return (
    <div className="min-h-screen bg-white-100 pb-5">
      <CartProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </CartProvider>
    </div>
  )
}
