<script setup>
import { Icon } from '@iconify/vue'
import { UseImage } from '@vueuse/components'

defineOptions({ name: 'BaseIcon' })

const props = defineProps({
  name: { type: String, required: true },
  class: { type: [String, Array, Object], default: '' },
  size: { type: [String, Number], default: '1em' },
})

const iconStyle = computed(() => ({
  width: typeof props.size === 'number' ? `${props.size}px` : props.size,
  height: typeof props.size === 'number' ? `${props.size}px` : props.size,
}))

const outputType = computed(() => {
  const hasPathFeatures = str => {
    return /^\.{1,2}\//.test(str) || str.startsWith('/') || str.includes('/')
  }

  if (/^https?:\/\//.test(props.name) || hasPathFeatures(props.name) || !props.name) {
    return 'img'
  } else if (props.name.includes(':')) {
    return 'iconify'
  } else {
    return 'svg'
  }
})
</script>

<template>
  <em :class="['base-icon', props.class]" :style="iconStyle">
    <Icon v-if="outputType === 'iconify'" :icon="name" class="base-icon__iconify" />
    <svg v-else-if="outputType === 'svg'" class="base-icon__svg" aria-hidden="true">
      <use :xlink:href="`#icon-${name}`" />
    </svg>
    <UseImage v-else-if="outputType === 'img'" :src="name" class="base-icon__image">
      <template #loading>
        <i class="base-icon__loading" />
      </template>
      <template #error>
        <i class="base-icon__error" />
      </template>
    </UseImage>
  </em>
</template>

<style scoped>
.base-icon {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1em;
  fill: currentcolor;
}

.base-icon__iconify,
.base-icon__svg,
.base-icon__image {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
}

.base-icon__loading {
  width: 100%;
  height: 100%;

  /* 自定义加载动画样式 */
  animation: rotate 1s linear infinite;
}

.base-icon__error {
  width: 100%;
  height: 100%;

  /* 自定义错误图标样式 */
  background: #ff4d4f;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
