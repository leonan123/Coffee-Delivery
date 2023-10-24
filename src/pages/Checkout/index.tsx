import { Button } from '../../components/Button'
import { Form } from './components/Form'
import { useCart } from '../../contexts/Cart/useCart'
import { CartItem } from './components/CartItem'

export function Checkout() {
  const { items } = useCart()

  const totalValueOfItems = items.reduce((acc, item) => {
    return acc + (item.quantity || 0) * item.price
  }, 0)

  const totalAmount = totalValueOfItems + 9.9 // Price of delivery

  return (
    <main className="mt-10 overflow-x-hidden">
      <section className="flex flex-col gap-8 overflow-auto px-6 lg:container md:flex-row lg:mx-auto">
        <div className="max-w-[850px] flex-1">
          <h2 className="font-secondary text-xl leading-6">
            Complete seu pedido
          </h2>
          <div>
            <Form />
          </div>
        </div>
        <div className="w-full lg:max-w-[448px]">
          <h2 className="font-secondary text-xl leading-6">
            Cafés selecionados
          </h2>
          <div className="mt-4 rounded-bl-[36px] rounded-se-[36px] bg-white-200 p-4 md:p-10">
            <div className="flex max-h-[372px] flex-col space-y-6 overflow-auto">
              {items.map((item) => {
                return <CartItem key={item.id} coffee={item} />
              })}
            </div>

            {/* TODO: Add total */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between text-brown-500">
                <span className="text-sm">Total de itens</span>
                <span>R$ {totalValueOfItems.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-brown-500">
                <span className="text-sm">Entrega</span>
                <span>R$ 9,90</span>
              </div>
              <div className="flex items-center justify-between text-xl font-bold">
                <span>Total</span>
                <span>R$ {totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <Button className="mt-6 w-full" form="checkout-form" type="submit">
              Confirmar pedido
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
