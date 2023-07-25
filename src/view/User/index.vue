<template>
  <div id='User'>
    <!-- 用户信息页 -->
    <div class="avatar">
        <van-image
            round
            fit="cover"
            class="avatarbox"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
    </div>
  </div>
</template>

<script lang='ts' setup>
 
</script>

<style lang='less' scoped>
#User {
    // 圆形渐变背景
    background-image:
    radial-gradient(
      circle at 50% 0%,
      var(--circle-bg-color3) 0%,
      var(--circle-bg-color3) 10%,
      var(--circle-bg-color) 50%,
      var(--circle-bg-color2) 80%
    );
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center, center center;
    height: 100vh;
    position: relative;
    .avatarbox {
        position: absolute;
        top: 15vh;
        left: 50%;
        transform: translateX(-50%);
        width: 100px;
        height: 100px;
        .van-image {
            // border: 1px solid var(--border-color);
            // box-shadow: 1px 1px 10px var(--border-color);
            vertical-align: middle;
        }
    }
}
</style>