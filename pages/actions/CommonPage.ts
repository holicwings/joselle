import { type Page } from '@playwright/test';

export class CommonPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page
  }

  async navigateToCheapFlights(): Promise<void> {
    await this.page.goto('/');

  }
}