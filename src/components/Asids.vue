<template>
  <div class="asids">
    <div class="asids_tog" @click="getfoldUp">|||</div>
    <el-menu unique-opened class="el-menu-vertical-demo" background-color="#03132c" text-color="#fff" active-text-color="#FEBD69"
      :default-active="activeroute" :collapse="collapse" router :collapse-transition="false">
      <template v-for="(date,index) in menuDate">
        <el-submenu :key="index" :index="date.submenu.index" :style="collapse? 'width:64px':'width:200px'">
          <template slot="title">
            <i :class="date.submenu.titleIcon"></i>
            <span>{{date.submenu.text}}</span>
          </template>
          <template v-for="item in date.menuItemGroups">
            <el-menu-item :route="item1.route" :index="item1.index" v-for="(item1,index2) in item.menuItems"
              :key="index2">
              <i :class="item1.itemsIcon"></i>
              <span>{{item1.text}}</span>
            </el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        collapse: false,
        menuDate: [{
            submenu: {
              index: "system",
              titleIcon: "el-icon-s-tools",
              text: "系统管理"
            },
            menuItemGroups: [{
              menuItems: [{
                  index: "/home/system/roles",
                  route: {
                    path: "/home/system/roles"
                  },
                  itemsIcon: "el-icon-menu",
                  text: "权限管理"
                },
                {
                  index: "/home/system/unit",
                  route: {
                    path: "/home/system/unit"
                  },
                  itemsIcon: "el-icon-menu",
                  text: "单位字典"
                }
              ]
            }]
          },
          {
            submenu: {
              index: "warehouse",
              titleIcon: "el-icon-box",
              text: "库房信息管理"
            },
            menuItemGroups: [{
              menuItems: [{
                  index: "/home/warehouse/management",
                  route: {
                    path: "/home/warehouse/management"
                  },
                  itemsIcon: "el-icon-menu",
                  text: "仓库管理"
                },
                {
                  index: "/home/warehouse/reservoir",
                  route: {
                    path: "/home/warehouse/reservoir"
                  },
                  itemsIcon: "el-icon-menu",
                  text: "库区管理"
                },
                {
                  index: "/home/warehouse/parcel",
                  route: {
                    path: "/home/warehouse/parcel"
                  },
                  itemsIcon: "el-icon-menu",
                  text: "货架管理"
                }
              ]
            }]
          }

        ],

      }
    },
    methods: {
      getfoldUp() {
        this.collapse = !this.collapse
        this.$emit("isfolup", this.collapse)
      }
    },
    computed: {
      activeroute() {
        return this.$route.path
      }
    }
  }

</script>
<style lang="scss" scoped>
  .asids {
    height: 100%;

    .el-menu {
      border: none;
    }

    .asids_tog {
      text-align: center;
      font-size: 14px;
      line-height: 30px;
      color: #fff;
      letter-spacing: 0.3em;
      background-color: #03132c;
      cursor: pointer;
    }
  }

</style>
