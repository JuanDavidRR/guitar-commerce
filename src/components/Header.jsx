import { useMemo } from "react";

const Header = ({
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  MAX_QUANTITY,
  MIN_QUANTITY,
}) => {
  //Derivated states
  //Usemeo is a hook that allows you to memorize the value of a variable and does not render the app again, unless the cart changes.
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () =>
      cart.reduce((total, guitar) => total + guitar.quantity * guitar.price, 0),
    [cart]
  );

  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img
                className="img-fluid"
                src="/img/logo.svg"
                alt="imagen logo"
              />
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            {!isEmpty && <span className="text-white">{cart.length}</span>}

            <div className="carrito">
              <img
                className="img-fluid"
                src="/img/carrito.png"
                alt="imagen carrito"
              />

              <div id="carrito" className="bg-white p-3">
                {isEmpty ? (
                  <div>
                    <p className="text-center fw-bold fs-4">
                      El carrito esta vacio
                    </p>
                    <p>¡Agrega nuevas guitarras y las verás listadas!</p>
                  </div>
                ) : (
                  <section>
                    <table className="w-100 table">
                      <thead>
                        <tr>
                          <th>Imagen</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((guitar) => (
                          <tr key={guitar.id}>
                            <td>
                              <img
                                className="img-fluid"
                                src={`/img/${guitar.image}.jpg`}
                                alt={guitar.name}
                              />
                            </td>
                            <td>{guitar.name}</td>
                            <td className="fw-bold">${guitar.price}</td>
                            <td className="flex align-items-start gap-4">
                              <button
                                onClick={() => decreaseQuantity(guitar.id)}
                                type="button"
                                className="btn btn-dark"
                                disabled={guitar.quantity <= MIN_QUANTITY}
                              >
                                -
                              </button>
                              {guitar.quantity}
                              <button
                                onClick={() => increaseQuantity(guitar.id)}
                                type="button"
                                className="btn btn-dark"
                                disabled={guitar.quantity >= MAX_QUANTITY}
                              >
                                +
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => removeFromCart(guitar.id)}
                                className="btn btn-danger"
                                type="button"
                              >
                                X
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="text-end">
                      Total pagar: <span className="fw-bold">${cartTotal}</span>
                    </p>
                    <button onClick={clearCart} className="btn btn-dark w-100 mt-3 p-2">
                      Vaciar Carrito
                    </button>
                  </section>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
