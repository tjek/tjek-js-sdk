SGN = require './sdk'

describe 'SGN.GraphKit', ->
    test 'Making a request', ->
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

        return
    
    return