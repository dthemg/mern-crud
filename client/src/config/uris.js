var baseURI = "http://localhost:9000/"
var todoURI = baseURI + "todos/";
var userURI = baseURI + "users/"

module.exports = {
  getAll: todoURI + "getAll/",
  delete: todoURI + "delete/",
  getOne: todoURI + "getOne/",
  update: todoURI + "update/",
  login: userURI + "login/",
  register: userURI + "register/"
}