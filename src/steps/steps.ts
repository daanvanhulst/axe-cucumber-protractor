import {browser} from 'protractor';
import {Given, When, Then} from 'cucumber';
const WebDriver = require('selenium-webdriver');
const AxeBuilder = require('axe-webdriverjs');

const expect = require('chai').use(require('chai-as-promised')).expect;

const regex = /^(?:the page should( not)? be accessible)(?:;? within "(.*?)")?(?:;?(?: but)? excluding "(.*?)")?(?:;? according to: (.*?))?(?:;?(?: and)? checking( only)?: (.*?))?(?:;?(?: but)? skipping: (.*?))?(?:;? with options: (.*?))?$/;

Then(regex, async (negate: any, inclusion: any, exclusion: any, tags: any, run_only: any, run_rules: any, skip_rules: any, options: any) => {
    const withTags = tags || 'wcag2a';

    const driver = new WebDriver.Builder()
        .forBrowser('chrome')
        .build();

    AxeBuilder(driver)
    // .include(inclusion)
    // .exclude(exclusion)
        .withTags(withTags);

    const result = await AxeBuilder(browser.driver).analyze();

    return expect(result.violations.length === 0).to.be.false;
});
