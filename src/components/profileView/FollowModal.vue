<template>
  <div>
    <div data-bs-toggle="modal" :data-bs-target="divModalId">
      {{ modalId }}
    </div>

    <!-- Modal -->
    <div
      class="modal modal-dialog-scrollable"
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
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div v-for="follower in this.following" :key="follower.id">
              <div
                @click="this.$router.push(`/user/${follower.id}`)"
                data-bs-dismiss="modal"
              >
                <span>{{ follower.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
};
</script>

<style scoped></style>
