import {browser} from 'protractor';
import {Given, When, Then} from 'cucumber';
import chalk from 'chalk';
const AxeBuilder = require('axe-webdriverjs');
const WebDriver = require('selenium-webdriver');

const expect = require('chai').use(require('chai-as-promised')).expect;

const regex = /^(?:the page should( not)? be accessible)(?:;? within "(.*?)")?(?:;?(?: but)? excluding "(.*?)")?(?:;? according to: (.*?))?(?:;?(?: and)? checking( only)?: (.*?))?(?:;?(?: but)? skipping: (.*?))?(?:;? with options: (.*?))?$/;

Then(regex, async (negate: any, inclusion: any, exclusion: any, tags: any, run_only: any, run_rules: any, skip_rules: any, options: any) => {
    const shouldNegate = !!(negate && negate.trim() === 'not');
    const include = inclusion ? inclusion.split(',') : [];
    const exclude = exclusion ? exclusion.split(',') : [];
    const withTags = tags ? tags.split(','): ['wcag2a'];
    const rules = run_rules ? run_rules.split(',') : [];
    const skipRules = skip_rules ? skip_rules.split(','): [];

    const driver = new WebDriver.Builder()
        .forBrowser('chrome')
        .build();

    try {
        AxeBuilder(driver)
            .include(include)
            .exclude(exclude)
            .withTags(withTags)
            .withRules(rules)
            .disableRules(skipRules);

        const result = await AxeBuilder(browser.driver).analyze();

        if (result.violations.length > 0) {
            console.log(chalk.red(`Axe ${result.violations.length} violations found`));
            console.log(chalk.red('------------------------------'));
            for(let violation of result.violations) {
                console.log('id:     ' + violation.id);
                console.log('impact: ' + violation.impact);
                console.log(violation.description);
                console.log('');
            }
        }

        driver.quit()

        return expect(result.violations.length).to.equal(0);
    } finally {
        if (driver && driver.quit) {
            driver.quit();
        }
    }
});