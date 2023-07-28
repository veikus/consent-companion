import OctopusenergyEs from './rules/websites/octopusenergy.es';
import CookieBot from './rules/solutions/cookiebot';

const rules = [
  new OctopusenergyEs(),
  new CookieBot(),
];

let callsCount = 0;
async function testRules() {
  callsCount++;
  if (callsCount > 5) {
    clearInterval(interval);
    console.log('Too many retries');
    return;
  }

  console.log(`Testing rules ${callsCount}/5:`);
  const rule = rules.find(rule => {
    console.log(`Testing rule ${rule.name}`);
    return rule.test();
  });

  if (!rule) {
    console.log('No rules found');
    return;
  }

  clearInterval(interval);

  const result = await rule.run();
  console.log('Result:', result);

  if (result) {
    const browser = window.browser || window.chrome;
    browser.runtime.sendMessage({
      action: 'save-statistics',
      name: rule.name,
      clicksCount: rule.clicksCount
    });
  }
}

const interval = setInterval(testRules, 1000)