import React, { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout/BasicLayout";
import { useRouter } from "next/router";
import { getGameByUrlApi } from "../api/game";
import HeaderGame from "../components/Game/HeaderGame";
import TabsGame from "../components/Game/TabsGame";
import SEO from "../components/SEO";
export default function Game() {
  const { query } = useRouter();
  const [game, setGame] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await getGameByUrlApi(query.game);
      setGame(response);
    })();

    return () => {};
  }, [query]);

  if (!game) return null;

  return (
    <BasicLayout className="game">
      <SEO title={game.title} />
      <HeaderGame game={game} />
      <TabsGame game={game} />
    </BasicLayout>
  );
}
