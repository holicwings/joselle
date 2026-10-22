import { Base } from '../../base/Base';

/**
 * Common actions for the application
 */
export class CommonPage extends Base {

  async navigateToCheapFlights(): Promise<void> {
    await this.page.goto('/');
  }
}