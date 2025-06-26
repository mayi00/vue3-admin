
import { ref, onMounted, onUnmounted } from 'vue'

export const useClickOutside = (callback) => {
  const element = ref(null)

  const vClickOutside = (event) => {
    if (element.value && !element.value.contains(event.target)) {
      callback()
    }
  }

  onMounted(() => {
    document.addEventListener('click', vClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener('click', vClickOutside)
  })

  return { element }
}