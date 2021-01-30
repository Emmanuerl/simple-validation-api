const http = require("http");
const loadApi = require("./api");

loadApi().then(initializeApp);

function initializeApp(app) {
  http
    .createServer(app)
    .listen("4000", () => console.log("server listening on port 4000"));
}
