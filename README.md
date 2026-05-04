Note: Screenshots of the test report of this assignment is attached as ScreenshotUIresult.png and ScreenshotAPIresult.png
      Book data is extracted to book.json file


Installation & Setup
1. Clone the repository
   git clone https://github.com/VaibhavDG/FinacPlus.git
   cd FinacPLus

2. Install Dependencies
   npm install

3. Install Playwright Browsers
   npx playwright install

RUNNING TESTS
1. Run all tests
   npx playwright test

2. Run UI test only
   npx playwright test tests/e2e

3. Run API test only
   npx playwright test tests/api

4. Run tests in headed mode
   npx playwright test --headed

5. Geneate HTML Report
   npx playwright show-report
