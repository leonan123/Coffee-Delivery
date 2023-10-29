import {
  Bank,
  CreditCard,
  CurrencyDollar,
  MapPinLine,
  Money,
} from 'phosphor-react'
import { Input } from './Input'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { CheckoutFormData } from '..'
import { Controller, useFormContext } from 'react-hook-form'

export function FormCheckout() {
  const {
    control,
    watch,
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormData>()

  const cep = watch('cep') || ''
  return (
    <div className="flex flex-col gap-3">
      <div className="mt-4 rounded bg-white-200 p-10">
        <header className="flex gap-2">
          <MapPinLine size={22} className="text-yellow-700" />
          <div>
            <h3 className="text-base text-brown-900">Endereço de entrega</h3>
            <span className="text-sm text-brown-700">
              Informe o endereço onde deseja receber seu pedido
            </span>
          </div>
        </header>
        <main className="mt-8 space-y-4">
          <div className="flex flex-col flex-wrap gap-4">
            <Input
              placeholder="CEP"
              className="sm:max-w-[200px]"
              maxLength={9}
              value={cep.replace(/(\d{5})(\d)/, '$1-$2')}
              {...register('cep')}
              error={errors.cep?.message ?? undefined}
            />

            <Input
              id="street"
              placeholder="Rua"
              {...register('street')}
              className="flex-1"
              error={errors.street?.message ?? undefined}
            />
          </div>

          <div className="flex flex-col flex-wrap gap-4 sm:flex-row">
            <Input
              id="number"
              placeholder="Número"
              {...register('number')}
              className="sm:max-w-[200px]"
              error={errors.number?.message ?? undefined}
            />
            <Input
              id="complement"
              placeholder="Complemento"
              className="flex-1"
              {...register('complement')}
              required={false}
            />
          </div>

          <div className="flex flex-col flex-wrap gap-4 sm:flex-row">
            <Input
              id="neighborhood"
              placeholder="Bairro"
              {...register('neighborhood')}
              className="sm:max-w-[200px]"
              error={errors.neighborhood?.message ?? undefined}
            />
            <Input
              id="city"
              placeholder="Cidade"
              {...register('city')}
              className="sm:flex-1"
              error={errors.city?.message ?? undefined}
            />
            <Input
              id="uf"
              placeholder="UF"
              {...register('uf')}
              className="sm:max-w-[60px]"
              error={errors.uf?.message ?? undefined}
            />
          </div>
        </main>
      </div>
      <div className="mt-4 rounded bg-white-200 p-10">
        <header className="flex gap-2">
          <CurrencyDollar size={22} className="text-purple-500" />
          <div>
            <h3 className="text-base text-brown-900">Pagamento</h3>
            <span className="text-sm text-brown-700">
              O pagamento é feito na entrega. Escolha a forma que deseja pagar
            </span>
          </div>
        </header>
        <main className="mt-8">
          <Controller
            control={control}
            name="paymentMethod"
            render={({ field }) => (
              <RadioGroup.Root
                className="gap flex flex-wrap items-center justify-center gap-3 md:justify-start"
                aria-label="payment method"
                id="paymentMethod"
                onValueChange={field.onChange}
                value={field.value}
              >
                <RadioGroup.Item
                  value="credit"
                  id="r1"
                  className="flex items-center gap-3 rounded-md border-[1.5px] border-transparent bg-white-400 p-4 text-xs uppercase text-brown-500 transition-colors duration-75 data-[state=checked]:border-purple-500 data-[state=checked]:bg-purple-100"
                >
                  <CreditCard size={16} className="text-purple-500" />
                  Cartão de crédito
                </RadioGroup.Item>

                <RadioGroup.Item
                  value="debit"
                  id="r2"
                  className="flex items-center gap-3 rounded-md border-[1.5px] border-transparent bg-white-400 p-4 text-xs uppercase text-brown-500 transition-colors duration-75 data-[state=checked]:border-purple-500 data-[state=checked]:bg-purple-100"
                >
                  <Bank size={16} className="text-purple-500" />
                  Cartão de débito
                </RadioGroup.Item>

                <RadioGroup.Item
                  value="money"
                  id="r3"
                  className="flex items-center gap-3 rounded-md border-[1.5px] border-transparent bg-white-400 p-4 text-xs uppercase text-brown-500 transition-colors duration-75 data-[state=checked]:border-purple-500 data-[state=checked]:bg-purple-100"
                >
                  <Money size={16} className="text-purple-500" />
                  Dinheiro
                </RadioGroup.Item>
              </RadioGroup.Root>
            )}
          />
        </main>
      </div>
    </div>
  )
}
