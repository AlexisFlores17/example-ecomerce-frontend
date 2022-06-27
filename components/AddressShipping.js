import { map, size } from "lodash";
import React, { useState, useEffect } from "react";
import { getAddressApi } from "../api/address";
import useAuth from "../hooks/useAuth";
import Link from "next/link";
import { Grid, GridColumn } from "semantic-ui-react";
import classNames from "classnames";

export default function AddressShipping(props) {
  const { setAddress } = props;
  const [addresses, seTaddresses] = useState(null);
  const [addressActive, setAddressActive] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getAddressApi(auth.idUser, logout);

      seTaddresses(response);
    })();
  }, []);

  return (
    <div className="address-shipping">
      <div className="title">Dirección de envio</div>
      <div className="data">
        {size(addresses) === 0 ? (
          <h3>
            No hay dirección creada
            <Link href="/account"> Añade tu primera dirección</Link>
          </h3>
        ) : (
          <Grid>
            {map(addresses, (address) => (
              <GridColumn key={address.id} mobile={16} tablet={8} computer={4}>
                <Adress
                  address={address}
                  addressActive={addressActive}
                  setAddressActive={setAddressActive}
                  setAddress={setAddress}
                />
              </GridColumn>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
}

function Adress(props) {
  const { address, addressActive, setAddressActive, setAddress } = props;
  const changeAddress = () => {
    setAddressActive(address._id);
    setAddress(address);
  };

  return (
    <div
      className={classNames("address", {
        active: addressActive === address._id,
      })}
      onClick={changeAddress}
    >
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>
        {address.city}, {address.state}, {address.postalCode}
      </p>
      <p>{address.phone}</p>
    </div>
  );
}
