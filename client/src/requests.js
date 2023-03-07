import axios from "axios";
const apiUrl = "http://localhost:4000";

const requests = {
  get: (url) => {
    return axios({
      method: `get`,
      url: `${apiUrl}${url}`,
    });
  },
  post: (url, body, onUploadProgress) => {
    if (onUploadProgress) {
      return axios({
        method: `post`,
        url: `${apiUrl}${url}`,
        data: body,
        onUploadProgress,
      });
    }
    return axios({
      method: `post`,
      url: `${apiUrl}${url}`,
      data: body,
    });
  },
  delete: (url, body = false) => {
    if (body) {
      return axios.delete({
        method: "delete",
        url: `${apiUrl}${url}`,
        data: body,
      });
    }
    return axios.delete({
      method: "delete",
      url: `${apiUrl}${url}`,
    });
  },
  put: (url, body) => {
    return axios.put({
      method: "put",
      url: `${apiUrl}${url}`,
      data: body,
    });
  },
};

const UserRequest = {
  getUser: () => requests.get("/datas"),
  searchDatas: (body) => requests.post("/", body),
  getZooms: () => requests.get("/zooms"),
};

export { UserRequest };
