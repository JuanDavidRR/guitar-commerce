import { useState } from "react";
import GuitarCard from "./components/GuitarCard";
import Header from "./components/Header";
import { db } from "./data/guitars";
import { useEffect } from "react";

function App() {
  //Checking if the cart has items in the local storage
  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    //if local storage cart is empty, return an empty array
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };
  const [data] = useState(db);
  //We load the local storage cart
  const [cart, setCart] = useState(initialCart);

  //Limit the quantity of how many items you can have per guitar
  const MAX_QUANTITY = 5;
  const MIN_QUANTITY = 1;

  //UseEffect to get the cart from the local storage because can monitor all changes on the cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Function to add an item to the cart
  function addToCart(item) {
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);
    if (itemExists >= 0) {
      //Limit how many items can you add per guitar
      if (cart[itemExists].quantity >= MAX_QUANTITY) return;
      //If the item is already in the cart, create a copy of the cart
      const updatedCart = [...cart];
      //Increase the quantity to the copy, instead of the orignal one
      updatedCart[itemExists].quantity++;
      setCart(updatedCart);
    } else {
      //When a new item is added to the cart, adding the quantity and disabling the button
      const newItem = { ...item, quantity: 1, disable: true };
      setCart([...cart, newItem]);
    }
  }

  // Function to remove an item from the cart
  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }

  //Function to clean the cart
  function clearCart() {
    setCart([]);
  }

  // Function to increase the quantity of an item in the cart
  function increaseQuantity(id) {
    const updatedCart = cart.map((guitar) => {
      if (guitar.id === id && guitar.quantity < MAX_QUANTITY) {
        return {
          ...guitar,
          quantity: guitar.quantity + 1,
        };
      }
      return guitar;
    });
    setCart(updatedCart);
  }

  // Function to increase the quantity of an item in the cart
  function decreaseQuantity(id) {
    const updatedCart = cart.map((guitar) => {
      if (guitar.id === id && guitar.quantity > MIN_QUANTITY) {
        return {
          ...guitar,
          quantity: guitar.quantity - 1,
        };
      }
      return guitar;
    });
    setCart(updatedCart);
  }

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        MAX_QUANTITY={MAX_QUANTITY}
        MIN_QUANTITY={MIN_QUANTITY}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <section className="row mt-5">
          {data.map((guitar) => (
            <GuitarCard key={guitar.id} guitar={guitar} addToCart={addToCart} />
          ))}
        </section>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
