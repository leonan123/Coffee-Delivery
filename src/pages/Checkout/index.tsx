import { Button } from '../../components/Button'
import { FormCheckout } from './components/Form'
import { useCart } from '../../contexts/Cart/useCart'
import { CartItem } from './components/CartItem'
import { SmileyBlank } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CartProps } from '../../contexts/Cart'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidV4 } from 'uuid'

const checkoutFormSchemaValidation = z.object({
  cep: z.string().regex(/^[0-9]{5}-?[0-9]{3}$/, 'CEP inválido'),
  street: z.string().min(1, 'Informe a rua'),
  number: z.string().min(1, 'Informe o número'),
  complement: z.string(),
  neighborhood: z.string().min(1, 'Informe o bairro'),
  city: z.string().min(1, 'Informe sua cidade'),
  uf: z.string().min(2, 'Informe seu estado').max(2),
  paymentMethod: z.enum(['credit', 'debit', 'money']),
})

export type CheckoutFormData = z.infer<typeof checkoutFormSchemaValidation>

export interface OrderData {
  id: string
  items: CartProps[]
  deliveryDetails: CheckoutFormData
  deliveryPrice: number
  totalPriceItens: number
  totalAmount: number
  paymentMethod: 'credit' | 'debit' | 'money'
  status: 'pending' | 'success' | 'canceled' | 'delivered'
}

export const SESSION_KEY = '@coffee-delivery:orders-1.0.0'

export function Checkout() {
  const navigate = useNavigate()
  const { items } = useCart()

  const checkoutForm = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchemaValidation),
    defaultValues: {
      paymentMethod: 'credit',
    },
  })

  const { handleSubmit } = checkoutForm

  const totalValueOfItems = +items
    .reduce((acc, item) => {
      return acc + (item.quantity || 0) * item.price
    }, 0)
    .toFixed(2)

  const deliveryPrice = 9.9
  const totalAmount = +(totalValueOfItems + deliveryPrice).toFixed(2)
  const haveItems = items.length > 0

  function handleFormSubmit(data: CheckoutFormData) {
    const orderData: OrderData = {
      id: uuidV4(),
      deliveryDetails: data,
      totalPriceItens: totalValueOfItems,
      paymentMethod: data.paymentMethod,
      status: 'pending',
      items,
      deliveryPrice,
      totalAmount,
    }

    // Would send to an API to process the request
    console.log(orderData)

    const ordersDataSession = sessionStorage.getItem(SESSION_KEY)

    if (ordersDataSession) {
      const ordersData = JSON.parse(ordersDataSession)
      ordersData.push(orderData)

      sessionStorage.setItem(SESSION_KEY, JSON.stringify(ordersData))
    } else {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify([orderData]))
    }

    navigate(`/success/${orderData.id}`)
  }

  return (
    <main className="mt-10 overflow-x-hidden">
      <section className="flex flex-col gap-8 overflow-auto px-6 lg:container md:flex-row lg:mx-auto">
        <div className="max-w-[850px] flex-1">
          <h2 className="font-secondary text-xl leading-6">
            Complete seu pedido
          </h2>
          <div>
            <form id="checkout-form" onSubmit={handleSubmit(handleFormSubmit)}>
              <FormProvider {...checkoutForm}>
                <FormCheckout />
              </FormProvider>
            </form>
          </div>
        </div>
        <div className="w-full lg:max-w-[448px]">
          <h2 className="font-secondary text-xl leading-6">
            Cafés selecionados
          </h2>
          <div className="mt-4 rounded-bl-[36px] rounded-se-[36px] bg-white-200 p-4 md:p-10">
            <div className="flex max-h-[372px] flex-col space-y-6 overflow-auto">
              {haveItems &&
                items.map((item) => {
                  return <CartItem key={item.id} coffee={item} />
                })}

              {!haveItems && (
                <div className="flex flex-col items-center justify-center">
                  <SmileyBlank
                    size={32}
                    weight="light"
                    className="text-brown-700"
                  />
                  <span className="text-brown-700">
                    Seu carrinho está vazio
                  </span>
                </div>
              )}
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

            <Button
              className="mt-6 w-full"
              form="checkout-form"
              type="submit"
              disabled={!haveItems}
            >
              Confirmar pedido
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
