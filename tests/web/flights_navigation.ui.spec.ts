import { test, expect } from '../../base/pomFixture';

test.describe("Flights Navigations", {
  tag: ['@flights', '@ui'],
}, async () => {

  test.beforeEach(async ({ commonPage }) => {
    await commonPage.navigateToCheapFlights()
  })

  test('Navigation: Can navigate back to Flights button from other dashboard buttons', async ({ dashboardObj, customUtil }) => {
    expect(await dashboardObj.dashboardButtons.flights.getAttribute('aria-current')).toEqual('page')
    await customUtil.waitForVisibleThenClick(dashboardObj.dashboardButtons.stays)
    expect(await dashboardObj.dashboardButtons.flights.getAttribute('aria-current')).toEqual('false')
    await customUtil.waitForVisibleThenClick(dashboardObj.dashboardButtons.flights)
    expect(await dashboardObj.dashboardButtons.flights.getAttribute('aria-current')).toEqual('page')
  })

  test('Navigation: Updated trip type is not reset when navigating between dashboard buttons', async ({ dashboardObj, customUtil, flightsPage, flightsObj }) => {
    await flightsPage.selectTripType('One-way');

    expect(await dashboardObj.dashboardButtons.flights.getAttribute('aria-current')).toEqual('page')
    await customUtil.waitForVisibleThenClick(dashboardObj.dashboardButtons.stays)
    expect(await dashboardObj.dashboardButtons.flights.getAttribute('aria-current')).toEqual('false')
    await customUtil.waitForVisibleThenClick(dashboardObj.dashboardButtons.flights)
    expect(await dashboardObj.dashboardButtons.flights.getAttribute('aria-current')).toEqual('page')

    await expect(flightsObj.selectedTripType('One-way')).toBeVisible()
  })

  test('One-way: Selecting one-way trip type hides the return date field', async ({ flightsObj, flightsPage }) => {
    await flightsPage.selectTripType('One-way');

    await expect(flightsObj.tripTypeDropdown).toBeVisible()
    await expect(flightsObj.destinationFields.from).toBeVisible()
    await expect(flightsObj.destinationFields.to).toBeVisible()
    await expect(flightsObj.swapButton).toBeVisible()
    await expect(flightsObj.dateFields.departure).toBeVisible()
    await expect(flightsObj.dateFields.return).not.toBeVisible()
    await expect(flightsObj.travellersField).toBeVisible()
    await expect(flightsObj.searchButton).toBeVisible()
  })

  test('Multi-city: Selecting multi-city trip displays required fields', async ({ flightsObj, flightsPage }) => {
    await flightsPage.selectTripType('Multi-city');

    expect(await flightsObj.multiCityRow.count()).toEqual(3)
    await expect(flightsObj.dateFields.return).not.toBeVisible()
    await expect(flightsObj.multiCityAddFlightButton).toBeVisible()
    await expect(flightsObj.multiCityClearAllButton).toBeVisible()
    await expect(flightsObj.multiCityRemoveRowButton.last()).toBeVisible()
    await expect(flightsObj.travellersField).toBeVisible()
    await expect(flightsObj.searchButton).toBeVisible()
  })

  test('Multi-city: Can add another flight', async ({ flightsObj, flightsPage, customUtil }) => {
    await flightsPage.selectTripType('Multi-city');

    expect(await flightsObj.multiCityRow.count()).toEqual(3)
    await customUtil.waitForVisibleThenClick(flightsObj.multiCityAddFlightButton)
    expect(await flightsObj.multiCityRow.count()).toEqual(4)
  })

  test('Multi-city: Can remove a flight', async ({ flightsObj, flightsPage, customUtil }) => {
    await flightsPage.selectTripType('Multi-city');

    expect(await flightsObj.multiCityRow.count()).toEqual(3)
    await customUtil.waitForVisibleThenClick(flightsObj.multiCityRemoveRowButton.last())
    expect(await flightsObj.multiCityRow.count()).toEqual(2)
  })

  test('Multi-city: Has default to and from locations with the same value', async ({ flightsObj, flightsPage }) => {
    await flightsPage.selectTripType('Multi-city');

    const defaultOrigin = await flightsObj.destinationFields.from.first().getAttribute('value')
    await expect(flightsObj.multiCityDestinationField(defaultOrigin)).toBeVisible()
  })

})
