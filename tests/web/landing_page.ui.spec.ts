import { test, expect } from '../../base/pomFixture';

test.describe("Navigation Bar Display", {
  tag: ['@nav', "@ui"],
}, async () => {

  test.beforeEach(async ({ commonPage }) => {
    await commonPage.navigateToCheapFlights()
  })

  test('Logo is displayed correctly', async ({ navBarObj }) => {
    await expect(navBarObj.logo).toBeVisible()
  })

  test('Signin button is displayed correctly', async ({ navBarObj }) => {
    await expect(navBarObj.signInButton).toBeVisible()
  })
})
