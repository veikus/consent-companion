class AbstractRules {
  constructor() {
    this.name = '';
    this.clicksCount = 0;
  }

  test() {
    this.log('test() not implemented');
    return false;
  }

  run() {
    this.log('run() not implemented');
    return false;
  }

  log() {
    console.log(`GDPR-FU (${this.name}):`, ...args);
  }

  async wait(timeout = 1000) {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  async waitForId(id, timeout = 1000) {
    return new Promise(resolve => {
      const element = document.getElementById(id);
      if (element) {
        return resolve(element);
      }

      const interval = setInterval(() => {
        const element = document.getElementById(id);
        if (element) {
          clearInterval(interval);
          resolve(element);
        }
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        resolve(null);
      }, timeout);
    });
  }
}

export default AbstractRules;