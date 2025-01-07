<script setup>
defineOptions({
  name: 'Redirect'
})

const route = useRoute()
const router = useRouter()

router.replace({ path: `/${route.params.path}`, query: route.query })
</script>
