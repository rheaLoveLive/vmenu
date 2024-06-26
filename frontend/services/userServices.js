import axios from "axios";
import { Services } from "./globalServices";

const gServices = new Services();

const getUsers = async () => {
  return await gServices.AxiosInstance.get("/api/user/index").catch((e) =>
    console.log(e)
  );
};

const createUser = async (req) => {
  console.log(req);
  return await gServices.AxiosInstance.post("/api/user/create", req).catch(
    (e) => console.log(e)
  );
};

const updateUser = async (req) => {
  console.log(req);

  return await gServices.AxiosInstance.post("/api/user/update", {
    id: req.id,
    name: req.name,
    email: req.email,
    password: req.password ? req.password : null,
    role: req.role,
    status: req.status,
  }).catch((e) => console.log(e));
};

const delUser = async (id) => {
  return await gServices.AxiosInstance.post("/api/user/delete", {
    id,
  }).catch((e) => console.log(e));
};

export { getUsers, createUser, updateUser, delUser };
