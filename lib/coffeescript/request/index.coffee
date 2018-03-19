module.exports = require('./browser')
###
SGN = require '../sgn'
axios = require 'axios'
NodeFormData = require 'form-data'
module.exports = (options = {}, callback, progressCallback) ->
    if options.formData?
        formData = if typeof FormData != 'undefined' then new FormData() else new NodeFormData()
        formData = new NodeFormData()
        formData = new FormData()
        console.log options.formData
        for key, value of options.formData
            formData.append key, value
        console.log Object.entries formData
        console.log formData.entries()
    
    requestOptions =
        method: options.method or 'get'
        url: options.url
        headers: options.headers
        timeout: options.timeout
        responseType: if options.json then 'json' else 'text'
        data: options.body
        formData: formData if options.formData
        forever: true
        params: options.qs
        withCredentials: options.useCookies
        onUploadProgress: progressCallback || ->
        onDownloadProgress: progressCallback || ->
    
    if Array.isArray options.cookies
        jar = request.jar()

        options.cookies.forEach (cookie) ->
            jar.setCookie request.cookie("#{cookie.key}=#{cookie.value}"), cookie.url

            return

        requestOptions.jar = jar

    axios(requestOptions).then((response) ->
        callback null,
            statusCode: response.status
            headers: response.headers
            body: if typeof response.data == 'object' && !options.json then JSON.stringify(response.data)
                    else response.data
    ).catch((error) ->
        callback error
    )

    return
###
