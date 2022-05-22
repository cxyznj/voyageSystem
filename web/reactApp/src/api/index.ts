import axios, { AxiosInstance } from "axios";
import AuthAPI from "./auth";
import UserFlightAPI from "./userFlight";
import FlightrouteAPI from "./flightroute";

class VoyagerAPI {
  client: AxiosInstance
  private authInstance
  private flightRouteInstance
  private userFlightInstance

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL: baseURL,
    })

    this.client.interceptors.request.use(
      (config) => {
        if (!config.url?.startsWith("/api/users")) {
          const token = localStorage.getItem('jwt');
          if (token) {
            config.headers = { "Authorization": 'Bearer ' + token }
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    this.authInstance = new AuthAPI(this.client)
    this.flightRouteInstance = new FlightrouteAPI(this.client)
    this.userFlightInstance = new UserFlightAPI(this.client)
  }

  auth(): AuthAPI {
    return this.authInstance
  }

  flightroute(): FlightrouteAPI {
    return this.flightRouteInstance
  }

  userFlight(): UserFlightAPI {
    return this.userFlightInstance
  }
}

const BASE_URL = "/"
const DEV_BASE_URL = "http://127.0.0.1:8000/"
const api = new VoyagerAPI(BASE_URL)

export default api;
export const PAGINATION_COUNT = 10;