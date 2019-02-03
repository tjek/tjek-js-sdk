import Mustache from 'mustache'

pairs =
    'paged_publication.hotspot_picker.header': 'Which offer did you mean?'
    'incito_publication.product_picker.header': 'Which product?'

export t = (key, view) ->
    template = pairs[key] ? ''

    Mustache.render template, view

export update = (translations) ->
    for key, value of translations
        pairs[key] = value

    return
