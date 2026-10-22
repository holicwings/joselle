# PLAYWRIGHT TEST AUTOMATION #

### Tools used ###
* [Playwright](https://playwright.dev/)

## How do I get set up? ##

* [Have Node installed on your machine](https://nodejs.org/)
* Enter `npm i` in your terminal, this will install all the necessary dependencies
* Copy `.env.example` to `.env` and make sure it has the right variables (for `API_AUTH`, refer in `https://restful-booker.herokuapp.com/booking`)

## How do I run the tests? ##

* For running locally :

    * Enter `npm test` in your terminal to run all tests

    * Enter `npm run test:ui` to run all web or UI tests

    * Enter `npm run test:api` to run all api tests

    * Enter `npm run test:grep` + space + `[scenario name]` to specific test cases.

See `package.json` for more scripts

## Test report ##

Once execution is done, a link with the report should be visible. Click that to navigate to playwright report.
Or execute `npm run report` then click the link.
Note: I added an example test under `/sample-report` folder. Open the index.html to verify the report

## Notable Items ##

### API Tests ###
- All scripts are under `tests/api` with suffix `.api.spec.ts`.
- There are still a lot of validation like the character limit, type, etc. I'm limited by the test site and example test data to fully exhaust all the test cases, I decided to exclude those for this exam. I will be able to create some assumption (ex. first name should only be maximum of 32 characters) but all test cases will still result as failed
- Some of the failing test cases I kept is to show the actual expected result, but otherwise incorrect due to the test limitation on the API site. By practice I can tag it as `.fail` if it's on the teams known backlog and not actively worked on. This will give as a cue when the issue is already fixed. For this excercise, I kept them as failing.

### Web Tests ###
- All scripts are under `tests/web` with suffix `.ui.spec.ts`.
- There are still other scenarios not included in the test due to time limitation.
- I focused mainly on Return and One-way trip types and included just some test cases for the Multi-city