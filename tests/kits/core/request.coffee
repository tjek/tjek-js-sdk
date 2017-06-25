SGN = require '../../../index'

SGN.config.set
    appKey: '00j486xcipwzk2rmcbzfalpk4sgx9v3i'
    appSecret: '00j486xcipwg451xiucovj60t2buq5f6'

SGN.CoreKit.request
    url: '/v2/catalogs'
, (err, data) ->
    console.log err, data

    return
