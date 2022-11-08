import axios, { AxiosRequestConfig, Axios } from "axios";

export class HttpUtil {
  private static axiosInstance: Axios;

  private static getInstance(): Axios {
    if (!this.axiosInstance) {
      this.axiosInstance = axios.create({
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      this.axiosInstance.interceptors.response.use(
        (response) => response.data,
        (error) => Promise.reject(error.response.data)
      );
    }

    return this.axiosInstance;
  }

  static get<Response, Config extends AxiosRequestConfig>(
    url: string,
    config?: Config
  ): Promise<Response> {
    return this.getInstance().get(url, config);
  }

  static post<Response, Config extends AxiosRequestConfig>(
    url: string,
    config?: Config
  ): Promise<Response> {
    return this.getInstance().post(url, config?.data, config);
  }

  static put<Response, Config extends AxiosRequestConfig>(
    url: string,
    config?: Config
  ): Promise<Response> {
    return this.getInstance().put(url, config?.data, config);
  }

  static patch<Response, Config extends AxiosRequestConfig>(
    url: string,
    config?: Config
  ): Promise<Response> {
    return this.getInstance().patch(url, config?.data, config);
  }

  static delete<Response, Config extends AxiosRequestConfig>(
    url: string,
    config?: Config
  ): Promise<Response> {
    return this.getInstance().delete(url, config);
  }
}
