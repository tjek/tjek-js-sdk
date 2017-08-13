Mustache = require 'mustache'

module.exports =
    t: (key, view) ->
        Mustache.render @translations[key], view

    addTranslations: (translations) ->
        for key, value of translations
            @translations[key] = value

        return

    translations:
        'paged_publication.hotspot_picker.header': 'Which offer did you mean?'
