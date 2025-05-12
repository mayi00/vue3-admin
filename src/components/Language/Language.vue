<script setup>
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'
import { setI18nLanguage } from '@/plugins/i18n'

defineOptions({ name: 'Language' })

const { locale, t } = useI18n()
// 切换语言
function changeLanguage(lang) {
  setI18nLanguage(lang)
  console.log(lang, locale.value, t('login.login'))
}
</script>

<template>
  <el-dropdown trigger="hover">
    <div class="language-wrapper">
      <Icon icon="material-icon-theme:i18n" class="iconify-icon" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="changeLanguage('zh-CN')">中文</el-dropdown-item>
        <el-dropdown-item @click="changeLanguage('en')">English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="less" scoped>
.language-wrapper {
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: var(--gray-4);
  }

  .iconify-icon {
    font-size: 20px;
    color: var(--gray-12);
  }
}
</style>
