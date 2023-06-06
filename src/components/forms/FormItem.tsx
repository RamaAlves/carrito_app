import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import style from "./Form.module.scss";

interface Item {
  product: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  id: string;
}

type Props = {
  cart: Item[];
  setCart: React.Dispatch<React.SetStateAction<Item[]>>;
};
export const FormItem = (props: Props) => {
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const handleNewItem = () => {
    // validar si el elemento a cargar no existe en el carrito
    let itemExist = props.cart.filter(
      (item) => item.price == price && item.product == product
    );
    // si el elemento no existe lo carga
    if (itemExist[0] == null) {
      let newId = uuidv4(); /* cart.length + 1; //otra opcion de id*/
      props.setCart((prevItems) => {
        return [
          ...prevItems,
          {
            product: product,
            description: description,
            price: price,
            image: "./images/image_demo.png",
            quantity: 1,
            id: newId,
          },
        ];
      });
    } else {
      //si ya existe suma 1 a la cantidad en el carrito
      let otherItems = props.cart.filter(
        (item) => item.price != price || item.product != product
      );
      itemExist[0].quantity++;
      props.setCart([...otherItems, itemExist[0]]);
    }
    setProduct("");
    setDescription("");
    setPrice(0);
  };
  return (
    <div className={style.container}>
      <h2 className={style.title}>Cargar producto</h2>
      <form action="" className={style.form}>
        <label className={style.label} htmlFor="nombre">
          Nombre del producto:
          <input
            required={true}
            className={style.input}
            id="nombre"
            type="text"
            placeholder="Nombre del producto"
            value={product}
            onChange={(e) => {
              setProduct(e.target.value);
            }}
          />
        </label>
        <label className={style.label} htmlFor="descripcion">
          Descripcion:
          <input
            className={style.input}
            id="descripcion"
            type="text"
            placeholder="Descripcion"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </label>
        <label className={style.label} htmlFor="price">
          Precio:
          <input
            required={true}
            className={style.input}
            id="price"
            type="number"
            min="0"
            placeholder="Precio"
            value={price}
            onChange={(e) => {
              setPrice(Number(e.target.value));
            }}
          />
        </label>
        <button
          className={style.button}
          type="button"
          onClick={handleNewItem}
          disabled={price && product ? false : true}
        >
          Agregar
        </button>
      </form>
    </div>
  );
};
