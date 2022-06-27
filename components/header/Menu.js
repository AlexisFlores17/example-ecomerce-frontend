import {
  Container,
  Grid,
  GridColumn,
  Icon,
  Menu,
  MenuItem,
  Label,
} from "semantic-ui-react";
import Link from "next/link";
import { BasicModal } from "../modal/BasicModal";
import { useState, useEffect } from "react";
import { Auth } from "../Auth/Auth";
import useAuth from "../../hooks/useAuth";
import { getMeApi } from "../../api/user";
import { getPlatformApi } from "../../api/platform";
import { map } from "lodash";
import useCart from "../../hooks/useCart";

export const MenuWeb = () => {
  const { logout, auth } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("Iniciar sesion");
  const onShowModal = () => setShowModal(true);
  const onCloseModal = () => setShowModal(false);
  const [platforms, setPlatforms] = useState([]);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    (async () => {
      const response = await getPlatformApi();
      setPlatforms(response || []);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response);
    })();
  }, [auth, logout]);

  return (
    <div className="menu">
      <Container>
        <Grid>
          <GridColumn className="menu__left" width={6}>
            <MenuPlataformas platforms={platforms} />
          </GridColumn>
          <GridColumn className="menu__right" width={10}>
            {user !== undefined && (
              <MenuOptions
                onShowModal={onShowModal}
                user={user}
                logout={logout}
              />
            )}
          </GridColumn>
        </Grid>
      </Container>
      <BasicModal
        show={showModal}
        setShow={setShowModal}
        title={titleModal}
        size="small"
      >
        <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal} />
      </BasicModal>
    </div>
  );
};

function MenuPlataformas(props) {
  const { platforms } = props;

  return (
    <Menu>
      {map(platforms, (platform) => {
        return (
          <Link href={`/games/${platform.url}`} key={platform._id}>
            <MenuItem as="a" name={platform.url}>
              {platform.title}
            </MenuItem>
          </Link>
        );
      })}
    </Menu>
  );
}

function MenuOptions({ onShowModal, user, logout }) {
  const { productsCart } = useCart();
  return (
    <Menu>
      {user ? (
        <>
          <Link href="/orders">
            <MenuItem as="a">
              <Icon name="game" />
              Mis pedidos
            </MenuItem>
          </Link>
          <Link href="/wishlist">
            <MenuItem as="a">
              <Icon name="heart outline" />
              Wishlist
            </MenuItem>
          </Link>
          <Link href="/account">
            <MenuItem as="a">
              <Icon name="user outline" />
              {user.name} {user.lastname}
            </MenuItem>
          </Link>
          <Link href="/cart">
            <MenuItem as="a" className="m-0">
              <Icon name="cart" />
              {productsCart > 0 && (
                <Label color="red" floating circular>
                  {productsCart}
                </Label>
              )}
            </MenuItem>
          </Link>
          <MenuItem onClick={logout} className="m-0">
            <Icon name="power off" />
          </MenuItem>
        </>
      ) : (
        <MenuItem onClick={onShowModal}>
          <Icon name="user outline" />
          Mi cuenta
        </MenuItem>
      )}
    </Menu>
  );
}
