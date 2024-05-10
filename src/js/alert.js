export default class Alert {
    constructor() {
      this.alerts = [];
    }
  
    async loadAlerts() {
      try {
        const response = await fetch("/json/alerts.json"); // Absolute path
        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        this.alerts = data;
      } catch (error) {
        console.error("Error loading alerts:", error);
      }
    }
  
    createAlertElement(alert) {
      const alertElement = document.createElement("p");
      alertElement.textContent = alert.message;
      alertElement.style.backgroundColor = alert.background;
      alertElement.style.color = alert.color;
      return alertElement;
    }
  
    createAlertSection() {
      const alertSection = document.createElement("section");
      alertSection.classList.add("alert-list");
  
      this.alerts.forEach((alert) => {
        const alertElement = this.createAlertElement(alert);
        alertSection.appendChild(alertElement);
      });
  
      return alertSection;
    }
  
    prependAlertsToMain() {
      const mainElement = document.querySelector(".alert-list");
      if (mainElement) {
        mainElement.prepend(this.createAlertSection());
      } else {
        console.warn('Main element with class .alert-list not found');
      }
    }
  
    async init() {
      await this.loadAlerts();
      if (this.alerts.length > 0) {
        this.prependAlertsToMain();
      }
    }
  }
  
  
  




