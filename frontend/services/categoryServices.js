import { Services } from "./globalServices";

const gServices = new Services();

const getCategories = async () => {
  return await gServices.AxiosInstance.get("/api/category/index").catch((e) =>
    console.log(e)
  );
};

const createCategory = async (req) => {
  return await gServices.AxiosInstance.post("/api/category/create", {
    req,
  }).catch((e) => console.log(e));
};

const updateCategory = async (req) => {
  return await gServices.AxiosInstance.post("/api/category/update", {
    req,
  }).catch((e) => console.log(e));
};

const delCategory = async (id) => {
  return await gServices.AxiosInstance.post("/api/category/delete", {
    id,
  }).catch((e) => console.log(e));
};

export { getCategories, createCategory, updateCategory, delCategory };
