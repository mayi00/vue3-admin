<script setup>
defineOptions({ name: 'BlackButton' })
</script>

<template>
  <div class="g-container">
    <el-card>
      <button class="btn-magic">黑紫VIP</button>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.btn-magic {
  width: 300px;
  height: 100px;
  background: linear-gradient(45deg, #000 25%, rgba(90, 0, 127, 0.3) 40%, rgba(0, 10, 80, 0.3) 60%, #000 75%);
  background-size: 500% 500%;
  animation: shimmer 32s infinite linear;
  color: #fff;
  border-radius: 4px;
}

@keyframes shimmer {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.btn-magic {
  transition: transform 0.3s, box-shadow 0.3s;
}
.btn-magic:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(90, 0, 127, 0.5); /* 紫色投影,具体效果微调 */
}


.btn-magic {
  position: relative;
  overflow: hidden;
}
.btn-magic::after {
  content: 'VIP';
  position: absolute;
  background: linear-gradient(90deg, transparent, #fff, transparent);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: textShine 10s infinite;
}
@keyframes textShine {
  0% {
    opacity: 0;
    left: -50%;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    left: 150%;
  }
}

/* 开启GPU加速 */
.btn-magic {
  transform: translateZ(0);
  backface-visibility: hidden;
}
/* 减少动画负荷 */
@media (prefers-reduced-motion: reduce) {
  .btn-magic {
    animation: none;
  }
}
</style>
