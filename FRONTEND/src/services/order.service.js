import createApiClient from "./api.service";

class OrderService {
    constructor(baseUrl = "/api/order") {
        this.api = createApiClient(baseUrl);
    }
    async addToOrder(data) {
        return (await this.api.post("/", data)).data;
    }
    async all() {
        return (await this.api.get("/")).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async getUserOrders(id) {
        return (await this.api.get(`/customer/${id}`)).data;
    }
    async updateOrderStatus(id,data) {
        return (await this.api.patch(`/${id}`,data)).data;
    }
}

export default new OrderService;