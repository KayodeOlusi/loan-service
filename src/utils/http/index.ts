import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";

const headers = {
  "Content-Type": "application/json",
} as AxiosRequestHeaders;

const Axios = axios.create({
  timeout: 10000,
  headers,
});

export const responseBody = (response: AxiosResponse) => response.data;

class HttpClient {
  get<T>(
    url: string,
    query?: Record<string, string | number>,
  ): Promise<T> {
    return Axios.get(url, { params: query }).then(responseBody);
  }

  post<T>(url: string, endpoint: string, body: any): Promise<T> {
    return Axios.post(url, body).then(responseBody);
  }

  put<T>(url: string, endpoint: string, body: any): Promise<T> {
    return Axios.put(url, body).then(responseBody);
  }

  delete<T>(url: string): Promise<T> {
    return Axios.delete(url).then(responseBody);
  }

  getWithToken<T>(
    url: string,
    token: string,
    params?: Record<string, string | number>,
  ): Promise<T> {
    return Axios
      .get(url, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(responseBody);
  }

  postWithToken<T>(
    url: string,
    token: string,
    body: any,
    params?: Record<string, string | number>,
  ): Promise<T> {
    return Axios
      .post(url, body, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(responseBody);
  }
}

const http = new HttpClient();
export default http;