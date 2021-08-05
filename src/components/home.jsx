import React, { useLayoutEffect } from "react";
import Card from "./card";
import Header from "./header";
import { data } from "../data";
import Cart from "./cart";

export default function Home() {
//   const [data,setData] = React.useState([]);
  const [noOfItem, setNoOfItem] = React.useState(() => {
    return localStorage.cart ? JSON.parse(localStorage.cart).length : 0;
  });
  const [items, setItems] = React.useState(() => {
    return localStorage.cart ? JSON.parse(localStorage.cart) : [];
  });
  const [openCart, setOpenCart] = React.useState(false);

  function updateCart() {
    setNoOfItem(() => {
      return localStorage.cart ? JSON.parse(localStorage.cart).length : 0;
    });
    setItems(() => {
      return localStorage.cart ? JSON.parse(localStorage.cart) : [];
    });
  }

  function toogleCART() {
    setOpenCart(!openCart);
    if (openCart) window.location.reload();
  }

//   useLayoutEffect(()=>{
//     fetch('http://localhost:5555/products',{
//       method:"GET"
//     }).then(res => res.json()).then(data =>{
//       setData(data);
//     })
//   },[])

  return (
    <>
      <div style={{ margin: 0, position: "fixed", width: "100%" }}>
        <Header noOfItem={noOfItem} callback={toogleCART} />
      </div>
      <div
        style={{
          paddingTop: 50,
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {data.map((item) => {
          return (
            <Card
              productId={item.id}
              name={item.name}
              price={item.price}
              image={item.image}
              callback={updateCart}
            />
          );
        })}
      </div>
      {openCart && (
        <Cart
          products={items}
          callback={(flag = true) => {
            updateCart();
            if (flag) toogleCART();
          }}
        />
      )}
    </>
  );
}
