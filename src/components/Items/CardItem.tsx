/* import { useState } from "react"; */
import style from "./CardItem.module.scss";

interface Item {
  product: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  id: string;
}

type Props = {
  item: Item;
  chart: Item[];
  setChart: React.Dispatch<React.SetStateAction<Item[]>>;
};

export const CardItem = (props: Props) => {
  const handleUpdateItem = (op: string) => {
    //itero por el array de items y los copio
    let modifyChart = props.chart.map((item) => {
      //modifico el item deseado
      if (item.id === props.item.id) {
        //actualizo la prop quantity del elemento
        if (op === "+") {
          item.quantity++;
        } else if (op === "-") {
          if (item.quantity > 1) {
            item.quantity--;
          }
        }
      }
      return item;
    });
    //actualizo la lista de elementos
    props.setChart(modifyChart);
  };
  const handleDeleteItem = () => {
    //itero por el array de items y los copio
    let modifyChart = props.chart.filter((item) => item.id != props.item.id);
    //actualizo la lista de elementos
    props.setChart(modifyChart);
  };
  return (
    <div className={style.card}>
      <button className={style.delete} onClick={handleDeleteItem}>
        ❌
      </button>
      <div className={style.product}>
        <img
          className={style.img}
          src={props.item.image}
          alt={props.item.product}
        />
        <p className={style.title}>{props.item.product}</p>
        <p className={style.description}>
          Descripcion: {props.item.description}
        </p>
        <p className={style.price}>${props.item.price}</p>
      </div>
      <div className={style.selector}>
        <button
          className={style.button}
          onClick={() => {
            handleUpdateItem("-");
          }}
        >
          ➖
        </button>
        <p className={style.quantity}>{props.item.quantity}</p>
        <button
          className={style.button}
          onClick={() => {
            handleUpdateItem("+");
          }}
        >
          ➕
        </button>
      </div>
    </div>
  );
};
