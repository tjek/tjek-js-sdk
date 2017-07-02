SGN_NODE = require '../lib/coffeescript/node'
SGN_BROWSER = require '../lib/coffeescript/browser'

test 'Making a request in node.js', (done) ->
    SGN_NODE.GraphKit.request
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

test 'Making a request in browser', (done) ->
    SGN_BROWSER.GraphKit.request
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
