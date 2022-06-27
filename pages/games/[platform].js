import { map, size } from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import { getGamesPlatformApi, getTotalGamesPLatform } from "../../api/game";
import ListGames from "../../components/ListGames";
import Pagination from "../../components/Pagination";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";

const limitPerPage = 10;

export default function Platform() {
  const { query } = useRouter();
  const [games, setGames] = useState(null);
  const [totalGamers, setTotalGamers] = useState(null);

  const getStartItem = () => {
    const currentPage = parseInt(query.page);
    if (!query.page || currentPage === 1) return 0;
    else return currentPage * limitPerPage - limitPerPage;
  };
  useEffect(() => {
    (async () => {
      if (query.platform) {
        const response = await getGamesPlatformApi(
          query.platform,
          limitPerPage,
          getStartItem()
        );
        setGames(response);
      }
    })();
  }, [query]);

  useEffect(() => {
    (async () => {
      const response = await getTotalGamesPLatform(query.platform);
      setTotalGamers(response);
    })();

    return () => {};
  }, [query.platform]);

  return (
    <BasicLayout className="platform">
      {!games && <Loader active>Cargando juegos</Loader>}
      {games && size(games) === 0 && (
        <div>
          <h3>No hay juegos</h3>
        </div>
      )}
      {size(games) > 0 && <ListGames games={games} />}
      {totalGamers ? (
        <Pagination
          totalGames={totalGamers}
          page={query.page ? parseInt(query.page) : 1}
          limitPerPage={limitPerPage}
        />
      ) : null}
    </BasicLayout>
  );
}
