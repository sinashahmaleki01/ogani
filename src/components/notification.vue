<template>
  <transition name="notify-slide">
    <div v-if="visible" :class="['notify', typeClass]">
      <span>{{ message }}</span>
    </div>
  </transition>
  
</template>

<script>
export default {
  name: 'Notification',
  props: {
    message: { type: String, required: true },
    type: { type: String, default: 'success' }, // 'success' | 'error'
    show: { type: Boolean, default: false }
  },
  computed: {
    visible() {
      return this.show && this.message;
    },
    typeClass() {
      return this.type === 'error' ? 'notify-error' : 'notify-success';
    }
  }
}
</script>

