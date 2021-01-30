const express = require("express");
const app = express();
const Controller = require("./validator/controller");

module.exports = async function () {
  app.use(express.json());

  app.get("/", async (req, res) => {
    const { status, result } = await Controller.getAuthor();
    return res.status(status).json(result);
  });

  app.post("/validate-rule", async (req, res) => {
    //const { status, result } =
    const result = await Controller.validateData(req.body);
    console.log(result);
    //res.status(status).json(result);
  });

  app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status == 400 && "body" in err) {
      return res.status(400).json({
        message: "Invalid JSON payload passed.",
        status: "error",
        data: "null",
      });
    }
    return next();
  });

  app.use((req, res) => {
    return res.status(404).json({ message: "resource not found" });
  });

  return app;
};
