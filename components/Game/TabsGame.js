import React from "react";
import { Tab, TabPane } from "semantic-ui-react";
import InfoGame from "./InfoGame";

export default function TabsGame(props) {
  const { game } = props;

  const panes = [
    {
      menuItem: "Informacion",
      render: () => (
        <TabPane>
          <InfoGame game={game} />
        </TabPane>
      ),
    },
  ];
  return <Tab className="tabs-game" panes={panes} />;
}
