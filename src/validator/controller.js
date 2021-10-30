const { formatResponse } = require("./utils");
const Validator = require("./Validator");
require('dotenv').config(); // connects local .env file variables to process.env command

class Controller {
  static async getAuthor() {
    // dotenv referenced details of the author using process.env.VARIABLE_NAME
    // this is much more secure than hard coding details
    const author = {
      name: process.env.MY_NAME,
      github: process.env.MY_GITHUB,
      email: process.env.MY_EMAIL,
      mobile: process.env.MY_MOBILE_NUMBER,
      twitter: process.env.MY_TWITTER,
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
