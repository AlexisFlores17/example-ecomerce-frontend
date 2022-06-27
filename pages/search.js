/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { searchGamesApi } from "../api/game";
import BasicLayout from "../layouts/BasicLayout";
import { useRouter } from "next/router";
import { size } from "lodash";
import ListGames from "../components/ListGames";
import { Loader } from "semantic-ui-react";
import SEO from "../components/SEO";

export default function search() {
  const [games, setGames] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    document.getElementById("search-game").focus();
    return () => {};
  }, []);

  useEffect(() => {
    (async () => {
      if (size(query.query) > 0) {
        const response = await searchGamesApi(query.query);
        if (size(response) > 0) setGames(response);
        else setGames([]);
      } else {
        setGames([]);
      }
    })();

    return () => {};
  }, [query.query]);

  return (
    <BasicLayout className="search">
      <SEO title={`Buscando: ${query.query}`} />
      {!games && <Loader active>Buscando juegos</Loader>}
      {games && size(games) === 0 && (
        <div>
          <h3>No se han encontrado juegos</h3>
        </div>
      )}
      {size(games) > 0 && <ListGames games={games} />}
    </BasicLayout>
  );
}
