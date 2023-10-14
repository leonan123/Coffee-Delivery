import { ShoppingCartSimple } from 'phosphor-react'
import { Button } from '../../components/Button'
import { Counter } from './components/Counter'
import { Intro } from './components/Intro'

import { coffeeList } from '../../db/coffeeList'

export function Home() {
  return (
    <main className="overflow-x-hidden">
      <Intro />
      <section className="mt-8 px-6 md:container md:mx-auto">
        <h2 className="font-secondary text-3xl leading-13">Nossos cafés</h2>
        <div className="mt-12">
          <ul className="grid grid-cols-list gap-x-8 gap-y-10">
            {coffeeList.map((coffee) => {
              return (
                <li
                  key={coffee.id}
                  className="flex flex-col items-center justify-center space-y-2 rounded-bl-[36px] rounded-se-[36px] bg-white-200 px-5 pb-5"
                >
                  <img
                    src={coffee.image}
                    alt=""
                    width={120}
                    height={120}
                    className="-mt-5"
                  />
                  <div className="flex items-center justify-center gap-2">
                    {coffee.tags.map((tag) => {
                      return (
                        <span
                          key={tag}
                          className="rounded-xl bg-yellow-100 px-2 py-1 text-xxs font-bold uppercase leading-3 text-yellow-700"
                        >
                          {tag}
                        </span>
                      )
                    })}
                  </div>
                  <h3 className="font-secondary text-xl text-brown-900">
                    {coffee.name}
                  </h3>
                  <p className="text-center text-sm text-brown-400">
                    {coffee.description}
                  </p>
                  <div className="flex w-full items-center justify-between pt-8">
                    <span className="text-xs text-brown-700">
                      R${' '}
                      <span className="font-secondary text-2xl font-extrabold">
                        {coffee.price.toString()}
                      </span>
                    </span>
                    <div className="flex items-center justify-center gap-2">
                      <Counter coffee={coffee} />
                      <Button variant="ghost">
                        <ShoppingCartSimple weight="fill" size={22} />
                      </Button>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </main>
  )
}
