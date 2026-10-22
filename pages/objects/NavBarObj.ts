import { Base } from '../../base/Base';

/**
 * Objects for Navigation bar
 */
export class NavBarObj extends Base {

  readonly logo = this.page.locator('a[aria-label="Go to the cheapflights homepage"]');
  readonly signInButton = this.page.locator('div[aria-label="Sign in"]');
  readonly navBarPanel = this.page.locator('div[aria-label="Navigation menu"]');

}