import { size } from "lodash";
import { BASE_PATH } from "../utils/constans";
import { authFetch } from "../utils/fetch";

export async function isFavoriteApi(idUser, idGame, logout) {
  try {
    const url = `${BASE_PATH}/favorites?users_permissions_user=${idUser}&game=${idGame}`;
    return await authFetch(url, null, logout);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function addFavoriteApi(idUser, idGame, logout) {
  try {
    const dataFound = await isFavoriteApi(idUser, idGame, logout);
    if (size(dataFound) > 0 || !dataFound) {
      return "Este juego ya lo tienes en tu lista de favoritos";
    } else {
      const url = `${BASE_PATH}/favorites`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ users_permissions_user: idUser, game: idGame }),
      };
      const result = await authFetch(url, params, logout);
      return result;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteFavoriteApi(idUser, idGame, logout) {
  try {
    const dataFound = await isFavoriteApi(idUser, idGame, logout);
    if (size(dataFound) > 0) {
      const url = `${BASE_PATH}/favorites/${dataFound[0]._id}`;
      const params = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const result = await authFetch(url, params, logout);
      return result;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getFavoriteApi(idUser, logout) {
  try {
    const url = `${BASE_PATH}/favorites?users_permissions_user=${idUser}`;
    const result = await authFetch(url, null, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
