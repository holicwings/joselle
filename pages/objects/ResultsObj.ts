import { Base } from '../../base/Base';

/**
 * Objects under the results page (`/flights-search`)
 */
export class ResultsObj extends Base {

  readonly resultCards = {
    from: this.page.locator('//div[contains(@aria-label,"Result item")]//div[contains(@class,"full-airport-wide")][1]').filter({ visible: true }),
    to: this.page.locator('//div[contains(@aria-label,"Result item")]//div[contains(@class,"full-airport-wide")][2]').filter({ visible: true }),
    cabinClass: this.page.locator('//div[contains(@aria-label,"Result item")]//span[contains(@aria-label, "Cabin")]').filter({ visible: true }),
  }

}