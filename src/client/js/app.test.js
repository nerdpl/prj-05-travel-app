const fetch = require('node-fetch')

const geoURL1 = 'http://api.geonames.org/postalCodeSearchJSON?placename='
const geoURL2 = '&username=demo'
const location = ''

describe('Test API', () => {
    it('Geonames', async done => {
        const response = await fetch(geoURL1 + location + geoURL2)
        expect(response.status).toBe(200)
        done()
    })
})