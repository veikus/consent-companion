import AbstractRules from '../AbstractRules';

class Amazon extends AbstractRules {
  constructor() {
    super();
    this.name = 'amazon';
  }

  test() {
    const hosts = [
      'amazon.es', 'amazon.co.uk', 'amazon.de', 'amazon.fr', 'amazon.it',
      'www.amazon.es', 'www.amazon.co.uk', 'www.amazon.de', 'www.amazon.fr', 'www.amazon.it',
    ];
    if (!hosts.includes(window.location.hostname)) {
      return false;
    }

    return !!document.getElementById('sp-cc') || window.location.pathname === '/cookieprefs';
  }

  async run() {
    const rejectButton = document.getElementById('sp-cc-rejectall-link');
    if (!rejectButton) {
      this.log('Reject button not found');
      return false;
    }
    rejectButton.click();
    this.clicksCount++;
    await this.wait(100); // wait for modal to be replaced with the correct one
    return true;
  }
}

export default Amazon;