exports.formatResponse = function (statusCode, message, data) {
  return {
    status: statusCode,
    result: {
      message,
      status: statusCode == 200 ? "success" : "error",
      data,
    },
  };
};
