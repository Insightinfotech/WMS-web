<template>
  <div class="message">
    <el-card style="width:18%;height:10%">
      <div class="box_one">
        <div class="box_userimage">
          <img class="userimg" :src="url" alt="" />
        </div>
        <div class="box_Versioning">
          <p>Version:1.2.2</p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import pufu from "../../assets/images/shemu01.jpg";
export default {
  data() {
    return {
      url: pufu
    };
  }
};
</script>
<style lang="scss" scoped>
.message {
  .box_one {
    display: flex;
    height: 100px;
    // flex: 1;
  }
  .box_userimage {
    width: 150px;
    height: 100px;
    img {
      width: 100%;
      height: 100%;
      text-align: center;
      box-sizing: border-box;
      vertical-align: middle;
      // display: block;
    }
  }
  .box_Versioning {
    font-size: 20px;
    font-weight: bold;
    color: rgb(161, 154, 154);
    // margin-left: 10px;
    line-height: 100px;
    p {
      margin: 0;
    }
  }
}
</style>
