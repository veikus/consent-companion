import AbstractRules from '../AbstractRules';
class OctopusenergyEs extends AbstractRules {
  constructor() {
    super();
    this.name = 'octopusenergy.es';
  }

  test() {
    if (!window.location.href.startsWith('https://octopusenergy.es')) {
      return false;
    }

    return Array.from(document.querySelectorAll('button[color="primary"]'))
      .some(button => button.innerText === 'CONFIGURACIÓN DE COOKIES');
  }

  async run() {
    // Open the modal
    const configureButton = Array.from(document.querySelectorAll('button[color="primary"]'))
      .find(button => button.innerText === 'CONFIGURACIÓN DE COOKIES');
    if (!configureButton) {
      this.log('Open modal button not found');
      return false;
    }
    configureButton.click();
    this.clicksCount++;
    await this.wait(100); // wait for modal to be replaced with the correct one

    // Disable all checkboxes
    const modal = await this.waitForId('modal-dialog');
    if (!modal) {
      this.log('Modal not found');
      return false;
    }

    const items = Array.from(modal.querySelectorAll('label'));
    items.forEach(item => {
      const checkbox = item.querySelector('input[type="checkbox"]');
      if (!checkbox) {
        return;
      }

      if (!checkbox.disabled && checkbox.checked) {
        checkbox.checked = false;
        this.clicksCount++;
      }
    });

    // Apply changes
    const applyButton = modal.querySelector('button[color="primary"]');
    if (!applyButton) {
      this.log('Apply button not found');
      return false;
    }

    applyButton.click();
    this.clicksCount++;
    return true;
  }
}

export default OctopusenergyEs;