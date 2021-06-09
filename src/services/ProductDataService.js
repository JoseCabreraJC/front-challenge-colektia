import http from "../http-common";

class ProductDataService {
  getAll() {
    return http.get("/productos");
  }

  get(id) {
    return http.get(`/productos/${id}`);
  }

  create(data) {
    return http.post("/productos", data);
  }

  update(id, data) {
    return http.put(`/productos/${id}`, data);
  }

  delete(id) {
    return http.delete(`/productos/${id}`);
  }

  findByName(name) {
    return http.get(`/productos?nombre=${name}`);
  }
}

export default new ProductDataService();
