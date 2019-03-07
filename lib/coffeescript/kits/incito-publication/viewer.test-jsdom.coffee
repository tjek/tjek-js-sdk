Viewer = require('./viewer')

dummyIncito = {
    "version": "1.0.0",
    "root_view": {},
    "id": "d1b667mmocp"
}

describe 'SGN.IncitoPublicationKit.Viewer', ->
    test 'Track opened', ->
        fakeEventTracker =
            trackIncitoPublicationOpened: jest.fn(->)
            createViewToken: jest.fn((a) -> a)

        mountPoint = document.createElement("div")

        viewer = new Viewer mountPoint,
            id: 'incito-id'
            pagedPublicationId: 'paged-id'
            incito: dummyIncito
            eventTracker: fakeEventTracker


        viewer.start()

        expect(fakeEventTracker.createViewToken.mock.calls.length).toBe(2)
        expect(fakeEventTracker.trackIncitoPublicationOpened.mock.calls.length).toBe(1)

        return
