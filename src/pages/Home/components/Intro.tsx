import { Clock, Coffee, Package, ShoppingCart } from 'phosphor-react'

export function Intro() {
  return (
    <section className="relative">
      <div className="absolute h-full w-screen bg-intro bg-center bg-repeat blur-3xl" />
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-14 px-6 py-[5.875rem] md:container md:mx-auto">
        <div className="max-w-[588px] space-y-4 justify-self-start">
          <h1 className="text-brown- font-secondary text-5xl leading-13 ">
            Encontre o café perfeito para qualquer hora do dia
          </h1>
          <p className="text-xl font-normal leading-6.5 text-brown-700">
            Com o Coffee Delivery você recebe seu café onde estiver, a qualquer
            hora
          </p>
          <div className="pt-16">
            <ul className="flex flex-col justify-center gap-y-5 md:grid md:grid-cols-[231px_1fr] md:grid-rows-2 md:gap-x-10 md:gap-y-5">
              <li className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-700 text-white-50">
                  <ShoppingCart weight="fill" size={16} />
                </div>
                <span className="font-base leading-4 text-brown-500">
                  Compra simples e segura
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brown-500 text-white-50">
                  <Package weight="fill" size={16} />
                </div>
                <span className="font-base leading-4 text-brown-500">
                  Embalagem mantém o café intacto{' '}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 text-white-50">
                  <Clock weight="fill" size={16} />
                </div>
                <span className="font-base leading-4 text-brown-500">
                  Entrega rápida e rastreada
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-white-50">
                  <Coffee weight="fill" size={16} />
                </div>
                <span className="font-base leading-4 text-brown-500">
                  O café chega fresquinho até você{' '}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <img src="./CoffeeSlogan.svg" alt="" className="w-full" />
        </div>
      </div>
    </section>
  )
}
