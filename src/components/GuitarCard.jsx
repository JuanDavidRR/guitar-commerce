const GuitarCard = ({ guitar, addToCart, isDisabled }) => {
  const { name, image, price, description } = guitar;

  return (
    <article className="col-md-6 col-lg-4 my-4 row align-items-center">
      <div className="col-4">
        <img
          className="img-fluid"
          src={`/img/${image}.jpg`}
          alt="imagen guitarra"
        />
      </div>
      <div className="col-8">
        <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
        <p>{description}</p>
        <p className="fw-black text-primary fs-3">${price}</p>
        <button
          onClick={() => addToCart(guitar)}
          type="button"
          className="btn btn-dark w-100"
          disabled={isDisabled(guitar.id)}
        >
          {isDisabled(guitar.id) ? "No puedes agregar más" : "Agregar al Carrito"}
        </button>
      </div>
    </article>
  );
};

export default GuitarCard;
