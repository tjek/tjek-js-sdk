util = require '../../util'
SGN = require '../../core'

module.exports = (options = {}, callback) ->
    deviceCategory = util.getDeviceCategory()
    pointer = util.getDeviceCategory()
    width = options.el.offsetWidth
    orientation = util.getOrientation window.offsetWidth, window.offsetHeight
    orientation = 'horizontal' if orientation is 'quadratic'

    # Snap width depending on device category.
    if deviceCategory is 'mobile'
        width = Math.min width, 375
    else if deviceCategory is 'tablet'
        width = Math.min width, 768
    else
        width = Math.min width, 1200

    SGN.GraphKit.request
        query: """
            query GetIncitoPublication($id: ID!, $deviceCategory: DeviceCategory!, $pointer: Pointer!, $width: Int!) {
                node(id: $ID) {
                    ... on IncitoPublication {
                        id
                        incito(deviceCategory: $deviceCategory, pointer: $pointer, width: $width)
                    }
                }
            }
        """
        operationName: 'GetIncitoPublication'
        variables:
            id: options.id
            deviceCategory: deviceCategory
            pointer: pointer
            width: width
    , (err, data) ->
        console.log err, data

        return

    return