import { useEffect, useMemo } from "react";
import { useState } from "react";
import { db } from "../data/guitars";

const useCart = () => {
    //START LOGIC ON APP.JSX //

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

    // Function to check if button should be disabled
    function isDisabled(id) {
        const item = cart.find((guitar) => guitar.id === id);
        return item?.quantity >= MAX_QUANTITY;
    }

    //END LOGIC FOR APP.JSX //

    //LOGIC FOR HEADER.JSX //
    //Derivated states
    //Usememo is a hook that allows you to memorize the value of a variable and does not render the app again, unless the cart changes.
    const isEmpty = useMemo(() => cart.length === 0, [cart]);
    const cartTotal = useMemo(
        () =>
            cart.reduce((total, guitar) => total + guitar.quantity * guitar.price, 0),
        [cart]
    );

    //Return the functions of the custom hook
    return {
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
        cartTotal
    }

}

export default useCart;