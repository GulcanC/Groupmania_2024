<!-- modal to edit user's post -->
<template>
  <div
    class="modal text-light"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="Modifier la publication">
      <div class="modal-content">
        <!-- modal header -->
        <div class="modal-header">
          <h5 class="modal-title" id="modalLabel">{{ title }}</h5>
          <button
            role="button"
            type="button"
            class="close btn"
            aria-label="Close"
            @click="$emit('closePostModal')"
          >
            <!-- modal close button -->
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <!-- modal body -->
        <!-- 👋🏻👋🏻 modal body in the UserPostComp, it will be replaced with slot 👋🏻👋🏻-->
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalPostComp",
  props: ["title"],
};
</script>

<style scoped>
.modal {
  display: block;
  backdrop-filter: blur(8px);
}

.modal-header {
  background-color: #fd2d01;
}
.modal-body {
  background-color: #4e5166;
}

.close {
  font-size: 1.5rem;
  color: white;
}
</style>
