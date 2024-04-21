import Modal from "bootstrap/js/src/modal";
export const displayPopup = (title, message) => {
  const modal = document.createElement("div");
  modal.classList.add("modal", "fade", "show");
  modal.setAttribute("role", "dialog");
  modal.innerHTML = `
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${title}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">${message}</div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  const modalInstance = new Modal(modal);
  modalInstance.show();
  setTimeout(() => {
    modalInstance.hide();
    document.body.removeChild(modal);
  }, 4000);
};
