const { constants } = require("../constant");



const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.VALIDATION: {
            res.json({ title: "Validation Failed", message: err.message, strackTrace: err.stack });
        }
        case constants.NOT_FOUND: {
            res.json({ title: "Not Found", message: err.message, strackTrace: err.stack });
        }
        case constants.NO_RESPONSE: {
            res.json({ title: "No Response From  Server", message: err.message, strackTrace: err.stack });
        }
        case constants.UNAUTHORIZED: {
            res.json({ title: "No verify, unauthorized", message: err.message, strackTrace: err.stack });
        }
        case constants.FORBIDDEN: {
            res.json({ title: "Forbidden error", message: err.message, strackTrace: err.stack });
        }
        default: {
            res.json({ title: "All Good, all clear", message: err.message, strackTrace: err.stack });
        }
    }
};

module.exports = errorHandler;  