import { size } from "lodash";
import React, { useEffect, useState } from "react";
import { Button, Grid, GridColumn, Icon, Image } from "semantic-ui-react";
import {
  addFavoriteApi,
  deleteFavoriteApi,
  isFavoriteApi,
} from "../../api/favorite";
import useAuth from "../../hooks/useAuth";
import classNames from "classnames";
import useCart from "../../hooks/useCart";

export default function HeaderGame(props) {
  const { game } = props;
  const { poster, title } = game;
  return (
    <Grid className="header-game">
      <GridColumn mobile={16} tablet={6} computer={5}>
        <Image src={poster.url} alt={title} fluid />
      </GridColumn>
      <GridColumn mobile={16} tablet={10} computer={11}>
        <Info game={game} />
      </GridColumn>
    </Grid>
  );
}

function Info(props) {
  const [isFavourite, setIsFavourite] = useState(false);
  const { game } = props;
  const { title, summary, price, discount, url } = game;
  const { auth, logout } = useAuth();
  const [reloadFavorite, setReloadFavorite] = useState(false);
  const { addProductsCart } = useCart();

  useEffect(() => {
    (async () => {
      const response = await isFavoriteApi(auth.idUser, game.id, logout);
      if (size(response) > 0) setIsFavourite(true);
      else setIsFavourite(false);

      setReloadFavorite(false);
    })();

    return () => {};
  }, [game, reloadFavorite]);

  const addFavorites = async () => {
    if (auth) {
      await addFavoriteApi(auth.idUser, game.id, logout);
      setReloadFavorite(true);
    }
  };

  const deleteFavorite = async () => {
    if (auth) {
      await deleteFavoriteApi(auth.idUser, game.id, logout);
      setReloadFavorite(true);
    }
  };

  return (
    <>
      <div className="header-game__title">
        {title}
        <Icon
          name={isFavourite ? "heart" : "heart outline"}
          link
          className={classNames({ like: isFavourite })}
          onClick={isFavourite ? deleteFavorite : addFavorites}
        />
      </div>
      <div className="header-game__delivery">Entrega en 24/48h</div>
      <div
        className="header-game__summary"
        dangerouslySetInnerHTML={{ __html: summary }}
      />
      <div className="header-game__buy">
        <div className="header-game__buy-price">
          <p>Precio de venta al publico: {price}$ </p>
          <div className="header-game__buy-price-actions">
            <p>-{discount}%</p>
            <p>{(price - Math.floor(price * discount) / 100).toFixed(2)}$</p>
          </div>
        </div>
        <Button
          className="header-game__buy-btn"
          onClick={() => addProductsCart(url)}
        >
          Comprar
        </Button>
      </div>
    </>
  );
}
