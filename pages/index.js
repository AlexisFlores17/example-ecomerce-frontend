import { size } from "lodash";
import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { getLastGameApi } from "../api/game";
import ListGames from "../components/ListGames";
import SEO from "../components/SEO";
import BasicLayout from "../layouts/BasicLayout";

export default function Home() {
  const [games, setGames] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await getLastGameApi(10);

      if (size(response) > 0) {
        setGames(response);
      } else {
        setGames([]);
      }
    })();

    return () => {};
  }, []);

  return (
    <BasicLayout className="home">
      <SEO />
      {!games && <Loader active>Cargando juegos</Loader>}
      {games && size(games) === 0 && (
        <div>
          <h3>No hay juegos</h3>
        </div>
      )}
      {size(games) > 0 && <ListGames games={games} />}
    </BasicLayout>
  );
}
