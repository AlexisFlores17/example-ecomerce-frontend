import Head from "next/head";
import React from "react";

export default function SEO(props) {
  const { title, description } = props;
  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={description} />
    </Head>
  );
}

SEO.defaultProps = {
  title: "Gaming",
  description: "Tus juegos favoritos papu",
};
