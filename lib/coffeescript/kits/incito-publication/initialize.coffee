util = require '../../util'
SGN = require '../../core'

# Snap width depending on device category.
getWidth = (deviceCategory, availWidth) ->
    width = availWidth

    if deviceCategory is 'mobile'
        width = Math.min width, 375
    else if deviceCategory is 'tablet'
        width = Math.min width, 768
    else
        width = Math.min width, 1200
    
    width

fetch = (variables, callback) ->
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
        variables: variables
    , callback

    return

module.exports = (options = {}, callback) ->
    deviceCategory = util.getDeviceCategory()
    pointer = util.getDeviceCategory()
    orientation = util.getOrientation window.offsetWidth, window.offsetHeight
    orientation = 'horizontal' if orientation is 'quadratic'
    width = getWidth deviceCategory, options.el.offsetWidth

    fetch({
        id: options.id
        deviceCategory: deviceCategory
        pointer: pointer
        width: width
    }, (err, data) ->
        console.log err, data

        return

    return