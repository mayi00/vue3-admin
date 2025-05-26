<script setup>
defineOptions({ name: 'NationalFlag' })

const allNationalFlags = ['fi-cn', 'fi-us', 'fi-jp']
const nationalFlags = [
  { code: 'fi-cn', name: '中国' },
  { code: 'fi-us', name: '美国' },
  { code: 'fi-jp', name: '日本' },
  { code: 'fi-fr', name: '法国' },
  { code: 'fi-de', name: '德国' },
  { code: 'fi-ru', name: '俄罗斯' },
  { code: 'fi-in', name: '印度' },
  { code: 'fi-br', name: '巴西' },
  { code: 'fi-za', name: '南非' },
  { code: 'fi-ca', name: '加拿大' },
  { code: 'fi-gb', name: '英国' },
  { code: 'fi-au', name: '澳大利亚' },
  { code: 'fi-it', name: '意大利' },
  { code: 'fi-es', name: '西班牙' },
  { code: 'fi-kp', name: '韩国' },
  { code: 'fi-kh', name: '柬埔寨' },
  { code: 'fi-my', name: '马来西亚' },
  { code: 'fi-sg', name: '新加坡' },
  { code: 'fi-th', name: '泰国' },
  { code: 'fi-vn', name: '越南' },
  { code: 'fi-ph', name: '菲律宾' },
  { code: 'fi-id', name: '印度尼西亚' },
  { code: 'fi-np', name: '尼泊尔' },
  { code: 'fi-sa', name: '沙特阿拉伯' },
  { code: 'fi-bd', name: '孟加拉国' },
  { code: 'fi-mx', name: '墨西哥' },
  { code: 'fi-ar', name: '阿根廷' },
  { code: 'fi-ng', name: '尼日利亚' },
  { code: 'fi-eg', name: '埃及' },
  { code: 'fi-tr', name: '土耳其' },
]
</script>

<template>
  <div class="g-container">
    <el-card>
      <h3>国家国旗</h3>
      <ul>
        <li v-for="item in nationalFlags" :key="item.code">
          <em class="fi" :class="item.code"></em>
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.fi {
  margin: 4px;
}
</style>
