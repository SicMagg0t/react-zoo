import http from "../http-common";

class AnimalDataService {
  getAll() {
    return http.get("/animals");
  }

  get(id) {
    return http.get(`/animals/${id}`);
  }

  create(data) {
    return http.post("/animals", data);
  }

  update(id, data) {
    return http.put(`/animals/${id}`, data);
  }

  delete(id) {
    return http.delete(`/animals/${id}`);
  }

  deleteAll() {
    return http.delete(`/animals`);
  }

  findByTitle(title) {
    return http.get(`/animals?title=${title}`);
  }
}

export default new AnimalDataService();