import SGN from './sdk'

describe 'SGN.EventsKit', ->
    test 'Can create a view token', ->
        tracker = new SGN.EventsKit.Tracker
            trackId: 'AAABrQ=='
            client:
                id: 'selfmade'

        expect(tracker.createViewToken('test', 1)).toEqual '29g0Lh6ViFc='
        expect(tracker.createViewToken('go', 'go', 2, 'nice', 'øl')).toEqual 'nAu6OWTIWnc='
        expect(tracker.createViewToken('🌈')).toEqual 'Pdz8/0+PiYk='

        return
    
    test 'Can dispatch', ->
        id = '3395WdY'
        tracker = new SGN.EventsKit.Tracker trackId: 'AAABrQ=='

        tracker.trackPagedPublicationOpened
            'pp.id': id
            'vt': tracker.createViewToken id
        # tracker.ship tracker.getPool(), (err, res) ->
        #     expect(res).toBeDefined()
        #     expect(res.events.length).toEqual 1
        #     expect(res.events[0].status).toEqual 'ack'

        #     done()

        #     return

        return

    return