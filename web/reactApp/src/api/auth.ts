import { AxiosInstance } from "axios";

export default class AuthAPI {
    client: AxiosInstance;
    constructor(client: AxiosInstance) {
        this.client = client
    }

    async register(username: string, email: string, password: string) {
        try {
            const rsp = await this.client.post("/api/users/", { "user": { username, email, password } })
            if (rsp.status !== 201) {
                throw new Error("expect http 201")
            }
            localStorage.setItem("jwt", rsp.data.user.token);
            return true
        } catch (error) {
            return false
        }
    }

    async login(email: string, password: string): Promise<boolean> {
        try {
            const rsp = await this.client.post("/api/users/login", { "user": { email, password } })
            if (rsp.status !== 201) {
                throw new Error("expect http 200")
            }
            localStorage.setItem("jwt", rsp.data.user.token);
            return true
        } catch (error) {
            return false
        }
    }

    logout() {
        localStorage.removeItem("jwt");
    }
}