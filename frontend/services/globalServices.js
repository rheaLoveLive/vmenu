import axios from "axios";

class Services {
  AxiosInstance;
  constructor() {
    this.AxiosInstance = axios.create({
      baseURL: "http://localhost:8000",
      timeout: 30000,
      timeoutErrorMessage: "Request Time Out!",
    });
  }
}

export { Services };
