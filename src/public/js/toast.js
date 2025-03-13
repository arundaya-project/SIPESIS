/**
 * Toast Notification System
 */
const Toast = {
  config: {
    duration: 3000, // Updated duration
    position: "top-right",
    maxVisible: 3,
  },

  init() {
    if (!this.container) {
      this.container = document.createElement("div");
      this.container.className = "toast-container";
      document.body.appendChild(this.container);
    }
    return this;
  },

  show(options) {
    if (!this.container) this.init();

    const settings = {
      title: "",
      message: "",
      type: "info",
      duration: this.config.duration,
      ...options,
    };

    // Remove existing toasts of same type
    this.removeExistingToasts(settings.type);

    const toast = document.createElement("div");
    toast.className = `toast ${settings.type}`;
    toast.innerHTML = `
      <div class="toast-icon">
        <i class="bi ${this.getIcon(settings.type)}"></i>
      </div>
      <div class="toast-content">
        ${
          settings.title
            ? `<div class="toast-title">${settings.title}</div>`
            : ""
        }
        <div class="toast-message">${settings.message}</div>
      </div>
    `;

    // Add to container and animate
    requestAnimationFrame(() => {
      this.container.appendChild(toast);
      // Force reflow
      void toast.offsetWidth;
      toast.classList.add("show");
    });

    // Handle auto-dismiss
    const dismiss = () => {
      toast.classList.add("hide");
      setTimeout(() => toast.remove(), 300);
    };

    // Set dismiss timeout
    setTimeout(dismiss, settings.duration);

    return toast;
  },

  removeExistingToasts(type) {
    const existingToasts = this.container.querySelectorAll(`.toast.${type}`);
    existingToasts.forEach((toast) => {
      toast.classList.add("hide");
      setTimeout(() => toast.remove(), 300);
    });
  },

  getIcon(type) {
    return {
      success: "bi-check-circle-fill",
      error: "bi-x-circle-fill",
      warning: "bi-exclamation-circle-fill",
      info: "bi-info-circle-fill",
    }[type];
  },

  success(message, title = "") {
    return this.show({ type: "success", title, message });
  },

  error(message, title = "") {
    return this.show({ type: "error", title, message });
  },

  warning(message, title = "") {
    return this.show({ type: "warning", title, message });
  },

  info(message, title = "") {
    return this.show({ type: "info", title, message });
  },
};

// Initialize toast
window.Toast = Toast.init();
