<template>
  <div>
    <div data-bs-toggle="modal" :data-bs-target="divModalId">
      {{ modalId }}
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
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div v-for="follower in this.following" :key="follower.id">
              <div
                id="follower"
                @click="this.$router.push(`/user/${follower.id}`)"
                data-bs-dismiss="modal"
              >
                <img
                  :src="gravatarUrl(follower.email)"
                  :alt="follower.name"
                  style="flex: 1; width: 50%; padding: 1rem; border-radius: 5rem"
                />
                <div style="flex: 10; padding: 1rem; display: flex; align-items: center">{{ follower.name }}</div>
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
      divModalId: "#" + this.modalId,
    };
  },
  methods: {
    gravatarUrl(email) {
      return `https://www.gravatar.com/avatar/${this.md5Email(email)}?s=80&d=identicon`;
    },
    md5Email(email) {
      return md5(email.trim().toLowerCase());
    },
  },
};
</script>

<style scoped>
#follower {
  display: flex;
  flex-direction: row;
}
</style>
