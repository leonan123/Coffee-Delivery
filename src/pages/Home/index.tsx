import { Intro } from './components/Intro'

import { coffeeList } from '../../db/coffeeList'
import { ListItem } from './components/ListItem'

export function Home() {
  return (
    <main className="overflow-x-hidden">
      <Intro />
      <section className="mt-8 px-6 md:container md:mx-auto">
        <h2 className="font-secondary text-3xl leading-13">Nossos cafés</h2>
        <div className="mt-12">
          <ul className="grid grid-cols-list gap-x-8 gap-y-10">
            {coffeeList.map((coffee) => {
              return <ListItem key={coffee.id} coffee={coffee}></ListItem>
            })}
          </ul>
        </div>
      </section>
    </main>
  )
}
