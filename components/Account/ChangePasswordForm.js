import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "Yup";
import { Button, Form, FormGroup, FormInput } from "semantic-ui-react";
import { updatePasswordApi } from "../../api/user";

export const ChangePasswordForm = (props) => {
  const { user, logout } = props;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await updatePasswordApi(
        user.id,
        formData.password,
        logout
      );
      if (!response || response?.statusCode === 400) {
        toast.error("Error al actualizar el email");
      } else {
        logout();
      }
      setLoading(false);
    },
  });
  return (
    <div className="change-password-form">
      <h4>Cambiar tu contraseña</h4>

      <Form onSubmit={formik.handleSubmit}>
        <FormGroup widths="equal">
          <FormInput
            name="password"
            type="password"
            placeholder="Tu nuevo password"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.errors.password}
          />
          <FormInput
            name="repeat"
            type="password"
            placeholder="Confirma tu nuevo password"
            onChange={formik.handleChange}
            value={formik.values.repeat}
            error={formik.errors.repeat}
          />
        </FormGroup>
        <Button className="submit" type="submit" loading={loading}>
          Actualizar
        </Button>
      </Form>
    </div>
  );
};

function initialValues() {
  return {
    password: "",
    repeat: "",
  };
}

function validationSchema() {
  return {
    password: Yup.string()
      .required(true)
      .oneOf([Yup.ref("repeat")], true),
    repeat: Yup.string()
      .required(true)
      .oneOf([Yup.ref("password")], true),
  };
}
