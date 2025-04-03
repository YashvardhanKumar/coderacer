import axios from "axios";
import IUser from "../models/user";
const url = process.env.SERVER_URL ?? "";

export async function getUsers() {
  try {
    const data = await axios.get(url, { withCredentials: true });
    return data.data;
  } catch (error) {
    alert(error);
  }
}
export async function getUserById(id: string) {
  try {
    const data = await axios.get(`${url}/${id}`, { withCredentials: true });
    return data.data;
  } catch (error) {
    alert(error);
  }
}

export async function getCurUser() {
  try {
    const data = await axios.get(`${url}/users/cur-user`, {
      withCredentials: true,
    });
    return data.data;
  } catch (error) {
    alert(error);
  }
}

export async function updateUser(user: IUser, id: string) {
  try {
    const data = await axios.patch(`${url}/${id}`, user, {
      withCredentials: true,
    });
    return data.data;
  } catch (error) {
    alert(error);
  }
}

export async function deleteUser(id: string) {
  try {
    const data = await axios.delete(`${url}/${id}`, { withCredentials: true });
    return data.data;
  } catch (error) {
    alert(error);
  }
}
