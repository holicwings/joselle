import { Base } from "../../base/Base";

/**
 * All other objects not included in Navigation and Flights on `https://www.cheapflights.com.au/`
 */
export class DashboardObj extends Base {

  readonly dashboardButtons = {
    flights: this.page.locator('a[aria-label="Search for flights"]'),
    stays: this.page.locator('a[aria-label="Search for stays"]'),
    cars: this.page.locator('a[aria-label="Search for cars"]'),
  };

}