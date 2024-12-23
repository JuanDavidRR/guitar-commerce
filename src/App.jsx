import GuitarCard from "./components/GuitarCard";
import Header from "./components/Header";
import useCart from "./hooks/useCart";

function App() {
  //Returning the functions of my custom hook to be used
  const {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isDisabled,
    MAX_QUANTITY,
    MIN_QUANTITY,
    isEmpty,
    cartTotal,
  } = useCart();

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
        isEmpty={isEmpty}
        cartTotal={cartTotal}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <section className="row mt-5">
          {data.map((guitar) => (
            <GuitarCard
              key={guitar.id}
              cart={cart}
              guitar={guitar}
              addToCart={addToCart}
              isDisabled={isDisabled}
            />
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
