import { test, expect } from '../../base/pomFixture';

test.describe("Flights Search", {
  tag: ['@flights', '@ui'],
}, async () => {

  test.beforeEach(async ({ commonPage }) => {
    await commonPage.navigateToCheapFlights()
  })

  test('Search using the default values and first instances for empty fields', async ({ flightsObj, navBarObj, customUtil }) => {

    // Origin already selected by default - Next should be selectin destination by clicking the 1st location)
    await customUtil.waitForVisibleThenClick(flightsObj.destinationFields.to)
    await customUtil.waitForVisible(flightsObj.destinationFieldsOptions.to)
    const destinationValue = await flightsObj.destinationFieldsOptions.to.textContent()
    await customUtil.waitForVisibleThenClick(flightsObj.destinationFieldsOptions.to)

    await expect(flightsObj.selectedDestination(await customUtil.trimLocationName(destinationValue))).toBeVisible()

    // Selecting departure date
    const dateToday = await customUtil.getDateTodayFull()
    await customUtil.waitForVisibleThenClick(flightsObj.dateFields.departure)
    await customUtil.waitForVisibleThenClick(flightsObj.selectingDate(dateToday))

    await customUtil.waitForVisibleThenClick(flightsObj.dateFields.return)
    await customUtil.waitForVisibleThenClick(flightsObj.selectingDate(dateToday))

    await customUtil.waitForVisibleThenClick(flightsObj.searchButton)

    // Navigates to results
    await customUtil.waitForVisible(navBarObj.navBarPanel)

  })

  test('Clear origin and search for available location', async ({ flightsObj, customUtil }) => {

    const originValue = await flightsObj.destinationFieldValue.from.textContent()

    await customUtil.waitForVisibleThenClick(flightsObj.destinationRemoveButton.from)
    await expect(flightsObj.destinationRemoveButton.from).not.toBeVisible()

    await flightsObj.destinationFields.from.fill(originValue)
    await customUtil.waitForVisibleThenClick(flightsObj.destinationFieldsOptions.from)
    await customUtil.waitForVisible(flightsObj.destinationRemoveButton.from)

    const updatedValue = await flightsObj.destinationFieldValue.from.textContent();
    expect(updatedValue).toContain(await customUtil.trimLocationName(originValue))
  })

  test('Can switch the origin and destination', async ({ flightsObj, customUtil, navBarObj }) => {
    // Origin already selected by default - Next should be selectin destination by clicking the 1st location)
    await customUtil.waitForVisibleThenClick(flightsObj.destinationFields.to)
    await customUtil.waitForVisibleThenClick(flightsObj.destinationFieldsOptions.to)

    // Selecting departure date
    const dateToday = await customUtil.getDateTodayFull()
    await customUtil.waitForVisibleThenClick(flightsObj.dateFields.departure)
    await customUtil.waitForVisibleThenClick(flightsObj.selectingDate(dateToday))

    await customUtil.waitForVisibleThenClick(flightsObj.dateFields.return)
    await customUtil.waitForVisibleThenClick(flightsObj.selectingDate(dateToday))

    // get values
    const originValue = await flightsObj.destinationFieldValue.from.textContent()
    const destinationValue = await flightsObj.destinationFieldValue.to.textContent()

    await customUtil.waitForVisibleThenClick(flightsObj.swapButton)

    const originValueUpdated = await flightsObj.destinationFieldValue.from.textContent()
    const destinationValueUpdated = await flightsObj.destinationFieldValue.to.textContent()

    expect(await customUtil.trimLocationName(originValue)).toEqual(await customUtil.trimLocationName(destinationValueUpdated))
    expect(await customUtil.trimLocationName(destinationValue)).toEqual(await customUtil.trimLocationName(originValueUpdated))

    await customUtil.waitForVisibleThenClick(flightsObj.searchButton)

    // Navigates to results
    await customUtil.waitForVisible(navBarObj.navBarPanel)
  })

  test('Should be able to search and verify one-way flights', async ({ customUtil, flightsObj, flightsPage, resultsPage }) => {
    await flightsPage.selectTripType('One-way');

    const originValue = await flightsObj.destinationFields.from.getAttribute('data-test-origin')

    // Origin already selected by default - Next should be selectin destination by clicking the 1st location)
    await customUtil.waitForVisibleThenClick(flightsObj.destinationFields.to)
    const destinationValue = await flightsObj.destinationFields.to.getAttribute('data-test-destination')
    await customUtil.waitForVisibleThenClick(flightsObj.destinationFieldsOptions.to)

    // Selecting departure date
    await customUtil.waitForVisibleThenClick(flightsObj.dateFields.departure)
    await customUtil.waitForVisibleThenClick(flightsObj.selectingDate(await customUtil.getFutureDateFull(7)))
    await customUtil.waitForVisibleThenClick(flightsObj.searchButton)

    const finalResultPage = await resultsPage.getPageOnNewTab()
    await customUtil.waitForVisible(finalResultPage.resultCards.from.first())

    // Validations
    const allOrigin = await finalResultPage.resultCards.from.allTextContents()
    const allDestination = await finalResultPage.resultCards.to.allTextContents()
    const allCabinClass = await finalResultPage.resultCards.cabinClass.allTextContents()

    for (const dest of allOrigin) {
      expect(dest).toContain(originValue)
    }
    for (const dest2 of allDestination) {
      expect(dest2).toContain(destinationValue)
    }
    for (const cabinClass of allCabinClass) {
      expect(cabinClass).toContain('Economy')
    }
  })

  test('Searching with empty fields shows an error pop-up', async ({ flightsObj, customUtil }) => {
    await customUtil.waitForVisibleThenClick(flightsObj.searchButton)
    await expect(flightsObj.searchErrorModal.or(flightsObj.destinationRequiredMessage)).toBeVisible()
  })

})
