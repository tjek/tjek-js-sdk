SGN = require '../lib/coffeescript/browser'

test 'Making a request', (done) ->
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
        expect(data).toBeDefined()
        
        done()
        
        return

    return
