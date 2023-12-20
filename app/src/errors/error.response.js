const { StatusCodes, MessageCodes } = require("./httpCode");

class ErrorResponse extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
class BadRequestError extends ErrorResponse {
    constructor(
        message = MessageCodes.BAD_REQUEST,
        statusCode = StatusCodes.BAD_REQUEST
    ) {
        super(message, statusCode);
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(
        message = MessageCodes.CONFLICT,
        statusCode = StatusCodes.CONFLICT
    ) {
        super(message, statusCode);
    }
}
class ForbiddenRequestError extends ErrorResponse {
    constructor(
        message = ReasonCodes.FORBIDDEN,
        statusCode = StatusCodes.FORBIDDEN
    ) {
        super(message, statusCode);
    }
}
class UnauthorizedRequestError extends ErrorResponse {
    constructor(
        message = ReasonCodes.UNAUTHORIZED,
        statusCode = StatusCodes.UNAUTHORIZED
    ) {
        super(message, statusCode);
    }
}
class NotFoundRequestError extends ErrorResponse {
    constructor(
        message = ReasonCodes.NOT_FOUND,
        statusCode = StatusCodes.NOT_FOUND
    ) {
        super(message, statusCode);
    }
}

module.exports = {
    ConflictRequestError,
    ForbiddenRequestError,
    UnauthorizedRequestError,
    NotFoundRequestError,
    BadRequestError,
};
