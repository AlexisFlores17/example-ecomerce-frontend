import { MenuWeb } from "./Menu";
import { TopBar } from "./TopBar";

export const Header = () => {
  return (
    <div className="header">
      <TopBar />
      <MenuWeb />
    </div>
  );
};
