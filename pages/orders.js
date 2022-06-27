import { map, size } from "lodash";
import React, { useState, useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { getOrdersApi } from "../api/order";
import { Order } from "../components/Orders/Order";
import SEO from "../components/SEO";
import useAuth from "../hooks/useAuth";
import BasicLayout from "../layouts/BasicLayout/BasicLayout";

export default function Orders() {
  const [orders, setOrders] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getOrdersApi(auth.idUser, logout);
      setOrders(response || []);
    })();
    return () => {};
  }, []);

  return (
    <BasicLayout>
      <SEO title="Mis pedidos" description="Listado de todos tus pedidos" />
      <div className="orders">
        <div className="orders__block">
          <div className="title">Mis pedidos</div>
          <div className="data">
            {size(orders) === 0 ? (
              <h2 style={{ textAlign: "center" }}>
                Todavia no has realizado ninguna compra
              </h2>
            ) : (
              <OrderList orders={orders} />
            )}
          </div>
        </div>
      </div>
    </BasicLayout>
  );
}

function OrderList(props) {
  const { orders } = props;
  return (
    <Grid>
      {map(orders, (order) => (
        <GridColumn mobile={16} table={6} computer={8}>
          <Order order={order} />
        </GridColumn>
      ))}
    </Grid>
  );
}
