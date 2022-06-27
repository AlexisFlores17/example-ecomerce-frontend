import React, { useEffect, useState } from "react";
import { getGameByUrlApi } from "../api/game";
import AddressShipping from "../components/AddressShipping";
import Payment from "../components/Payment";
import SummaryCart from "../components/SummaryCart";
import useCart from "../hooks/useCart";
import BasicLayout from "../layouts/BasicLayout/BasicLayout";

export default function Cart() {
  const { getProductsCart } = useCart();
  const products = getProductsCart();

  return !products ? <EmptyCart /> : <FullCart products={products} />;
}

function EmptyCart() {
  return (
    <BasicLayout className="empty-cart">
      <h2>No hay productos en el carrito</h2>
    </BasicLayout>
  );
}

function FullCart({ products }) {
  const [productsData, setproductsData] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    (async () => {
      const productstemp = [];
      for await (const product of products) {
        const data = await getGameByUrlApi(product);
        productstemp.push(data);
      }
      setproductsData(productstemp);
    })();
    setReloadCart(false);
  }, [reloadCart]);

  return (
    <BasicLayout className="full-cart">
      <SummaryCart
        products={productsData}
        reloadCart={reloadCart}
        setReloadCart={setReloadCart}
      />
      <AddressShipping setAddress={setAddress} />
      {address && <Payment products={productsData} address={address} />}
    </BasicLayout>
  );
}
