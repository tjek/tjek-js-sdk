SGN = require '../dist/sgn-sdk.js'

describe 'SGN.EventsKit', ->
    test 'can create a view token', ->
        tracker = new SGN.EventsKit.Tracker trackId: 'test'

        SGN.client.id = 'selfmade'

        expect(tracker.createViewToken('test', 1)).toEqual '29g0Lh6ViFc='
        expect(tracker.createViewToken('go', 'go', 2, 'nice', 'øl')).toEqual 'nAu6OWTIWnc='

        return
    
    return