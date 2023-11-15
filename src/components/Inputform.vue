<script setup lang="ts">
const props = defineProps({
  /**
   * 値
   * @example 'テスト', 100
   */
  modelValue: { type: [String, Number] },
  /**
   * プレースホルダー
   * @example 'お問合せ内容を入力してください。'
   */
  placeholder: { type: String, default: '' },
  /**
   * インプットフィールド
   * @example 'name'
   */
  inputField: { type: String, required: true },
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
  <div class="inputformContainer">
    <label v-if="label" :for="inputField">{{ label }}</label>
    <input
      v-model="model"
      type="text"
      autocomplete="off"
      :id="inputField"
      :name="inputField"
      :placeholder="placeholder"
      class="inputform"
      :class="{
        inputform__default: !error,
        inputform__error: error
      }"
    />
  </div>
</template>

<style lang="scss" scoped>
.inputformContainer {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.inputform {
  margin: 0;
  padding: 0px 8px;
  border: none;
  border-radius: 0;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  height: 40px;
  width: calc(100% - 16px);
  font-size: 16px;
}

.inputform__default {
  background-color: var(--bg-white);
}

.inputform__error {
  background-color: var(--bg-error);
}
</style>
