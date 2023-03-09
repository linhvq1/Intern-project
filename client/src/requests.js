import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:4000";

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
      return axios({
        method: "delete",
        url: `${apiUrl}${url}`,
        data: body,
      });
    }
    return axios({
      method: "delete",
      url: `${apiUrl}${url}`,
    });
  },
  put: (url, body) => {
    return axios({
      method: "put",
      url: `${apiUrl}${url}`,
      data: body,
    });
  },
};

const UserRequest = {
  getScheduleList: () => requests.get("/datas"),
  searchScheduleList: (body) => requests.post("/searchSchedule", body),
  getZooms: () => requests.get("/zooms"),
  searchRoom: (body) => requests.post("/zooms", body),
  updateSchedule: (id, body) => requests.put(`/updateSchedule/${id}`, body),
  createSchedule: (body) => requests.post(`/schedule`, body),
  deleteSchedule: (id) => requests.delete(`/schedule/${id}`),
};

export { UserRequest };
