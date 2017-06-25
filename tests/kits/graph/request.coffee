SGN = require '../../../index'

SGN.config.set
    appKey: 'anonymous'

SGN.GraphKit.request
    query: """query PlanningSuggestions {
      planningSuggestions(locale: "da_DK", term: "c") {
        phrases {
          name
        }
      }
    }
    """,
    operationName: 'PlanningSuggestions'
, (err, data) ->
    console.log err, data

    return
