import { test, expect } from '../../base/pomFixture';

test.describe("Flights Other Scenarios", {
  tag: ['@flights', '@ui'],
}, async () => {

  test.beforeEach(async ({ commonPage }) => {
    await commonPage.navigateToCheapFlights()
  })

  test('Travellers : Lap infants should not exceed the number of adults', async ({ flightsObj, customUtil, }) => {
    await customUtil.waitForVisibleThenClick(flightsObj.travellersField)

    await customUtil.waitForVisibleThenClick(flightsObj.travellerInfant.increment)
    expect(await flightsObj.travellerInfant.input.getAttribute("value")).toEqual("1")

    await flightsObj.travellerInfant.increment.click({ force: true })
    await expect(flightsObj.travellerInfant.errorMessage).toBeVisible()
  })

  test('Travellers : Total travellers count should inlcude children and infants', async ({ flightsObj, customUtil, }) => {
    await customUtil.waitForVisibleThenClick(flightsObj.travellersField)

    await customUtil.waitForVisibleThenClick(flightsObj.travellerInfant.increment)
    expect(await flightsObj.travellerInfant.input.getAttribute("value")).toEqual("1")

    expect(await flightsObj.travellersField.textContent()).toContain("2")
  })

  test('Travellers : Child traveller requires age', async ({ flightsPage, flightsObj, customUtil, }) => {
    await flightsPage.selectTripType('One-way');

    // Origin already selected by default - Next should be selectin destination by clicking the 1st location)
    await customUtil.waitForVisibleThenClick(flightsObj.destinationFields.to)
    await customUtil.waitForVisibleThenClick(flightsObj.destinationFieldsOptions.to)

    // Selecting departure date
    const dateToday = await customUtil.getDateTodayFull()
    await customUtil.waitForVisibleThenClick(flightsObj.dateFields.departure)
    await customUtil.waitForVisibleThenClick(flightsObj.selectingDate(dateToday))

    // Selecting traveller
    await customUtil.waitForVisibleThenClick(flightsObj.travellerChildren.increment)
    expect(await flightsObj.travellerChildren.input.getAttribute("value")).toEqual("1")

    await customUtil.waitForVisibleThenClick(flightsObj.searchButton)

    try {
      await expect(flightsObj.travellerChildren.errorMessage.or(flightsObj.searchErrorModal)).toBeVisible()
    } catch {
      await customUtil.waitForVisibleThenClick(flightsObj.searchButton)
    }

    await expect(flightsObj.travellerChildren.errorMessage.or(flightsObj.searchErrorModal)).toBeVisible()
  })

  test('Travellers : Can select different cabin class', async ({ flightsObj, flightsPage }) => {
    await flightsPage.selectCabinClass("Business")
    expect(await flightsObj.travellersField.textContent()).toContain("Business")
  })

  test('Dates: Past date should be disabled for departure or return dates', async ({ flightsObj, customUtil }) => {
    const dateYesterday = await customUtil.getPastDateFull()

    await customUtil.waitForVisibleThenClick(flightsObj.dateFields.departure)
    expect(await flightsObj.selectingDate(dateYesterday).getAttribute('aria-disabled')).toEqual("true")
  })

})
