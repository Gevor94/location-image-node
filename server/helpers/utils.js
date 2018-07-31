'use strict';

const handleResponse = res => {
    return (error, result, status = 200) => {
        if (error instanceof Error) {
            status = error.status || 400;
            error = error.message;
        }
        return res.status(status).json({status, result, error});
    };
};

module.exports = {
    handleResponse
};