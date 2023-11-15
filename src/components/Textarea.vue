<script setup lang="ts">
const props = defineProps({
  /**
   * 値
   * @example 'テスト', 100
   */
  modelValue: { type: [String, Number] },
  /**
   * インプットフィールド
   * @example 'name'
   */
  textareaField: { type: String, required: true },

  /**
   * ラベル
   * @example 'Name'
   */
  label: { type: String, default: '' },
  /**
   * エラー
   * @example true | false
   */
  error: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: string | number | undefined): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: value => {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <div class="textareaContainer">
    <label v-if="label" :for="textareaField">{{ label }}</label>
    <textarea
      v-model="model"
      :id="textareaField"
      :name="textareaField"
      class="textarea"
      :class="{
        textarea__default: !error,
        textarea__error: error
      }"
    />
  </div>
</template>

<style lang="scss" scoped>
.textareaContainer {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.textarea {
  margin: 0;
  padding: 8px;
  border: none;
  border-radius: 0;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: calc(100% - 16px);
  height: calc(1.5em * 10);
  line-height: 1.5;
  font-size: 16px;
  resize: none;
}

.textarea__default {
  background-color: var(--bg-white);
}

.textarea__error {
  background-color: var(--bg-error);
}
</style>
