<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <div class="modal-header">
        <slot name="title">
        </slot>
        <span class="close-button" @click="closeModal">×</span>
      </div>
      <div class="modal-body">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineEmits, defineProps, ref, watch} from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);

const isVisible = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  isVisible.value = newValue;
});

const closeModal = () => {
  isVisible.value = false;
  emit('update:modelValue', false);
};


</script>

<style lang="scss" scoped>


.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-content {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    max-width: 300px;
    width: 100%;
    padding: 20px;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;

    h2 {
      margin: 0;
    }
  }

  .modal-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }

  .close-button {
    color: #000000;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }
}
</style>
