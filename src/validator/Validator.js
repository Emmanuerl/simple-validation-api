class Validator {
  constructor(payload) {
    this.rule = payload.rule;
    this.data = payload.data;
    this.options = ["eq", "neq", "gte", "gt", "contains"];
    this.nestingLimit = 2;
  }

  async validate() {
    // check if the rule and data fields are present and are of the correct data types
    if (!this.rule) throw this.generateErrorResponse("rule is required.");

    if (!this.data) throw this.generateErrorResponse("data is required.");

    if (typeof this.rule !== "object")
      throw this.generateErrorResponse("rule must be an object.");

    if (typeof this.data !== "object")
      throw this.generateErrorResponse("data must be an object.");

    // validate inner contents of the objects
    const { field, condition, condition_value } = this.rule;
    if (!field || !condition || !condition_value)
      throw this.generateErrorResponse("invalid JSON payload passed");

    // parse field to check for nested schema validation
    const fields = field.split(".");
    if (fields.length > this.nestingLimit)
      throw this.generateErrorResponse("nesting limit exceeded.");

    // check if the value is present by traversing the object from the data level
    let value = { ...this.data },
      level = "";

    for (const field of fields) {
      level += level.length == 0 ? `${field}` : `.${field}`;
      if (Object.hasOwnProperty.call(value, field)) {
        value = value[field];
      } else {
        throw this.generateErrorResponse(`field ${level} is missing from data`);
      }
    }

    // check option
    let option = this.options.find((option) => option == condition);
    if (!option) {
      throw this.generateErrorResponse(`invalid condition ${condition}.`);
    }

    // validate argument against expected value
    return this[option](value, condition_value);
  }

  generateErrorResponse(message) {
    return new Error(message);
  }

  eq(argument, condition_value) {
    return argument == condition_value;
  }

  neq(argument, condition_value) {
    return argument != condition_value;
  }

  gte(argument, condition_value) {
    return argument >= condition_value;
  }

  gt(argument, condition_value) {
    return argument > condition_value;
  }

  contains(argument, condition_value) {
    if (!Array.isArray(argument))
      throw this.generateErrorResponse("invalid JSON payload passed.");
    return condition_value in argument;
  }
}

module.exports = (constraints) => new Validator(constraints);
