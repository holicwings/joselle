
import { test, expect } from '../../base/pomFixture';
import apiConst from '../../data/apiData.json'

const baseURL = process.env.API_BASE_URL

test.describe("Create Booking API Test", {
  tag: ['@api'],
}, async () => {

  test('POST with correct input should send a reponse of 200', async ({ request, customUtil }) => {
    const payload = {
      firstname: apiConst.newBooking.firstname,
      lastname: apiConst.newBooking.lastname,
      totalprice: apiConst.newBooking.totalprice,
      depositpaid: apiConst.newBooking.depositpaid,
      bookingdates: {
        checkin: `${await customUtil.getDateTodayShort()}`,
        checkout: `${await customUtil.getFutureDate()}`
      },
      additionalneeds: apiConst.newBooking.additionalneeds
    }

    const response = await request.post(baseURL, {
      data: payload
    })

    const body = await response.json()

    expect(body.booking).toMatchObject(payload)
    expect(body.bookingid).toBeDefined()
    expect(response.status()).toBe(200)
  })

  test('POST with empty additional request sends a reponse of 200', async ({ request, customUtil }) => {
    const payload = {
      firstname: apiConst.newBooking.firstname,
      lastname: apiConst.newBooking.lastname,
      totalprice: apiConst.newBooking.totalprice,
      depositpaid: apiConst.newBooking.depositpaid,
      bookingdates: {
        checkin: `${await customUtil.getDateTodayShort()}`,
        checkout: `${await customUtil.getFutureDate()}`
      },
      additionalneeds: ""
    }

    const response = await request.post(baseURL, {
      data: payload
    })

    const body = await response.json()

    expect(body.booking).toMatchObject(payload)
    expect(body.bookingid).toBeDefined()
    expect(response.status()).toBe(200)
  })

  // Unless deposit is not required during booking. This should be confirmed with the product team
  test('POST with no deposit paid sends a reponse of 400', async ({ request, customUtil }) => {
    const payload = {
      firstname: apiConst.newBooking.firstname,
      lastname: apiConst.newBooking.lastname,
      totalprice: apiConst.newBooking.totalprice,
      depositpaid: apiConst.newBooking.depositpaid,
      bookingdates: {
        checkin: `${await customUtil.getDateTodayShort()}`,
        checkout: `${await customUtil.getFutureDate()}`
      },
      additionalneeds: apiConst.newBooking.additionalneeds
    }

    const response = await request.post(baseURL, {
      data: payload
    })

    expect(response.status()).toBe(400)
  })

  test('POST with empty name sends a reponse of 400', async ({ request, customUtil }) => {
    const payload = {
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

    const response = await request.post(baseURL, {
      data: payload
    })

    expect(response.status()).toBe(400)
  })

  test('POST with empty booking dates sends a reponse of 400', async ({ request }) => {
    const payload = {
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

    const response = await request.post(baseURL, {
      data: payload
    })

    expect(response.status()).toBe(400)
  })

  test('POST with past booking dates sends a reponse of 400', async ({ request, customUtil }) => {
    // Used past date 2 days before since we should still be able to book a day before specially when check-in or check-out is 2pm to 12noon the next day
    const payload = {
      firstname: apiConst.newBooking.firstname,
      lastname: apiConst.newBooking.lastname,
      totalprice: apiConst.newBooking.totalprice,
      depositpaid: apiConst.newBooking.depositpaid,
      bookingdates: {
        checkin: `${await customUtil.getPastDate(2)}`,
        checkout: `${await customUtil.getDateTodayShort()}`
      },
      additionalneeds: apiConst.newBooking.additionalneeds
    }

    const response = await request.post(baseURL, {
      data: payload
    })

    expect(response.status()).toBe(400)
  })

  test('POST with total price in centavo should not strip the decimal', async ({ request, customUtil }) => {
    const payload = {
      firstname: apiConst.newBooking.firstname,
      lastname: apiConst.newBooking.lastname,
      totalprice: apiConst.otherDetails.totalPrice.withDecimal,
      depositpaid: apiConst.newBooking.depositpaid,
      bookingdates: {
        checkin: `${await customUtil.getDateTodayShort()}`,
        checkout: `${await customUtil.getFutureDate()}`
      },
      additionalneeds: apiConst.newBooking.additionalneeds
    }

    const response = await request.post(baseURL, {
      data: payload
    })

    const body = await response.json()
    expect(body.booking.totalprice).toEqual(apiConst.otherDetails.totalPrice.withDecimal)
  })
})
