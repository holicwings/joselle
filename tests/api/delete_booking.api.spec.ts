import { test, expect } from '../../base/pomFixture';
import apiConst from '../../data/apiData.json'

const baseURL = process.env.API_BASE_URL
const apiAUTH = process.env.API_AUTH

test.describe("DELETE Booking Details", {
  tag: ['@api'],
}, async () => {

  test('DELETE with no authorization sends a reponse of 403', async ({ request }) => {
    // Creat the booking first then get the ID
    const response = await request.post(baseURL, {
      data: apiConst.newBooking
    })
    const body = await response.json()
    const bookingID = body.bookingid

    // Actual Delete with 403 Forbidden
    const responseDEL = await request.delete(`${baseURL}/${bookingID}`)
    expect(responseDEL.status()).toBe(403)
  })

  test('DELETE with authorization sends a response of 201', async ({ request }) => {
    // Create the booking first then get the ID
    const response = await request.post(baseURL, {
      data: apiConst.newBooking,
    })
    const body = await response.json()
    const bookingID = body.bookingid

    // Actual Delete with Auth
    const responseDEL = await request.delete(`${baseURL}/${bookingID}`,
      {
        headers: {
          'Authorization': `Basic ${apiAUTH}`,
        }
      }
    )

    // As per site, this is as expected for now (201 create)
    // Should have been 204 No Content
    expect(responseDEL.status()).toBe(201)
  })

  test('DELETE with invalid ID sends a response of 404', async ({ request }) => {
    const response = await request.delete(`${baseURL}/XXXX`,
      {
        headers: {
          'Authorization': `Basic ${apiAUTH}`,
        }
      }
    )
    expect(response.status()).toBe(404)
  })
})
