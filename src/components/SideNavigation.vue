<template>
  <el-container class="nav-area">
    <EasyScrollbar style="width: 100%;" :barOption="navScrollOption">
      <div id="wrapper">
        <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#f0f5f6"
        text-color="#666"
        active-text-color="#333"
        unique-opened>
          <el-submenu v-for="(parentBtn,parentBtnIndex) in parentBtns" :key="parentBtn.title" :index="'x'+parentBtnIndex">
            <template slot="title">
                <i class="fa" :class="parentBtn.icon"></i>
                <span>{{parentBtn.title}}</span>
            </template>
            <router-link v-for="(childrenBtn,childrenBtnIndex) in parentBtn.childrenBtns" :key="childrenBtn.title" :to="'/'+childrenBtn.link">
                <el-menu-item  :index="parentBtnIndex+'-'+childrenBtnIndex">
                    <i class="fa" :class="childrenBtn.icon"></i>{{childrenBtn.title}}
                </el-menu-item>
            </router-link>
            <!-- <el-menu-item-group>
                <el-menu-item  v-for="(childrenBtn,index) in parentBtn.childrenBtns" :key="childrenBtn.title"><i class="fa" :class="childrenBtn.icon"></i>{{childrenBtn.title}}</el-menu-item>
            </el-menu-item-group> -->
            <!-- <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group> -->
            <!-- <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu> -->
          </el-submenu>
        </el-menu>
      </div>
    </EasyScrollbar>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      // 左侧导航栏滚动条参数设定
      navScrollOption: {
        barOpacityMin: 0.2,
        autohidemode: true,
        horizrailenabled: false
        // barColor:"#959595",   //滚动条颜色
        // barWidth:6,           //滚动条宽度
        // railColor:"#eee",     //导轨颜色
        // barMarginRight:0,     //垂直滚动条距离整个容器右侧距离单位（px）
        // barMaginBottom:0,     //水平滚动条距离底部距离单位（px）
        // barOpacityMin:0.3,      //滚动条非激活状态下的透明度
        // zIndex:"auto",        //滚动条z-Index
        // autohidemode:true,     //自动隐藏模式
        // horizrailenabled:true,//是否显示水平滚动条
      },
      parentBtns: [{
        icon: 'fa-compass',
        title: '我的面板',
        childrenBtns: [
          {icon: 'fa-bar-chart', title: '待办事宜', link: 'information'},
          {icon: 'fa-podcast', title: '数据概览', link: ''},
          {icon: 'fa-university', title: '资源统计', link: ''},
          {icon: 'fa-file-archive-o', title: '需求管理', link: ''},
          {icon: 'fa-unlock', title: '密码修改', link: 'setting-password'}
        ]
      }, {
        icon: 'fa-google-wallet',
        title: '我的资产',
        childrenBtns: [
          {icon: 'fa-life-ring', title: '信息系统', link: ''},
          {icon: 'fa-database', title: '数据库', link: ''},
          {icon: 'fa-table', title: '数据表', link: ''},
          {icon: 'fa-th-list', title: '数据字段', link: ''},
          {icon: 'fa-vimeo', title: '资产关系', link: ''}
        ]
      }, {
        icon: 'fa-paypal',
        title: '我的目录',
        childrenBtns: [
          {icon: 'fa-bar-chart', title: '信息资源', link: ''},
          {icon: 'fa-database', title: '信息项', link: ''},
          {icon: 'fa-search', title: '目录检索', link: ''}
        ]
      }, {
        icon: 'fa-paragraph',
        title: '我的标准',
        childrenBtns: [
          {icon: 'fa-retweet', title: '频率分析', link: ''},
          {icon: 'fa-cog', title: '数据元池管理', link: ''},
          {icon: 'fa-building', title: '数据元重复清洗', link: ''},
          {icon: 'fa-table', title: '数据元同义清洗', link: ''},
          {icon: 'fa-rss-square', title: '公共数据元池', link: ''}
        ]
      }, {
        icon: 'fa-list-alt',
        title: '目录体系',
        childrenBtns: [
          {icon: 'fa-file-image-o', title: '资源目录', link: ''},
          {icon: 'fa-rss-square', title: '共享开放目录', link: ''},
          {icon: 'fa-bar-chart', title: '需求目录', link: ''}
        ]
      }, {
        icon: 'fa-connectdevelop',
        title: '系统配置',
        childrenBtns: [
          {icon: 'fa-tumblr', title: '表单配置', link: ''},
          {icon: 'fa-table', title: '字典配置', link: ''},
          {icon: 'fa-bars', title: '菜单管理', link: ''},
          {icon: 'fa-paypal', title: '权限管理', link: ''},
          {icon: 'fa-bookmark', title: '权限规则', link: ''},
          {icon: 'fa-address-card-o', title: '角色管理', link: ''},
          {icon: 'fa-building-o', title: '机构设置', link: ''},
          {icon: 'fa-user-circle', title: '用户管理', link: ''}
        ]
      }, {
        icon: 'fa-slideshare',
        title: '系统监控',
        childrenBtns: [
          {icon: 'fa-hand-spock-o', title: '操作日志', link: ''},
          {icon: 'fa-clock-o', title: '连接池监控', link: ''}
        ]
      }]
    }
  }
}
</script>

<style>
.el-aside .fa {
  padding-right: 10px;
  font-size: 16px;
  width: 25px;
}
.nav-area,.easy-scrollbar__wrap,#wrapper{
  height: 100%;
}
.el-submenu__title{
  height: 40px;
  line-height: 40px;
}
/* .el-submenu__title:hover,.el-menu-item:focus, .el-menu-item:hover{
    background-color: #d1dbe5;
} */
.el-submenu .el-menu-item{
  height: 34px;
  line-height: 34px;
}
.el-menu-item.is-active,.el-submenu.is-active>.el-submenu__title{
  background-color: #d1dbe5!important;
}
</style>
