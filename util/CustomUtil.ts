import { Locator } from "@playwright/test";
import generalConst from "../generalConst.json";
import { Base } from '../base/Base';

export class CustomUtil extends Base {

  /**
   * Waits for an element to be visible then clicks it
   * @param locator - Page locator to click
   * @param timeoutMs - Optional timeout, default medium
   */
  async waitForVisibleThenClick(
    locator: Locator,
    timeoutMs: number = generalConst.timeouts.medium
  ): Promise<void> {
    await locator.waitFor({
      state: "visible",
      timeout: timeoutMs,
    });
    await locator.click();
  }

  /**
   * Waits for an element to be visible
   * @param locator - Page locator to click
   * @param timeoutMs - Optional timeout, default medium
   */
  async waitForVisible(
    locator: Locator,
    timeoutMs: number = generalConst.timeouts.medium
  ): Promise<void> {
    await locator.waitFor({
      state: "visible",
      timeout: timeoutMs,
    });
  }

  /**
   * Generates date today in full
   * @returns date in the format '21 October 2026'
   */
  async getDateTodayFull(
  ): Promise<string> {
    const today = new Date();
    const options = { day: 'numeric', month: 'long' } as const;
    const dayAndMonth = today.toLocaleDateString('en-GB', options);
    const year = today.getFullYear();
    return `${dayAndMonth}, ${year}`;
  }

  /**
   * Generates past date in full
   * @param days : number of days from today
   * @returns date in the format '21 October 2026'
   */
  async getPastDateFull(days: number = 1
  ): Promise<string> {
    const date = new Date();
    date.setDate(date.getDate() - days)

    const options = { day: 'numeric', month: 'long' } as const;
    const dayAndMonth = date.toLocaleDateString('en-GB', options);
    const year = date.getFullYear();
    return `${dayAndMonth}, ${year}`;
  }

  /**
   * Generates future date in full
   * @param days: number of days from today
   * @returns date in the format '21 October 2026'
   */
  async getFutureDateFull(days: number = 7
  ): Promise<string> {
    const date = new Date();
    date.setDate(date.getDate() + days)

    const options = { day: 'numeric', month: 'long' } as const;
    const dayAndMonth = date.toLocaleDateString('en-GB', options);
    const year = date.getFullYear();
    return `${dayAndMonth}, ${year}`;
  }

  /**
   * Generates past date
   * @param days number of days from today
   * @returns date in format YYYY-MM-DD
   */
  async getPastDate(days: number = 1
  ): Promise<string> {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - days);

    const formattedDate = yesterday.toISOString().split('T')[0];
    return formattedDate
  }

  /**
   * Generates date today
   * @returns date in format YYYY-MM-DD
   */
  async getDateTodayShort(
  ): Promise<string> {
    const today = new Date();
    today.setDate(today.getDate());

    const formattedDate = today.toISOString().split('T')[0];
    return formattedDate
  }

  /**
   * Generates future date
   * @param days number of days from today
   * @returns date in format YYYY-MM-DD
   */
  async getFutureDate(days: number = 1
  ): Promise<string> {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + days);
    const formattedDate = tomorrow.toISOString().split('T')[0];
    return formattedDate
  }

  /**
   * Trims the location name, separating the city name from country or code
   * @param fullName of the location both destination or origin (ex. Manila, Phillipines (MNL))
   * @returns only the city (ex. Manila)
   */
  async trimLocationName(fullName: string
  ): Promise<string> {
    const trimmedName = fullName.split(/[,()]/)[0]
    return trimmedName.trim()
  }
}
