util =
    isBrowser: ->
        typeof window == 'object' and typeof document == 'object'

    isNode: ->
        typeof process == 'object'

    error: (err, options) ->
        err.message = err.message or null

        if typeof options is 'string'
            err.message = options
        else if typeof options is 'object' and options?
            for key, value of options
                err[key] = value

            err.message = options.message if options.message?
            err.code = options.code or options.name if options.code? or options.message?
            err.stack = options.stack if options.stack?

        err.name = options and options.name or err.name or err.code or 'Error'
        err.time = new Date()

        err

    uuid: ->
        'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace /[xy]/g, (c) ->
            r = Math.random() * 16 | 0
            v = if c is 'x' then r else (r & 0x3|0x8)

            v.toString 16

    getQueryParam: (field, url) ->
        href = if url then url else window.location.href
        reg = new RegExp '[?&]' + field + '=([^&#]*)', 'i'
        string = reg.exec href

        if string then string[1] else undefined

    formatQueryParams: (queryParams = {}) ->
        Object
            .keys queryParams
            .map (key) -> key + '=' + encodeURIComponent(queryParams[key])
            .join '&'

    getRandomNumberBetween: (from, to) ->
        Math.floor(Math.random() * to) + from

    getOS: ->
        name = null
        ua = window.navigator.userAgent

        if ua.indexOf('Windows') > -1
            name = 'Windows'
        else if ua.indexOf('Mac') > -1
            name = 'macOS'
        else if ua.indexOf('X11') > -1
            name = 'unix'
        else if ua.indexOf('Linux') > -1
            name = 'Linux'
        else if ua.indexOf('iOS') > -1
            name = 'iOS'
        else if ua.indexOf('Android') > -1
            name = 'Android'

        name
    
    getDeviceCategory: ->
        deviceCategory = 'desktop'

        if navigator.platform is 'iPod' or navigator.platform is 'iPhone'
            deviceCategory = 'mobile'
        else if navigator.platform is 'iPad'
            deviceCategory = 'tablet'
        else if navigator.platform is 'Android' or /android/gi.test(navigator.userAgent)
            if /tablet/gi.test(navigator.userAgent)
                deviceCategory = 'tablet'
            else
                deviceCategory = 'mobile'

        deviceCategory
    
    getPointer: ->
        pointer = 'fine'

        pointer = 'coarse' if matchMedia('(pointer:coarse)').matches

        pointer
    
    getOrientation: (width, height) ->
        if width is height
            'quadratic'
        else if width > height
            'horizontal'
        else
            'vertical'

    getScreenDimensions: ->
        density = window.devicePixelRatio ? 1
        logical =
            width: window.screen.width
            height: window.screen.height
        physical =
            width: Math.round logical.width * density
            height: Math.round logical.height * density

        density: density
        logical: logical
        physical: physical

    getUtcOffsetSeconds: ->
        now = new Date()
        jan1 = new Date now.getFullYear(), 0, 1, 0, 0, 0, 0
        tmp = jan1.toGMTString()
        jan2 = new Date tmp.substring(0, tmp.lastIndexOf(' ') - 1)
        stdTimeOffset = (jan1 - jan2) / 1000

        stdTimeOffset

    getUtcDstOffsetSeconds: ->
        new Date().getTimezoneOffset() * 60 * -1

    getColorBrightness: (color) ->
        color = color.replace '#', ''
        hex = parseInt (hex + '').replace(/[^a-f0-9]/gi, ''), 16
        rgb = []
        sum = 0
        x = 0

        while x < 3
            s = parseInt(color.substring(2 * x, 2), 16)
            rgb[x] = s

            sum += s if s > 0

            ++x

        if sum <= 381 then 'dark' else 'light'

    btoa: (str) ->
        if util.isBrowser()
            btoa str
        else
            buffer = null

            if str instanceof Buffer
                buffer = str
            else
                buffer = new Buffer str.toString(), 'binary'

            buffer.toString 'base64'

    chunk: (arr, size) ->
        results = []

        while arr.length
            results.push arr.splice(0, size)

        results

    throttle: (fn, threshold = 250, scope) ->
        last = undefined
        deferTimer = undefined

        ->
            context = scope or @
            now = new Date().getTime()
            args = arguments

            if last and now < last + threshold
                clearTimeout deferTimer

                deferTimer = setTimeout ->
                    last = now
                    
                    fn.apply context, args
                
                    return
                , threshold
            else
                last = now
                fn.apply context, args

            return

    loadImage: (src, callback) ->
        img = new Image()

        img.onload = -> callback null, img.width, img.height
        img.onerror = -> callback new Error()
        img.src = src

        img

    distance: (lat1, lng1, lat2, lng2) ->
        radlat1 = Math.PI * lat1 / 180
        radlat2 = Math.PI * lat2 / 180
        theta = lng1 - lng2
        radtheta = Math.PI * theta / 180
        dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
        dist = Math.acos(dist)
        dist = dist * 180 / Math.PI
        dist = dist * 60 * 1.1515
        dist = dist * 1.609344 * 1000

        dist

    async:
        parallel: (asyncCalls, sharedCallback) ->
            counter = asyncCalls.length
            allResults = []
            k = 0

            makeCallback = (index) ->
                ->
                    results = []
                    i = 0

                    counter--

                    while i < arguments.length
                        results.push arguments[i]
                        i++

                    allResults[index] = results

                    sharedCallback allResults if counter is 0

                    return

            while k < asyncCalls.length
                asyncCalls[k] makeCallback(k)
                k++

            return
    # Method for wrapping a function that takes a callback in any position
    # to return promises if no callback is given in a call.
    # The second argument, cbParameterIndex, is the position of the callback in the original functions parameter list.
    # CoffeeScript optional parameters messes with this function arity detection,
    # not sure what to do about that, other than always setting cbParameterIndex at callsites.
    promiseCallbackInterop: (fun, cbParameterIndex = fun.length - 1) ->
        # This is the function that actually wraps and calls a method to return a promise.
        makePromise = (fun, cbParameterIndex, parameters) ->
            new Promise(
                (resolve, reject) ->
                    neoCallback = (error, result) ->
                        if error then reject error else resolve result

                    callParameters = []
                    for i in [0...(Math.max(parameters.length, cbParameterIndex) + 1)]
                        callParameters.push if i == cbParameterIndex then neoCallback else parameters[i]

                    fun.apply this, callParameters
            )
        # Wrapper function that decides what to do per-call.
        (...parameters) ->
            if typeof parameters[cbParameterIndex] == 'function'
                # Callback given, do a regular old call.
                fun.apply null, parameters
            else if typeof Promise == 'function'
                # No callback given, and we have promise support, use makePromise to wrap the call.
                makePromise fun, cbParameterIndex, parameters
            else
                # Ain't got callback, ain't got promise support; we gotta tell the developer.
                throw new Error("""To be able to use this asynchronous method you should:

Supply a callback function as argument ##{1+cbParameterIndex}.
This callback function will be called with the method call response.

Alternatively, when supported, it can return a Promise if no callback function is given.
                """)

module.exports = util
