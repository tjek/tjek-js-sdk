SGN = require '../lib/coffeescript/node'

test 'Making a request in node.js', (done) ->
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
