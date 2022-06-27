import classNames from "classnames";
import React from "react";
import { Container } from "semantic-ui-react";
import { Header } from "../../components/header/Header";

export default function BasicLayout(props) {
  const { children, className } = props;
  return (
    <Container
      fluid
      className={classNames("basic-layout", {
        [className]: className,
      })}
    >
      <Header />
      <Container className="content">{children}</Container>
    </Container>
  );
}
