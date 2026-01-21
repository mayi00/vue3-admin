<script setup>
defineOptions({ name: 'HotRank' })

const props = defineProps({})
const emit = defineEmits([])
defineExpose({})

// 全国热榜数据
const nationalRankData = ref([
  { rank: 1, name: '可爱多', city: '北京', value: 25179, person: '小野人', personValue: 6724 },
  { rank: 2, name: '娃哈哈', city: '河北', value: 23252, person: '好多鱼', personValue: 2170 },
  { rank: 3, name: '喜之郎', city: '上海', value: 20760, person: '李司机', personValue: 6080 },
  { rank: 3, name: '蒙牛', city: '河南', value: 23202, person: '蜡笔哥', personValue: 8341 },
  { rank: 3, name: '雪之恋', city: '山东', value: 20760, person: '管之家', personValue: 7407 }
])
</script>

<template>
  <div class="rank-panel">
    <div class="panel-title">
      全国热榜
      <div class="tab-group">
        <span class="tab active">各省热销</span>
      </div>
      <span class="time-label">// 近30日 //</span>
    </div>
    <div class="rank-content">
      <div v-for="(item, index) in nationalRankData" :key="index" class="rank-item">
        <div class="rank-number">
          <span v-if="item.rank === 1" class="medal gold">🥇</span>
          <span v-else-if="item.rank === 2" class="medal silver">🥈</span>
          <span v-else class="medal bronze">🥉</span>
        </div>
        <div class="rank-info">
          <div class="rank-row">
            <span class="rank-name">{{ item.name }}</span>
            <span class="rank-city">{{ item.city }}</span>
            <span class="rank-value">{{ item.value.toLocaleString() }}</span>
            <span class="rank-arrow">▲</span>
          </div>
          <div class="rank-row sub">
            <span class="rank-person">{{ item.person }}</span>
            <span class="rank-person-value">{{ item.personValue.toLocaleString() }}</span>
            <span class="rank-arrow">▲</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.rank-panel {
  .panel-title {
    font-size: 16px;
    color: #00d7e9;
    margin-bottom: 15px;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
  }

  .tab-group {
    display: flex;
    gap: 10px;
    margin-left: 10px;

    .tab {
      padding: 2px 8px;
      font-size: 12px;
      color: #00d7e9;
      border: 1px solid rgba(0, 215, 233, 0.3);
      border-radius: 2px;
      cursor: pointer;
      transition: all 0.3s;

      &.active {
        background: rgba(0, 215, 233, 0.3);
        color: #fff;
      }

      &:hover {
        border-color: #00d7e9;
      }
    }
  }

  .time-label {
    font-size: 12px;
    color: #00d7e9;
    margin-left: auto;
  }

  .rank-content {
    position: relative;
    z-index: 1;
    max-height: 300px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(0, 215, 233, 0.3);
      border-radius: 2px;
    }
  }

  .rank-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 0;
    border-bottom: 1px solid rgba(0, 215, 233, 0.1);

    .rank-number {
      width: 30px;
      text-align: center;

      .medal {
        font-size: 20px;
      }
    }

    .rank-info {
      flex: 1;
    }

    .rank-row {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 12px;
      margin-bottom: 5px;

      &.sub {
        margin-bottom: 0;
        font-size: 11px;
        color: #00d7e9;
      }

      .rank-name {
        color: #00d7e9;
        font-weight: bold;
      }

      .rank-city {
        color: #fff;
      }

      .rank-value {
        color: #fff;
        margin-left: auto;
      }

      .rank-arrow {
        color: #e4393c;
      }

      .rank-person {
        color: #00d7e9;
      }

      .rank-person-value {
        color: #fff;
        margin-left: auto;
      }
    }
  }
}
</style>