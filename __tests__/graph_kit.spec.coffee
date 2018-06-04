SGN = require '../dist/sgn-sdk.js'

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

test 'Making a request, promises async/await style', ->
    data = await SGN.GraphKit.request
        query: """query PlanningSuggestions {
          planningSuggestions(locale: "da_DK", term: "c") {
            phrases {
              name
            }
          }
        }
        """,
        operationName: 'PlanningSuggestions'
    expect(data).toBeDefined()
