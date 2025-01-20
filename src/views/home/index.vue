<script setup>
defineOptions({ name: 'Home' })
</script>

<template>
  <div class="home-container container">
    <div class="mb-4">
      <ElButton>Default</ElButton>
      <ElButton type="primary">Primary</ElButton>
      <ElButton type="success">Success</ElButton>
      <ElButton type="info">Info</ElButton>
      <ElButton type="warning">Warning</ElButton>
      <ElButton type="danger">Danger</ElButton>
    </div>

    <div class="mb-4">
      <ElButton plain>Plain</ElButton>
      <ElButton type="primary" plain>Primary</ElButton>
      <ElButton type="success" plain>Success</ElButton>
      <ElButton type="info" plain>Info</ElButton>
      <ElButton type="warning" plain>Warning</ElButton>
      <ElButton type="danger" plain>Danger</ElButton>
    </div>

    <div class="mb-4">
      <ElButton round>Round</ElButton>
      <ElButton type="primary" round>Primary</ElButton>
      <ElButton type="success" round>Success</ElButton>
      <ElButton type="info" round>Info</ElButton>
      <ElButton type="warning" round>Warning</ElButton>
      <ElButton type="danger" round>Danger</ElButton>
    </div>

    <div>
      <ElButton icon="Search" circle />
      <ElButton type="primary" icon="Edit" circle />
      <ElButton type="success" icon="Check" circle />
      <ElButton type="info" icon="Message" circle />
      <ElButton type="warning" icon="Star" circle />
      <ElButton type="danger" icon="Delete" circle />
    </div>

    <ElIcon :size="20">
      <Edit />
    </ElIcon>
    <ElIcon color="#409efc" class="no-inherit">
      <Share />
    </ElIcon>
    <ElIcon>
      <Delete />
    </ElIcon>
    <ElIcon class="is-loading">
      <Loading />
    </ElIcon>
    <ElButton type="primary">
      <ElIcon style="vertical-align: middle">
        <Search />
      </ElIcon>
      <span style="vertical-align: middle"> Search </span>
    </ElButton>

    <div style="font-size: 20px">
      <!-- 由于SVG图标默认不携带任何属性 -->
      <!-- 你需要直接提供它们 -->
      <Edit style="width: 1em; height: 1em; margin-right: 8px" />
      <Share style="width: 1em; height: 1em; margin-right: 8px" />
      <Delete style="width: 1em; height: 1em; margin-right: 8px" />
      <Search style="width: 1em; height: 1em; margin-right: 8px" />
    </div>

    <ElIcon><Plus /></ElIcon>
    <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
      <path
        fill="currentColor"
        d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64z"
      ></path>
    </svg> -->
  </div>
</template>

<style lang="less" scoped>
.home-container {
  width: 1600px;
  padding: 8px;
  // margin: 8px;
}
.home {
  font-size: 32px;
}
</style>
