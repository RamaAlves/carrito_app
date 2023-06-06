import { useState } from "react";

import { FormItem } from "./components/forms/FormItem";
import { CardItem } from "./components/Items/CardItem";
import style from "./App.module.scss";

interface Item {
  product: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  id: string;
}

function App() {
  const [chart, setChart] = useState<Item[]>([]);
  let total: number = 0;
  chart.forEach((item: Item) => {
    total += item.price * item.quantity;
  });

  return (
    <>
      <main className={style.main}>
        <FormItem chart={chart} setChart={setChart} />
        <div className={style.chart}>
          <div className={style.container}>
            <h2 className={style.title}>Listado</h2>
            <div className={style.total}>
              <div>🛒</div>
              <p className={style.cash}>$ {total}</p>
            </div>
          </div>
          <div className={style.containerItems}>
            {chart.map((element: Item) => {
              return (
                <CardItem
                  key={element.id}
                  item={element}
                  chart={chart}
                  setChart={setChart}
                />
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
