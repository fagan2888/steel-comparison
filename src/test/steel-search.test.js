const puppeteer = require('puppeteer');

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({
    // headless: false,
    // slowMo: 100,
  });
  page = await browser.newPage();
  await page.goto('http://localhost:3000')
  // await page.setViewport({ width: 1040, height: 500});
});

test('main title is present', async () => {
  const mainTitleElement = `#GSTM-app > div > h1 > a > b`;
  const mainTitleText = await page.$eval(mainTitleElement, e => e.innerText);
  await page.waitForSelector(mainTitleElement, 2000);
  expect(mainTitleText).toBe('Global Steel Trade Monitor Comparison Dashboard');
});

test('Form for comparing Reporter Countries contains correct default values', async () => {
  await page.click(`#two-reporting-countries`);
  const subtitleElement = `#GSTM-app > div > div > h3:nth-child(1)`;
  const subtitleText = await page.$eval(subtitleElement, e => e.innerText);
  await page.waitForSelector(subtitleElement, 2000);
  expect(subtitleText).toBe('Comparing Reporting Countries');

  const TradeFlowSelect = `#GSTM-app form .TradeFlow`;
  await page.waitForSelector(TradeFlowSelect, 2000);
  const defaultTradeFlow = await page.$eval(TradeFlowSelect, e => e.innerText);
  expect(defaultTradeFlow).toBe('Imports');

  const ReporterCountrySelect1 = `#GSTM-app > div > div > form > .ReportingCountries`; // Automatically select the first of its type
  await page.waitForSelector(ReporterCountrySelect1, 2000);
  const defaultReporterCo1 = await page.$eval(ReporterCountrySelect1, e => e.innerText);
  expect(defaultReporterCo1).toBe('United States');

  const PartnerCountriesSelect = `#GSTM-app > div > div > form > .PartnerCountries`;
  await page.waitForSelector(PartnerCountriesSelect, 2000);
  const defaultPartnerCo = await page.$eval(PartnerCountriesSelect, e => e.innerText);
  expect(defaultPartnerCo).toBe('All Countries');

  const FlowTypeSelect = `#GSTM-app > div > div > form > .FlowType`;
  await page.waitForSelector(FlowTypeSelect, 2000);
  const defaultFlowType = await page.$eval(FlowTypeSelect, e => e.innerText);
  expect(defaultFlowType).toBe('Quantity (Metric Tons)');
});

test('User can search with Two Reporter Countries', async () => {
  const ReporterSelect = `#GSTM-app > div > div > form > .ReportingCountries`;
  await page.click(ReporterSelect);
  await page.focus(ReporterSelect);
  await page.keyboard.type('United States');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.type('Canada');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Tab');

  const GenerateGraphsButton = `#GSTM-app > div > div > form button[type="submit"]`;
  await page.click(GenerateGraphsButton);

  // Wait a bit and expect some graphs
  const firstChartTitle = `#GSTM-app > div > div > div > div:nth-child(1) > h4`;
  await page.waitForSelector(firstChartTitle, 2000);
  const firstChartTitleText = await page.$eval(firstChartTitle, e => e.innerText);
  expect(firstChartTitleText).toBe('United States and Canada Imports from World of All Steel Mill Products in Thousands of Metric Tons - View Data');
})

test('User can search with Two Partner Countries', async () => {
  await page.click(`#two-partner-countries`);
  const subtitleElement = `#GSTM-app > div > div > h3:nth-child(1)`;
  const subtitleText = await page.$eval(subtitleElement, e => e.innerText);
  await page.waitForSelector(subtitleElement, 2000);
  expect(subtitleText).toBe('Comparing Partner Countries');

  const PartnerSelect = `#GSTM-app > div > div > form > .PartnerCountries`;
  await page.click(PartnerSelect);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab'); // Press again to focus on the second such menu..
  await page.keyboard.type('China');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Tab');

  const GenerateGraphsButton = `#GSTM-app > div > div > form button[type="submit"]`;
  await page.click(GenerateGraphsButton);

  // Wait a bit and expect some graphs
  const firstChartTitle = `#GSTM-app > div > div > div > div:nth-child(1) > h4`;
  await page.waitForSelector(firstChartTitle, 2000);
  const firstChartTitleText = await page.$eval(firstChartTitle, e => e.innerText);
  expect(firstChartTitleText).toBe('United States Imports from World and China of All Steel Mill Products in Thousands of Metric Tons - View Data');  

  // Open the modal
  const modalOpenButton = `#GSTM-app > div > div > div > div:nth-child(1) > h4 > button`;
  await page.click(modalOpenButton);
  const TitleInModal = `.ReactModalPortal > div > div > h3`;
  await page.waitForSelector(TitleInModal, 2000);
  const TitleText = await page.$eval(TitleInModal, e => e.innerText);
  expect(TitleText).toBe('United States Imports from World and China of All Steel Mill Products in Thousands of Metric Tons');

  const firstDataPoint = `.ReactModalPortal table > tbody > tr:nth-child(2) > td:nth-child(2)`;
  const dataPointNumber = await page.$eval(firstDataPoint, e => e.innerText);
  expect(dataPointNumber).not.toBeNull();
  const modalCloseButton = `.ReactModalPortal button.modalClose`;
  await page.click(modalCloseButton);
})

test('User can search with Two Trade Flows', async () => {
  await page.waitForSelector(`#two-trade-flows`, 5000);
  await page.click(`#two-trade-flows`);

  const GenerateGraphsButton = `#GSTM-app > div > div > form button[type="submit"]`;
  await page.click(GenerateGraphsButton);

  // Wait a bit and expect some graphs
  const firstChartTitle = `#GSTM-app > div > div > div > div:nth-child(1) > h4`;
  await page.waitForSelector(firstChartTitle, 2000);
  const firstChartTitleText = await page.$eval(firstChartTitle, e => e.innerText);
  expect(firstChartTitleText).toBe('United States Imports and Exports from World of All Steel Mill Products in Thousands of Metric Tons - View Data');
})

afterAll(() => browser.close());