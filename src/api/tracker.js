import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

const instance = axios.create({
  baseURL: "https://cc91-199-195-149-164.ngrok-free.app",
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("successfully saved track POST");
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
// export default axios.create({
//   baseURL: "https://8932-199-195-149-164.ngrok-free.app",
// });
