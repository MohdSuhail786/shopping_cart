import React from "react";

export default function Cart({ products, callback }) {
  const [items, setItems] = React.useState(products);
  const [totalPrice, setTotalPrice] = React.useState(() => {
    let sum = 0;
    console.log(items);
    for (let i = 0; i < items.length; i++) {
      sum += Number(items[i].price) * Number(items[i].quantity);
    }
    return sum;
  });

  function updateTotalPrice() {
    let sum = 0;
    for (let i = 0; i < JSON.parse(localStorage.cart).length; i++) {
      sum +=
        Number(JSON.parse(localStorage.cart)[i].price) *
        Number(JSON.parse(localStorage.cart)[i].quantity);
    }
    setTotalPrice(sum);
  }

  function removeItem(productId) {
    let presentCart = [];
    for (let i = 0; i < items.length; i++) {
      if (items[i].id == productId) {
        continue;
      }
      console.log(items[i].id, productId);
      presentCart.push(items[i]);
    }
    localStorage.cart = JSON.stringify(presentCart);
    setItems(presentCart);
    callback(false);
  }

  function updateQuantity(val, productId) {
    let flag = false;
    for (let i = 0; i < items.length; i++) {
      if (items[i].id == productId) {
        items[i].quantity = Number(items[i].quantity) + val;
        if (items[i].quantity == 0) {
          flag = true;
          break;
        }
      }
    }
    localStorage.cart = JSON.stringify(items);
    if (flag) removeItem(productId);
    updateTotalPrice();
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          right: 0,
          top: 0,
          width: 400,
          backgroundColor: "white",
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            padding: "0px 20px",
            maxHeight: window.innerHeight - 100,
            overflowY: "scroll",
          }}
        >
          <h2 style={{ cursor: "pointer" }} onClick={callback}>
            x
          </h2>
          <h1 style={{ textAlign: "center", margin: 0 }}>Cart</h1>
          <div
            style={{
              backgroundColor: "rgb(0 0 0 / 87%)",
              height: 1,
              width: "100%",
            }}
          ></div>

          {items.map((item) => {
            return (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 10,
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <img src={item.image} style={{ width: 100 }}></img>
                  <div
                    style={{
                      display: "flex",
                      padding: 10,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <p>{item.name}</p>
                    <p>
                      <b>{item.price} $</b>
                    </p>
                    <button
                      onClick={() => updateQuantity(-1, item.id)}
                      style={{ padding: 10, margin: 10 }}
                    >
                      -
                    </button>{" "}
                    {item.quantity}{" "}
                    <button
                      onClick={() => updateQuantity(1, item.id)}
                      style={{ padding: 10, margin: 10 }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: "rgb(0 0 0 / 87%)",
                    height: 1,
                    width: "100%",
                  }}
                ></div>
              </>
            );
          })}
        </div>
        <h3>Total Price : {totalPrice.toFixed(2)} $</h3>
      </div>
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "calc(100% - 400px)",
          height: "100%",
          backgroundColor: "#0000004d",
        }}
      ></div>
    </>
  );
}
