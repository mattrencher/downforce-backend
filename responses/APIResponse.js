const base_response = {
    "application" : process.env.APPLICATION_NAME,
    "api_version": process.env.API_VERSION,
    "response_time" : Date.now()
}

exports.success = (message) => {
    return {
        ...base_response,
        "is_complete" : true,
        "message" : message
    }
}

exports.successWithPagination = (data, page, per_page) => {
    return {
        ...base_response,
        "is_complete" : true,
        "per_page" : parseInt(per_page),
        "page" : parseInt(page),
        "data" : data
    }
}

exports.successWithData = (data) => {
    return {
        ...base_response,
        "is_complete" : true,
        "data" : data
    }
}

exports.validationFailed = (errors) => {
    return {
        ...base_response,
        "is_complete" : false,
        "errors" : errors
    }
}

exports.badRequest = (message) =>{
    return {
        ...base_response,
        "is_complete" : false,
        "message" : message
    }
}

exports.authorizationFailed = () => {
    return {
        ...base_response,
        "is_complete" : false,
        "message" : [{error_code: "INVALID_AUTHORIZATION"}]
    }
}

exports.error = (message, is_debug = false) => {
    if (is_debug === "true") {
        return {
            ...base_response,
            "is_complete" : false,
            "debug_message" : [message]
        }
    }else {
        return {
            ...base_response,
            "is_complete" : false,
            "debug_message" : ["SOMETHING WENT WRONG"],
        }
    }
}

exports.notFound = () => {
    return {
        ...base_response,
        "is_complete" : false,
        "message" : ["NOT FOUND"]
    }
}