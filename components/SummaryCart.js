import { forEach, map } from "lodash";
import React, { useState, useEffect } from "react";
import {
  Icon,
  Image,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";
import useCart from "../hooks/useCart";

export default function SummaryCart({ products, reloadcart, setReloadCart }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const { removeProductsCart } = useCart();

  const removeProduct = (product) => {
    removeProductsCart(product);
    setReloadCart(true);
  };

  useEffect(() => {
    let price = 0;

    forEach(products, (product) => {
      price += product.price;
    });

    setTotalPrice(price);
  }, [products, reloadcart]);

  return (
    <div className="summary-cart">
      <div className="title">Resumen del carrito</div>
      <div className="data">
        <Table celled structured>
          <TableHeader>
            <TableHeaderCell>Producto</TableHeaderCell>
            <TableHeaderCell>Plataforma</TableHeaderCell>
            <TableHeaderCell>Entrega</TableHeaderCell>
            <TableHeaderCell>Precio</TableHeaderCell>
          </TableHeader>
          <TableBody>
            {map(products, (product) => (
              <TableRow key={product.id} className="summary-cart__product">
                <TableCell>
                  <Icon
                    name="close"
                    link
                    onClick={() => removeProduct(product.url)}
                  />
                  <Image src={product.poster.url} alt={product.title} />
                  {product.title}
                </TableCell>
                <TableCell>{product.platform.title}</TableCell>
                <TableCell>Inmediata</TableCell>
                <TableCell>{product.price} $</TableCell>
              </TableRow>
            ))}
            <TableRow className="summary-cart__resume">
              <TableCell className="clear" />
              <TableCell colSpan="2">Total:</TableCell>
              <TableCell className="total-price">
                {totalPrice.toFixed(2)} $
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
