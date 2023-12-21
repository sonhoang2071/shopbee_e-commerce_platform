const { StatusCodes, MessageCodes } = require("./httpCode");

class SuccessResponse {
    constructor({ message, statusCode, messageCode, metadata = {} }) {
        this.message = message;
        this.status = statusCode;
        this.metadata = metadata;
    }
    send(res, headers = {}) {
        return res.status(this.status).json(this);
    }
}
class OkRequestSuccess extends SuccessResponse {
    constructor({
        message,
        statusCode = StatusCodes.OK,
        messageCode = MessageCodes.OK,
        metadata,
    }) {
        super({ message, statusCode, messageCode, metadata });
    }
}
class CreatedRequestSuccess extends SuccessResponse {
    constructor({
        message,
        statusCode = StatusCodes.CREATED,
        messageCode = MessageCodes.CREATED,
        metadata,
    }) {
        super({ message, statusCode, messageCode, metadata });
    }
}
module.exports = {
    OkRequestSuccess,
    CreatedRequestSuccess,
};
