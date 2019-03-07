import '@babel/polyfill';
import puppeteer from 'puppeteer';

jest.setTimeout(120000);

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto('http://localhost:3001');
});

test('should render main title', async () => {
  const mainTitleElement = `h1 a b`;
  const mainTitleText = await page.$eval(mainTitleElement, e => e.innerHTML);
  await page.waitForSelector(mainTitleElement, 20000);
  expect(mainTitleText).toBe('Global Steel Trade Monitor');
});

test('should render the select dropdowns in the correct order', async () => {
  const field_array = await page.$$('.Select-input input', items => items);
  expect(field_array[0]._remoteObject.description).toBe('input#tradeFlow');
  expect(field_array[1]._remoteObject.description).toBe('input#reporterCountries');
  expect(field_array[2]._remoteObject.description).toBe('input#partnerCountries');
  expect(field_array[3]._remoteObject.description).toBe('input#productGroups');
  expect(field_array[4]._remoteObject.description).toBe('input#flowType');
});

test('should render the select dropdowns with the correct initial values', async () => {
  await page.waitForSelector('span.Select-value-label', 20000);
  await page.waitFor(1000);

  const data = await page.evaluate(() => {
    const labels = Array.from(document.querySelectorAll('.explorer__form .Select-value-label'));
    return labels.map(l => l.innerHTML);
  });
  // console.log(data);

  expect(data[0]).toEqual('Imports');
  expect(data[1]).toEqual('United States');
  expect(data[2]).toEqual('All Countries');
  expect(data[3]).toEqual('All Steel Mill Products');
  expect(data[4]).toEqual('Quantity (Metric Tons)');

});

test('should handle a Trade Flow change with Submit as expected', async () => {
  // there's no <select> element, so using clicks instead
  await page.waitForSelector('.explorer__form__row .Select-control', 20000);
  await page.click('.explorer__form__row .Select-control');
  await page.waitForSelector('.explorer__form__row .Select-menu-outer .Select-option', 30000);
  await page.click('.explorer__form__row .Select-menu-outer .Select-option'); // the first one will be "Austria"
  await page.waitForSelector('button.explorer__form__submit', 20000);
  await page.click('button.explorer__form__submit');
  await page.waitForSelector('h3.explorer__chart-title', 20000);
  await page.waitFor(1000);
  const chartTitleText = await page.$eval('h3.explorer__chart-title', e => e.innerHTML);
  expect(chartTitleText).toContain('Exports');

});

test('should handle a Reporting Country change with Submit as expected', async () => {
  // there's no <select> element, so using clicks instead
  await page.waitForSelector('.explorer__form__row:nth-of-type(2) .Select-control', 20000);
  await page.click('.explorer__form__row:nth-of-type(2) .Select-control');
  await page.waitForSelector('.explorer__form__row:nth-of-type(2) .Select-menu-outer .Select-option', 60000);
  // .Select-menu-outer is still the first of its type because the one used for Trade Flow is hidden at this point
  await page.click('.explorer__form__row:nth-of-type(2) .Select-menu-outer .Select-option'); // the first one will be "Austria"
  await page.waitForSelector('button.explorer__form__submit', 20000);
  await page.click('button.explorer__form__submit');
  await page.waitForSelector('h3.explorer__chart-title', 20000);
  await page.waitFor(1000);
  const chartTitleText = await page.$eval('h3.explorer__chart-title', e => e.innerHTML);
  expect(chartTitleText).toContain('Austria');
});

afterAll(() => browser.close());