import SGN from '../../sgn'
import { error } from '../../util'

export default (options = {}, callback, progressCallback) ->
    throw new Error('File is not defined') if not options.file?

    url = SGN.config.get 'assetsFileUploadUrl'
    timeout = 1000 * 60 * 60
    formData = new FormData()
    http = new XMLHttpRequest()

    formData.append 'file', options.file

    http.onload = ->
        if http.status is 200
            callback null, JSON.parse(http.response)
        else
            callback error(new Error('Request error'),
                code: 'RequestError'
                statusCode: data.statusCode
            )
        
        return
    http.upload.onprogress = (e) ->
        if typeof progressCallback is 'function' and e.lengthComputable
            progressCallback
                progress: e.loaded / e.total
                loaded: e.loaded
                total: e.total
        
        return
    http.open 'post', url
    http.timeout = timeout
    http.setRequestHeader 'Accept', 'application/json'
    http.send formData

    return