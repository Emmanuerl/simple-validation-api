const { formatResponse } = require("./utils");
const Validator = require("./Validator");

class Controller {
  static async getAuthor() {
    // hard coded details of the author
    const author = {
      name: "Emeka Chukwurah",
      github: "@emmanuerl",
      email: "emekaemmanuel045@gmail.com",
      mobile: "09090527304",
      twitter: "@chukwurah__",
    };

    return formatResponse(200, "My Rule-Validation API", author);
  }

  static async validateData(payload) {
    try {
      const validator = Validator(payload);
      const result = await validator.validate();
      return result;
    } catch (err) {
      return formatResponse(400, err.message, null);
    }
  }
}

module.exports = Controller;
