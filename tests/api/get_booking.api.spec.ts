import { test, expect } from '../../base/pomFixture';
import apiConst from '../../data/apiData.json'

const baseURL = process.env.API_BASE_URL

test.describe("Get Booking Details via API", {
  tag: ['@api'],
}, async () => {

  test('GET with correct input should send a reponse of 200', async ({ request }) => {
    // Creat the booking first then get the ID
    const response = await request.post(baseURL, {
      data: apiConst.newBooking
    })
    const body = await response.json()
    const bookingID = body.bookingid

    // Actual Get Test
    const responseGET = await request.get(`${baseURL}/${bookingID}`)

    const bodyGET = await responseGET.json()
    expect(bodyGET).toMatchObject(apiConst.newBooking)
    expect(responseGET.status()).toBe(200)
  })

  test('GET with incorrect ID should send a reponse of 404', async ({ request }) => {
    const responseGET = await request.get(`${baseURL}/XXXXX`)
    expect(responseGET.status()).toBe(404)
  })
})
