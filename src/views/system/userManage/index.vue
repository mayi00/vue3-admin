<script setup>
import api from '@/api/easymock/system.js'
defineOptions({ name: 'UserManage' })

getUserList()
function getUserList() {
  api.userlist().then((res) => {
    console.log(res)
  })
}
</script>

<template>
  <div class="">user</div>
</template>

<style lang="less" scoped></style>
