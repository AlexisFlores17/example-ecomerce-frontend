/* eslint-disable react-hooks/rules-of-hooks */
import { forEach, size } from "lodash";
import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { getFavoriteApi } from "../api/favorite";
import ListGames from "../components/ListGames";
import useAuth from "../hooks/useAuth";
import BasicLayout from "../layouts/BasicLayout/BasicLayout";

export default function wishlist() {
  const [games, setGames] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getFavoriteApi(auth.idUser, logout);
      if (size(response) > 0) {
        const gameList = [];
        forEach(response, (data) => {
          gameList.push(data.game);
        });

        setGames(gameList);
      } else {
        setGames([]);
      }
    })();
    return () => {};
  }, []);

  return (
    <BasicLayout className="wishlist">
      <div className="wishlist__block">
        <div className="title">Lista de juegos</div>
        <div className="data">
          {!games && <Loader active>Cargando juegos</Loader>}
          {games && size(games) === 0 && (
            <div className="data__not-found">
              <h3>No hay juegos</h3>
            </div>
          )}
          {size(games) > 0 && <ListGames games={games} />}
        </div>
      </div>
    </BasicLayout>
  );
}
