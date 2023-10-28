import { CurrencyDollar, MapPin, Timer } from 'phosphor-react'
import { useParams } from 'react-router-dom'
import { OrderData, SESSION_KEY } from '../Checkout'

export function Success() {
  const { id } = useParams()

  const orders = sessionStorage.getItem(SESSION_KEY)

  if (!id || !orders) {
    return
  }

  const order: OrderData = JSON.parse(orders).find(
    (order: OrderData) => order.id === id,
  )

  const { deliveryDetails } = order

  const paymentMethods = {
    credit: 'Cartão de crédito',
    debit: 'Cartão de débito',
    money: 'Dinheiro',
  }

  return (
    <main className="mt-10">
      <section className="grid grid-flow-dense grid-cols-1 items-center gap-28 px-6 md:container md:mx-auto md:grid-cols-2 lg:mx-auto">
        <div>
          <h1 className="font-secondary text-3xl text-yellow-700 ">
            Uhu! Pedido confirmado
          </h1>
          <p className="text-xl text-brown-700">
            Agora e só aguardar que logo o café chegará até você
          </p>

          <div className="mt-10 overflow-hidden rounded-sm rounded-bl-[36px] rounded-se-[36px] border-brown-100 bg-gradient-to-br from-yellow-500 to-purple-500 p-[1px]">
            <div className="h-full rounded-sm rounded-bl-[35px] rounded-se-[35px] bg-white-100 p-5 md:p-10">
              <ul className="space-y-8">
                <li className="flex flex-wrap items-center gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-500">
                    <MapPin weight="fill" size={18} className="text-white-50" />
                  </div>
                  <div className="text-brown-500">
                    <p>
                      Entrega em{' '}
                      <strong>{`${deliveryDetails.street}, ${deliveryDetails.number}`}</strong>
                    </p>
                    <p>
                      {deliveryDetails.neighborhood} - {deliveryDetails.city},{' '}
                      {deliveryDetails.uf}
                    </p>
                  </div>
                </li>
                <li className="flex flex-wrap items-center gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-500">
                    <Timer weight="fill" size={18} className="text-white-50" />
                  </div>
                  <div className="text-brown-500">
                    <p>Previsão de entrega</p>
                    <strong>20 min - 30 min</strong>
                  </div>
                </li>
                <li className="flex flex-wrap items-center gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-700">
                    <CurrencyDollar
                      weight="regular"
                      size={18}
                      className="text-white-50"
                    />
                  </div>
                  <div className="text-brown-500">
                    <p>Pagamento na Entrega</p>
                    <strong>{paymentMethods[order.paymentMethod]}</strong>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="h-full self-end">
          <div className="flex h-full items-end justify-center">
            <img
              src="../IllustrationDelivery.svg"
              alt=""
              className="aspect-video"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
