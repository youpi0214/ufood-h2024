<template>
  <div>
    <div>
      <!-- Button trigger modal -->
      <div id="follwingbutton" type="button" class="btn" @click="openModal">
        {{ modalId }}
      </div>

      <!-- Modal -->
      <div
        class="modal"
        :id="modalId"
        tabindex="-1"
        :aria-labelledby="`follow/${modalId}`"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" :id="`follow/${modalId}`">
                {{ modalId }}
              </h1>
              <button
                type="button"
                class="btn-close"
                @click="closeModal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div v-for="follower in this.following" :key="follower.id">
                <router-link :to="`${follower.id}`"
                  ><span>{{ follower.name }}</span>
                </router-link>
                <span> {{ follower.email }}</span>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="closeModal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
export default {
  name: "FollowModal",
  props: {
    following: {
      type: Array,
      required: true,
    },
    modalId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      followModal: null,
    };
  },
  methods: {
    openModal() {
      this.followModal.show();
    },
    closeModal() {
      this.followModal.hide();
    },
  },
  mounted() {
    this.followModal = new Modal(document.getElementById(this.modalId), {});
  },
  beforeUnmount() {
    if (this.followModal._isShown) {
      this.closeModal();
    }
  },
};
</script>

<style scoped></style>
