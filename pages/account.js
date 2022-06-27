import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
import { getMeApi } from "../api/user";
import { AdressForm } from "../components/Account/AdressForm";
import { ChangeEmailForm } from "../components/Account/ChangeEmailForm";
import ChangeNameForm from "../components/Account/ChangeNameForm";
import { ChangePasswordForm } from "../components/Account/ChangePasswordForm";
import { ListAddress } from "../components/Account/ListAddress";
import { BasicModal } from "../components/modal/BasicModal";
import useAuth from "../hooks/useAuth";
import BasicLayout from "../layouts/BasicLayout/BasicLayout";

export default function Account() {
  const [user, setUser] = useState(undefined);
  const { auth, logout, setReloadUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response || null);
    })();
  }, [auth]);

  if (user === undefined) {
    return null;
  }
  if (!auth && !user) {
    router.replace("/");
    return null;
  }

  return (
    <BasicLayout className="account">
      <Configuration
        user={user}
        logout={logout}
        setReloadUser={setReloadUser}
      />
      <Adresses />
    </BasicLayout>
  );
}

function Configuration({ user, logout, setReloadUser }) {
  return (
    <div className="account__configuration">
      <div className="title">Configuarión</div>
      <div className="data">
        <ChangeNameForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        />
        <ChangeEmailForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        />
        <ChangePasswordForm user={user} logout={logout} />
      </div>
    </div>
  );
}

function Adresses() {
  const [showModal, setShowModal] = useState(false);
  const [tittleModal, setTittleModal] = useState("");
  const [formModal, setFormModal] = useState(null);
  const [realoadAddress, setRealoadAddress] = useState(false);

  const openModal = (title, address) => {
    setTittleModal(title);
    setFormModal(
      <AdressForm
        setShowModal={setShowModal}
        setRealoadAddress={setRealoadAddress}
        newAddress={address ? false : true}
        address={address || null}
      />
    );
    setShowModal(true);
  };
  return (
    <div className="account__addresses">
      <div className="title">
        Direcciones
        <Icon name="plus" link onClick={() => openModal("Nueva direccion")} />
      </div>
      <div className="data">
        <ListAddress
          realoadAddress={realoadAddress}
          setRealoadAddress={setRealoadAddress}
          openModal={openModal}
        />
      </div>

      <BasicModal show={showModal} setShow={setShowModal} title={tittleModal}>
        {formModal}
      </BasicModal>
    </div>
  );
}
