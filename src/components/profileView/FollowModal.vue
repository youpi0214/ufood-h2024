<template>
  <div>
    <div>
      <!-- Button trigger modal -->
      <div
        id="followingButton"
        type="button"
        class="btn"
        @click="openModal"
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        "
      >
        <strong>{{ this.following.length }}</strong>
        <div>{{ modalId }}</div>
      </div>
      <!-- Modal -->
      <div
        class="modal fade"
        :id="modalId"
        tabindex="-1"
        :aria-labelledby="`follow/${modalId}`"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" :id="`follow/${modalId}`">
                {{ modalId }}
              </h1>
              <div
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                @click="closeModal"
                aria-label="Close"
              ></div>
            </div>
            <div class="modal-body" style="padding: 0">
              <div
                v-if="this.following.length === 0"
                style="padding: 2rem; justify-content: center; display: flex"
              >
                You don't have any {{ modalId }}
              </div>
              <div v-for="follower in this.following" :key="follower.id">
                <router-link
                  :to="`/user/${follower.id}`"
                  id="follower"
                  class="routerLink"
                >
                  <img
                    :src="gravatarUrl(follower.email)"
                    :alt="follower.name"
                    style="flex: 1; border-radius: 5rem; object-fit: contain"
                  />
                  <div
                    style="
                      flex: 8;
                      display: flex;
                      align-items: center;
                      padding-left: 1rem;
                    "
                  >
                    {{ follower.name }}
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from "md5";
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
    gravatarUrl(email) {
      return `https://www.gravatar.com/avatar/${this.md5Email(email)}?s=80&d=identicon`;
    },
    md5Email(email) {
      return md5(email.trim().toLowerCase());
    },
    openModal() {
      this.$emit("update");
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

<style scoped>
#follower {
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
  transition: ease-in-out 0.25s;
}

#follower:hover {
  background-color: #f1f1f1;
  cursor: pointer;
  transition: ease-in-out 0.25s;
}

#follower:active {
  background-color: #f1f1f1;
}

#followingButton {
  border: none;
}

#followingButton:active {
  background-color: #f1f1f1;
}
.routerLink {
  height: 4rem;
  padding: 0.5rem;
  color: black;
  text-decoration-line: none;
}
</style>
