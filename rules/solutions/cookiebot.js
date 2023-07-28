import AbstractRules from '../AbstractRules';
class CookieBot extends AbstractRules {
  constructor() {
    super();
    this.name = 'cookiebot';
  }

  test() {
    const elem = document.getElementById('CybotCookiebotDialog');
    return !!elem && elem.offsetWidth > 0 && elem.offsetHeight > 0;
  }

  async run() {
    const denyButton = document.getElementById('CybotCookiebotDialogBodyButtonDecline');
    if (!denyButton) {
      this.log('Deny button not found');
      return;
    }

    denyButton.click();
    this.clicksCount++;
    return true;
  }
}

export default CookieBot;