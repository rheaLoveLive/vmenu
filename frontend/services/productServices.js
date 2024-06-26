import axios from "axios";
import { Services } from "./globalServices";

const gServices = new Services();

const getProducts = async () => {
  return await gServices.AxiosInstance.get("/api/product/index").catch((e) =>
    console.log(e)
  );
};

const createProduct = async (req) => {
  return await gServices.AxiosInstance.post("/api/product/create", req).catch(
    (e) => console.log(e)
  );
};

const updateProduct = async (req) => {
  return await gServices.AxiosInstance.post("/api/product/update", req).catch(
    (e) => console.log(e)
  );
};

const imageUpload = async (filename, folderName) => {
  return await axios
    .post("/api/upload", {
      filename,
      folderName,
    })
    .catch((e) => console.log(e));
};

const delProduct = async (id) => {
  return await gServices.AxiosInstance.post("/api/product/delete", {
    id,
  }).catch((e) => console.log(e));
};

export { getProducts, createProduct, updateProduct, delProduct, imageUpload };
