
import { test, expect } from '../../base/pomFixture';
import apiConst from '../../data/apiData.json'

const baseURL = process.env.API_BASE_URL
const apiAUTH = process.env.API_AUTH

test.describe("Update Booking via API", {
  tag: ['@api'],
}, async () => {

  test('PUT with no authorization should send a reponse of 403', async ({ request }) => {
    // Create test data first
    const response = await request.post(`${baseURL}`, {
      data: apiConst.newBooking
    })
    const body = await response.json()
    const bookingID = body.bookingid

    // Actual Update
    const responsePUT = await request.put(`${baseURL}/${bookingID}`, {
      data: apiConst.updatedBooking
    })
    expect(responsePUT.status()).toBe(403)
  })

  test('PUT with updated details should send a reponse of 200', async ({ request, customUtil }) => {
    // Create new test data first
    const response = await request.post(`${baseURL}`, {
      data: apiConst.newBooking
    })
    const body = await response.json()
    const bookingID = body.bookingid

    // Actual update
    const responsePUT = await request.put(`${baseURL}/${bookingID}`, {
      headers: {
        'Authorization': `Basic ${apiAUTH}`,
      },
      data: {
        firstname: apiConst.updatedBooking.firstname,
        lastname: apiConst.updatedBooking.lastname,
        totalprice: apiConst.updatedBooking.totalprice,
        depositpaid: apiConst.updatedBooking.depositpaid,
        bookingdates: {
          checkin: `${await customUtil.getDateTodayShort()}`,
          checkout: `${await customUtil.getFutureDate()}`
        },
        additionalneeds: apiConst.updatedBooking.additionalneeds
      }
    })

    const bodyUPDATED = await responsePUT.json()
    expect(bodyUPDATED).not.toMatchObject(apiConst.newBooking)
    expect(responsePUT.status()).toBe(200)
  })

  test('PUT with new details should show all updated field booking details', async ({ request, customUtil }) => {
    // Create new test data first
    const response = await request.post(`${baseURL}`, {
      data: apiConst.newBooking
    })
    const body = await response.json()
    const bookingID = body.bookingid

    // Actual update
    const responsePUT = await request.put(`${baseURL}/${bookingID}`, {
      headers: {
        'Authorization': `Basic ${apiAUTH}`,
      },
      data: {
        firstname: apiConst.updatedBooking.firstname,
        lastname: apiConst.updatedBooking.lastname,
        totalprice: apiConst.updatedBooking.totalprice,
        depositpaid: apiConst.updatedBooking.depositpaid,
        bookingdates: {
          checkin: `${await customUtil.getDateTodayShort()}`,
          checkout: `${await customUtil.getFutureDate()}`
        },
        additionalneeds: apiConst.updatedBooking.additionalneeds
      }
    })

    const bodyUPDATED = await responsePUT.json()

    expect(bodyUPDATED.firstname).toEqual(apiConst.updatedBooking.firstname)
    expect(bodyUPDATED.lastname).toEqual(apiConst.updatedBooking.lastname)
    expect(bodyUPDATED.totalprice).toEqual(apiConst.updatedBooking.totalprice)
    expect(bodyUPDATED.depositpaid).toEqual(apiConst.updatedBooking.depositpaid)
    expect(bodyUPDATED.bookingdates.checkin).toEqual(`${await customUtil.getDateTodayShort()}`)
    expect(bodyUPDATED.bookingdates.checkout).toEqual(`${await customUtil.getFutureDate()}`)
    expect(bodyUPDATED.additionalneeds).toEqual(apiConst.updatedBooking.additionalneeds)
  })

  test('PUT with updated empty booking dates should send a reponse of 400', async ({ request }) => {
    // Create test data first
    const response = await request.post(`${baseURL}`, {
      data: apiConst.newBooking
    })
    const body = await response.json()
    const bookingID = body.bookingid

    // Actual update
    const responsePUT = await request.put(`${baseURL}/${bookingID}`, {
      headers: {
        'Authorization': `Basic ${apiAUTH}`,
      },
      data: {
        firstname: apiConst.newBooking.firstname,
        lastname: apiConst.newBooking.lastname,
        totalprice: apiConst.newBooking.totalprice,
        depositpaid: apiConst.newBooking.depositpaid,
        bookingdates: {
          checkin: "",
          checkout: ""
        },
        additionalneeds: apiConst.newBooking.additionalneeds
      }
    })

    const bodyUPDATED = await responsePUT.json()
    expect(bodyUPDATED).not.toMatchObject(apiConst.newBooking)
    expect(responsePUT.status()).toBe(400)
  })

  test('PUT with updated empty no name should send a reponse of 400', async ({ request, customUtil }) => {
    // Create test date first
    const response = await request.post(`${baseURL}`, {
      data: apiConst.newBooking
    })
    const body = await response.json()
    const bookingID = body.bookingid

    // Actual update
    const responsePUT = await request.put(`${baseURL}/${bookingID}`, {
      headers: {
        'Authorization': `Basic ${apiAUTH}`,
      },
      data: {
        firstname: "",
        lastname: "",
        totalprice: apiConst.newBooking.totalprice,
        depositpaid: apiConst.newBooking.depositpaid,
        bookingdates: {
          checkin: `${await customUtil.getDateTodayShort()}`,
          checkout: `${await customUtil.getFutureDate()}`
        },
        additionalneeds: apiConst.newBooking.additionalneeds
      }
    })

    const bodyUPDATED = await responsePUT.json()
    expect(bodyUPDATED).not.toMatchObject(apiConst.newBooking)
    expect(responsePUT.status()).toBe(400)
  })
})
