import { type Page } from '@playwright/test';
import { CustomUtil } from '../../util/CustomUtil'
import { FlightsObj } from '../objects/FlightsObj'

type TripType = "Return" | "One-way" | "Multi-city"
type CabinClass = "Economy" | "Premium" | "Business" | "First"

export class FlightsPage {
  readonly page: Page;
  readonly customUtil: CustomUtil
  readonly flightsObj: FlightsObj

  constructor(page: Page) {
    this.page = page
    this.customUtil = new CustomUtil(page);
    this.flightsObj = new FlightsObj(page);
  }

  /**
   * Selecting the trip type via dropdown
   * @param name : Return, One-way, Multi-city
   */
  async selectTripType(name: TripType): Promise<void> {
    await this.customUtil.waitForVisibleThenClick(this.flightsObj.tripTypeDropdown)
    if (name == "Return") {
      await this.customUtil.waitForVisibleThenClick(this.flightsObj.tripTypeOptions.return)
    }
    else if (name == "One-way") {
      await this.customUtil.waitForVisibleThenClick(this.flightsObj.tripTypeOptions.oneWay)
    }
    else if (name == "Multi-city") {
      await this.customUtil.waitForVisibleThenClick(this.flightsObj.tripTypeOptions.multiCity)
    }
    else {
      throw new Error("Trip type not available")
    }
    await this.customUtil.waitForVisible(this.flightsObj.selectedTripType(name))
  }

  /**
  * Selecting the cabin class on the travellers' modal
  * @param name : Economy, Premium, Business, First
  */
  async selectCabinClass(name: CabinClass): Promise<void> {
    await this.customUtil.waitForVisibleThenClick(this.flightsObj.travellersField)
    try {
      await this.customUtil.waitForVisible(this.flightsObj.cabinClass.economy)
    } catch {
      await this.customUtil.waitForVisibleThenClick(this.flightsObj.travellersField)
    }

    if (name == "Economy") {
      await this.customUtil.waitForVisibleThenClick(this.flightsObj.cabinClass.economy)
    }
    else if (name == "Premium") {
      await this.customUtil.waitForVisibleThenClick(this.flightsObj.cabinClass.premiumEconomy)
    }
    else if (name == "Business") {
      await this.customUtil.waitForVisibleThenClick(this.flightsObj.cabinClass.business)
    }
    else if (name == "First") {
      await this.customUtil.waitForVisibleThenClick(this.flightsObj.cabinClass.first)
    }
    else {
      throw new Error("Cabin class type not available")
    }
  }
}
