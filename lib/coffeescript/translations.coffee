Mustache = require 'mustache'
pairs =
    'paged_publication.hotspot_picker.header': 'Which offer did you mean?'

module.exports =
    t: (key, view) ->
        template = pairs[key] ? ''

        Mustache.render template, view

    update: (translations) ->
        for key, value of translations
            pairs[key] = value

        return
