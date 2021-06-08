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

  //   deleteAll() {
  //     return http.delete(`/productos`);
  //   }

  findByName(title) {
    return http.get(`/productos?nombre=${title}`);
  }
}

export default new ProductDataService();
