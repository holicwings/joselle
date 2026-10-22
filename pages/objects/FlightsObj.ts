import { Locator } from '@playwright/test';
import { Base } from "../../base/Base";

type TripType = "Return" | "One-way" | "Multi-city"

/**
 * Objects for searching flights across different trip type
 */
export class FlightsObj extends Base {

  readonly tripTypeDropdown = this.page.locator('div[aria-controls="flight-trip-type-dropdown"]').filter({ visible: true })

  /**
   * Locator for the already selected trip type
   * @param typeName : "Return" | "One-way" | "Multi-city"
   * @returns locator with the typename
   */
  selectedTripType(typeName: TripType): Locator {
    return this.page.locator(
      `div[aria-controls="flight-trip-type-dropdown"][aria-label="Trip type ${typeName}"]`
    ).filter({ visible: true });
  }

  readonly tripTypeOptions = {
    return: this.page.locator('#roundtrip').filter({ visible: true }),
    oneWay: this.page.locator('#oneway').filter({ visible: true }),
    multiCity: this.page.locator('#multicity').filter({ visible: true }),
  };

  // Destination fields
  readonly destinationFields = {
    from: this.page.locator('input[data-test-origin]')
      .or(this.page.locator('input[aria-label="Origin location"]')).filter({ visible: true }),
    to: this.page.locator('input[data-test-destination]')
      .or(this.page.locator('input[aria-label="Destination location"]')).filter({ visible: true }),
  };

  readonly destinationRemoveButton = {
    from: this.page.locator('div[aria-label="Flight origin input"] div[aria-label="Remove value"][role="button"]').filter({ visible: true }),
    to: this.page.locator('div[aria-label="Flight destination input"] div[aria-label="Remove value"][role="button"]').filter({ visible: true }),
  };

  readonly destinationFieldValue = {
    from: this.page.locator('div[aria-label="Flight origin input"] div[class="DAZT-item-value"]')
      .or(this.page.locator('div[aria-label="Flight origin input"] div[class="c_neb-item-value"]')).filter({ visible: true }),
    to: this.page.locator('div[aria-label="Flight destination input"] div[class="DAZT-item-value"]')
      .or(this.page.locator('div[aria-label="Flight destination input"] div[class="c_neb-item-value"]')).filter({ visible: true })
  };

  readonly destinationFieldsOptions = {
    from: this.page.locator('ul#flight-origin-smarty-input-list li').filter({ visible: true }).first(),
    to: this.page.locator('ul#flight-destination-smarty-input-list li')
      .or(this.page.locator('ul[aria-label="Destination airports"] li span[class="vPgG-name"]')).filter({ visible: true }).first(),
  };

  selectedDestination(destinationName: string): Locator {
    return this.page.locator(
      `//div[contains(text(),'${destinationName}')]//following-sibling::div//div[@aria-label="Remove value"]`
    ).filter({ visible: true });
  }

  readonly swapButton = this.page.locator('div[aria-label="Swap origin and destination locations"]').filter({ visible: true });
  readonly searchButton = this.page.locator('//span[text()="Search"]').filter({ visible: true })

  readonly dateFields = {
    departure: this.page.locator('div[aria-label="Departure date"] div.nUC_ span')
      .or(this.page.locator('//div[@role="button"]//span[text()="Departure"]')).filter({ visible: true }),
    return: this.page.locator('div[aria-label="Return date"] div.nUC_ span')
      .or(this.page.locator('//div[@role="button"]//span[text()="Return"]')).filter({ visible: true }),
  };

  /**
   * Locator for selecting the date via the calendar
   * @param date input should be 21 October, 2026 
   * @returns Locator of the date on the calendar
   */
  selectingDate(date: string): Locator {
    return this.page.locator(
      `//div[contains(@aria-label,"${date}")]`
    ).filter({ visible: true });
  }

  // Travellers and Cabin Class
  readonly travellersField = this.page.locator('div[aria-label="Trip type"]').filter({ visible: true })

  readonly cabinClass = {
    economy: this.page.locator('label[aria-label="Economy"]').filter({ visible: true }).first(),
    premiumEconomy: this.page.locator('label[aria-label="Premium Economy"]').filter({ visible: true }).first(),
    business: this.page.locator('label[aria-label="Business"]').filter({ visible: true }).first(),
    first: this.page.locator('label[aria-label="First"]').filter({ visible: true }).first(),
  };

  readonly travellerInfant = {
    increment: this.page.locator('//input[@aria-label="Infants on lap"]//following-sibling::button').filter({ visible: true }),
    decrement: this.page.locator('//input[@aria-label="Infants on lap"]//preceding-sibling::button').filter({ visible: true }),
    input: this.page.locator('//input[@aria-label="Infants on lap"]').filter({ visible: true }),
    errorMessage: this.page.locator('//div[text()="Searches cannot have more lap infants than adults"]').filter({ visible: true })
  };

  readonly travellerAdult = {
    increment: this.page.locator('//input[@aria-label="Adults"]//following-sibling::button').filter({ visible: true }),
    decrement: this.page.locator('//input[@aria-label="Adults"]//preceding-sibling::button').filter({ visible: true }),
    input: this.page.locator('//input[@aria-label="Adults"]').filter({ visible: true }),
  };

  readonly travellerChildren = {
    increment: this.page.locator('//input[@aria-label="Children"]//following-sibling::button').filter({ visible: true }),
    decrement: this.page.locator('//input[@aria-label="Children"]//preceding-sibling::button').filter({ visible: true }),
    input: this.page.locator('//input[@aria-label="Children"]').filter({ visible: true }),
    age: this.page.locator('div[aria-label="Age Age"]').filter({ visible: true }),
    errorMessage: this.page.locator('//span[text()="Please select an age for each child."]').filter({ visible: true })
  };

  // Messages
  readonly searchErrorModal = this.page.locator('//div[text()="An error occurred while trying to perform your search"]').filter({ visible: true })
  readonly destinationRequiredMessage = this.page.locator('//span[text()="Please enter a Destination airport."]').filter({ visible: true })

  // Multi-city trip type
  readonly multiCityRow = this.page.locator('div.f-iD-row').filter({ visible: true })
  readonly multiCityAddFlightButton = this.page.locator('//div[text()="Add another flight"]').filter({ visible: true })
  readonly multiCityRemoveRowButton = this.page.locator('//button[contains(@aria-label,"Remove leg number")]').filter({ visible: true })
  readonly multiCityClearAllButton = this.page.locator('button[aria-label="Reset the search form"]').filter({ visible: true })

  multiCityDestinationField(locationName: string): Locator {
    return this.page.locator(
      `input[aria-label="Destination location"][value="${locationName}"]`
    ).filter({ visible: true });
  }

  multiCityOriginField(locationName: string): Locator {
    return this.page.locator(
      `input[aria-label="Origin location"][value="${locationName}"]`
    ).filter({ visible: true });
  }

}