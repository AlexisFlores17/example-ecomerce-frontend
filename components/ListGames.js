import { map } from "lodash";
import React from "react";
import { Grid, GridColumn, GridRow, Image } from "semantic-ui-react";
import Link from "next/link";
import useWindowSize from "../hooks/useWindowSize";
import {
  breackpointUpLg,
  breackpointUpMd,
  breackpointUpSm,
} from "../utils/breakpoint";

export default function ListGames(props) {
  const { games } = props;
  const { width } = useWindowSize();

  const getColumnsRender = () => {
    switch (true) {
      case width > breackpointUpLg:
        return 5;
      case width > breackpointUpMd:
        return 3;
      case width > breackpointUpSm:
        return 2;

      default:
        return 1;
    }
  };

  return (
    <div className="list-games">
      <Grid>
        <GridRow columns={getColumnsRender()}>
          {map(games, (game) => {
            return <Game game={game} key={game.title} />;
          })}
        </GridRow>
      </Grid>
    </div>
  );
}

function Game(props) {
  const { game } = props;
  return (
    <GridColumn className="list-games__game">
      <Link href={`/${game.url}`}>
        <a>
          <div className="list-games__game-poster">
            <Image src={game.poster.url} alt={game.title} />
            <div className="list-games__game-poster-info">
              {game.discount ? (
                <span className="discount">-{game.discount}%</span>
              ) : (
                <span />
              )}
              <span className="price">{game.price}$</span>
            </div>
          </div>
          <h2>{game.title}</h2>
        </a>
      </Link>
    </GridColumn>
  );
}
