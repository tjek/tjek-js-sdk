import {V2Catalog} from '../core';
import Viewer from './viewer';

const dummyIncito = {
    version: '1.0.0',
    root_view: {},
    id: 'd1b667mmocp'
} as const;

describe('SGN.IncitoPublicationKit.Viewer', () => {
    test('Tracks Incito Publication Opened', () => {
        const fakeEventTracker = {
            trackIncitoPublicationOpened: jest.fn(() => {}),
            createViewToken: jest.fn((a) => a + '-vt')
        };

        const mountPoint = document.createElement('div');

        const viewer = new Viewer(
            mountPoint,
            {
                details: {
                    id: 'incito-id',
                    types: ['paged', 'incito']
                } as V2Catalog,
                incito: dummyIncito,
                eventTracker: fakeEventTracker as any
            },
            ''
        );

        viewer.start();

        expect(
            fakeEventTracker.trackIncitoPublicationOpened.mock.calls.length
        ).toBe(1);
        expect(
            (fakeEventTracker as any).trackIncitoPublicationOpened.mock
                .calls[0][0]
        ).toEqual({
            'ip.id': 'incito-id',
            'ip.paged': true,
            vt: 'incito-id-vt'
        });
    });
});
