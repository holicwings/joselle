import { test as baseTest } from "@playwright/test"
import { CommonPage } from "../pages/actions/CommonPage"
import { CustomUtil } from "../util/CustomUtil"
import { DashboardObj } from "../pages/objects/DashboardObj"
import { FlightsPage } from "../pages/actions/FlightsPage"
import { FlightsObj } from "../pages/objects/FlightsObj"
import { NavBarObj } from "../pages/objects/NavBarObj"
import { ResultsObj } from "../pages/objects/ResultsObj"
import { ResultsPage } from "../pages/actions/ResultsPage"

type pages = {
    commonPage: CommonPage
    customUtil: CustomUtil
    dashboardObj: DashboardObj
    flightsPage: FlightsPage;
    flightsObj: FlightsObj;
    navBarObj: NavBarObj;
    resultsObj: ResultsObj;
    resultsPage: ResultsPage;
}

const testPages = baseTest.extend<pages>({
    commonPage: async ({ page }, use) => { await use(new CommonPage(page)) },
    customUtil: async ({ page }, use) => { await use(new CustomUtil(page)) },
    dashboardObj: async ({ page }, use) => { await use(new DashboardObj(page)) },
    flightsPage: async ({ page }, use) => { await use(new FlightsPage(page)) },
    flightsObj: async ({ page }, use) => { await use(new FlightsObj(page)) },
    navBarObj: async ({ page }, use) => { await use(new NavBarObj(page)) },
    resultsObj: async ({ page }, use) => { await use(new ResultsObj(page)) },
    resultsPage: async ({ page }, use) => { await use(new ResultsPage(page)) },
})

export const test = testPages;
export const expect = testPages.expect;