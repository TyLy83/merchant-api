import HttpError from "./interfaces/http.error.interface";

export class BadRequestError extends HttpError {

    constructor(message?: string) {
        super(400, message || "Bad Request");
    }

    // constructor(message?: string);

    // constructor(message?: string, public messages?: string[]) {
    //     super(400, message || "Bad Request");
    // }

}

export class ForbiddenError extends HttpError {

    constructor(message?: string) {
        super(403, message || "Forbidden");
    }

}

export class NotFoundError extends HttpError {

    constructor(message?: string) {
        super(404, message || "Not Found");
    }

}

export class UnauthorizedError extends HttpError {

    constructor(message?: string) {
        super(401, message || "Unauthorized");
    }

}