<script setup>
defineOptions({ name: 'Redirect' })

const route = useRoute()
const router = useRouter()

console.log('route', route)
router.replace({ path: `/${route.params.path}`, query: route.query })
</script>

<template>
  <div></div>
</template>
