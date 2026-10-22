import { type Page } from '@playwright/test';
import { ResultsObj } from "../objects/ResultsObj";

export class ResultsPage {
  readonly page: Page;
  private resultsObj: ResultsObj;

  constructor(page: Page) {
    this.page = page
    this.resultsObj = new ResultsObj(page);
  }

  async getPageOnNewTab(): Promise<ResultsObj> {
    await this.page.waitForTimeout(5000)
    const tabs = this.page.context().pages().length;

    if (tabs == 2) {
      const secondTab = this.page.context().pages()[1]
      await secondTab.bringToFront()
      await secondTab.waitForLoadState()
      return this.resultsObj = new ResultsObj(secondTab)
    }
    return this.resultsObj
  }
}