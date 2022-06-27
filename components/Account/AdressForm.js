import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, FormInput } from "semantic-ui-react";
import * as Yup from "yup";
import { createAddressApi, updateAddressApi } from "../../api/address";
import useAuth from "../../hooks/useAuth";

export const AdressForm = (props) => {
  const { setShowModal, setRealoadAddress, newAddress, address } = props;
  const [loading, setLoading] = useState(false);
  const { auth, logout } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(address),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      if (newAddress) {
        createAddress(formData);
      } else {
        updateAddress(formData);
      }
    },
  });

  const createAddress = async (formData) => {
    setLoading(true);
    const formDataTemp = {
      ...formData,
      users_permissions_user: auth.idUser,
    };
    const response = await createAddressApi(formDataTemp, logout, auth.idUser);

    console.log(response);
    if (!response) {
      toast.warning("Error al creal la direccion");
      setLoading(false);
    } else {
      formik.resetForm();
      setLoading(false);
      setRealoadAddress(true);
      setShowModal(false);
    }
  };

  const updateAddress = async (formData) => {
    setLoading(true);
    const formDataTemp = {
      ...formData,
      users_permissions_user: auth.idUser,
    };
    const response = await updateAddressApi(address._id, formDataTemp, logout);

    if (!response) {
      toast.warning("Error al editar la direccion");
      setLoading(false);
    } else {
      formik.resetForm();
      setLoading(false);
      setRealoadAddress(true);
      setShowModal(false);
    }
  };
  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormInput
        name="title"
        type="text"
        label="Titulo de la direccion"
        placeholder="Titulo de la direccion"
        onChange={formik.handleChange}
        value={formik.values.title}
        error={formik.errors.title}
      />
      <FormGroup widths="equal">
        <FormInput
          name="name"
          type="text"
          label="Nombre y apellidos"
          placeholder="Nombre y apellidos"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name}
        />

        <FormInput
          name="address"
          type="text"
          label="Dirección"
          placeholder="Dirección"
          onChange={formik.handleChange}
          value={formik.values.address}
          error={formik.errors.address}
        />
      </FormGroup>
      <FormGroup widths="equal">
        <FormInput
          name="city"
          type="text"
          label="Ciudad"
          placeholder="Ciudad"
          onChange={formik.handleChange}
          value={formik.values.city}
          error={formik.errors.city}
        />
        <FormInput
          name="state"
          type="text"
          label="Estado/Provincia/Región"
          placeholder="Estado/Provincia/Región"
          onChange={formik.handleChange}
          value={formik.values.state}
          error={formik.errors.state}
        />
      </FormGroup>
      <FormGroup widths="equal">
        <FormInput
          name="postalCode"
          type="text"
          label="Código postal"
          placeholder="Código postal"
          onChange={formik.handleChange}
          value={formik.values.postalCode}
          error={formik.errors.postalCode}
        />
        <FormInput
          name="phone"
          type="text"
          label="Número de teléfono"
          placeholder="Número de teléfono"
          onChange={formik.handleChange}
          value={formik.values.phone}
          error={formik.errors.phone}
        />
      </FormGroup>
      <div className="actions">
        <Button className="submit" type="submit" loading={loading}>
          {newAddress ? "Crear dirección" : "Actualizar dirección"}
        </Button>
      </div>
    </Form>
  );
};

function initialValues(address) {
  return {
    title: address?.title || "",
    name: address?.name || "",
    address: address?.address || "",
    city: address?.city || "",
    state: address?.state || "",
    postalCode: address?.postalCode || "",
    phone: address?.phone || "",
  };
}

function validationSchema() {
  return {
    title: Yup.string().required(true),
    name: Yup.string().required(true),
    address: Yup.string().required(true),
    city: Yup.string().required(true),
    state: Yup.string().required(true),
    postalCode: Yup.string().required(true),
    phone: Yup.string().required(true),
  };
}
