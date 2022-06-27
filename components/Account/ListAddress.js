import React, { useState, useEffect } from "react";
import { getAddressApi, deleteAddressApi } from "../../api/address";
import useAuth from "../../hooks/useAuth";
import { map, size } from "lodash";
import { Button, Grid, GridColumn } from "semantic-ui-react";

export const ListAddress = (props) => {
  const { realoadAddress, setRealoadAddress, openModal } = props;
  const [address, setAddress] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getAddressApi(auth.idUser, logout);
      setAddress(response || []);
      setRealoadAddress(false);
    })();
  }, [realoadAddress]);
  if (!address) {
    return null;
  }
  return (
    <div className="list-address">
      {size(address) === 0 ? (
        <h3>No hay ninguna dirección</h3>
      ) : (
        <Grid>
          {map(address, (address) => (
            <GridColumn key={address.id} mobile={16} tablet={8} computer={4}>
              <Address
                address={address}
                logout={logout}
                setRealoadAddress={setRealoadAddress}
                openModal={openModal}
              />
            </GridColumn>
          ))}
        </Grid>
      )}
    </div>
  );
};

function Address(props) {
  const { address, logout, setRealoadAddress, openModal } = props;
  const [loadingDelete, setLoadingDelete] = useState(false);

  const deleteAddress = async () => {
    setLoadingDelete(true);
    const response = await deleteAddressApi(address._id, logout);
    if (response) {
      setRealoadAddress(true);
    }
    setLoadingDelete(false);
  };
  return (
    <div className="address">
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>
        {address.state}, {address.city} {address.postalCode}
      </p>
      <p>{address.phone}</p>

      <div className="actions">
        <Button
          primary
          onClick={() => openModal(`Editar: ${address.title}`, address)}
        >
          Editar
        </Button>
        <Button onClick={deleteAddress} loading={loadingDelete}>
          Eliminar
        </Button>
      </div>
    </div>
  );
}
