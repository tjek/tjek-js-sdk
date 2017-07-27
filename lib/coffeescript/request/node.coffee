SGN = require '../sgn'
request = require 'request'

module.exports = (options = {}, callback) ->
    requestOptions =
        method: options.method
        url: options.url
        headers: options.headers
        timeout: options.timeout
        json: options.json
        body: options.body
        formData: options.formData
        qs: options.qs

    if Array.isArray options.cookies
        jar = request.jar()

        options.cookies.forEach (cookie) ->
            jar.setCookie request.cookie("#{cookie.key}=#{cookie.value}"), cookie.url

            return

        requestOptions.jar = jar

    request requestOptions, (err, response, body) ->
        if err?
            callback new Error()
        else
            callback null,
                statusCode: response.statusCode
                headers: response.headers
                body: body

        return

    return
