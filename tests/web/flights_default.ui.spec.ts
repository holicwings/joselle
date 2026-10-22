import { test, expect } from '../../base/pomFixture';

test.describe("Flights Default UI Display", {
  tag: ['@flights', '@ui'],
}, async () => {

  test.beforeEach(async ({ commonPage }) => {
    await commonPage.navigateToCheapFlights()
  })

  test('All elements visible', async ({ flightsObj }) => {
    await expect(flightsObj.tripTypeDropdown).toBeVisible()
    await expect(flightsObj.destinationFields.from).toBeVisible()
    await expect(flightsObj.destinationFields.to).toBeVisible()
    await expect(flightsObj.swapButton).toBeVisible()
    await expect(flightsObj.dateFields.departure).toBeVisible()
    await expect(flightsObj.dateFields.return).toBeVisible()
    await expect(flightsObj.travellersField).toBeVisible()
    await expect(flightsObj.searchButton).toBeVisible()
  })

  test('All Flight types menu options are visible when clicked', async ({ flightsObj, customUtil }) => {
    await customUtil.waitForVisibleThenClick(flightsObj.tripTypeDropdown)

    await expect(flightsObj.tripTypeOptions.return).toBeVisible()
    await expect(flightsObj.tripTypeOptions.oneWay).toBeVisible()
    await expect(flightsObj.tripTypeOptions.multiCity).toBeVisible()
  })

  test('All cabin class options are visible when clicked', async ({ flightsObj, customUtil }) => {
    await customUtil.waitForVisibleThenClick(flightsObj.travellersField)

    await expect(flightsObj.cabinClass.economy).toBeVisible()
    await expect(flightsObj.cabinClass.premiumEconomy).toBeVisible()
    await expect(flightsObj.cabinClass.business).toBeVisible()
    await expect(flightsObj.cabinClass.first).toBeVisible()
  })

  test.describe("Default selections", {}, async () => {
    test('Has Return type selected', async ({ flightsObj }) => {
      await expect(flightsObj.selectedTripType("Return")).toBeVisible()
    })

    test('Has default From location selected', async ({ flightsObj }) => {
      await expect(flightsObj.destinationRemoveButton.from).toBeVisible()
    })

    test('Has empty To location selected', async ({ flightsObj }) => {
      await expect(flightsObj.destinationRemoveButton.to).not.toBeVisible()
    })

    test('Has empty To departure date selected', async ({ flightsObj }) => {
      const departureDate = await flightsObj.dateFields.departure.textContent();
      expect(departureDate).toEqual("Departure")
    })

    test('Has empty To return date selected', async ({ flightsObj }) => {
      const returnDate = await flightsObj.dateFields.return.textContent();
      expect(returnDate).toEqual("Return")
    })

    test('Has default 1 traveller and economy cabin class selected', async ({ flightsObj }) => {
      const travelerType = await flightsObj.travellersField.textContent();
      expect(travelerType).toContain("1")
      expect(travelerType).toContain("Economy")
    })
  })
})
