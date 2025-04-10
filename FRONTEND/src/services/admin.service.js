import createApiClient from "./api.service";

class AdminService {
    constructor(baseUrl = "/api/admin") {
        this.api = createApiClient(baseUrl);
    }
    async signUp(data) {
        return (await this.api.post("/signup", data)).data;
    }
    async signIn(data) {
        return (await this.api.post("/signin", data)).data;
    }
    async signOut() {
        return (await this.api.post("/signout")).data;
    }
    async findAll() {
        return (await this.api.get("/employee")).data;
    }
    async update(id, data) {
        return (await this.api.patch(`/${id}`, data)).data;
    }
}

export default new AdminService;