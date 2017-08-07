SGN = require '../sgn'

module.exports =
    key: 'sgn-'

    get: (key) ->
        return if SGN.util.isNode()

        try
            name = "#{@key}#{key}="
            ca = document.cookie.split ';'

            for c in ca
                ct = c.trim()

                value = ct.substring(name.length, ct.length) if ct.indexOf(name) is 0

            value = JSON.parse value
        catch err
            value = {}

        value

    set: (key, value) ->
        return if SGN.util.isNode()

        try
            days = 365
            date = new Date()
            str = JSON.stringify value

            date.setTime date.getTime() + days * 24 * 60 * 60 * 1000

            document.cookie = "#{@key}#{key}=#{str};expires=#{date.toUTCString()};path=/"
        catch err

        return


