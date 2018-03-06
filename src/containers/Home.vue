<template>
  <el-container :style="{ height:'100%' }">
    <el-header :style="{ height:'80px' }">
      <el-row>
        <el-col :span="16" class="header-title-area">
          <img src="./../assets/img/logo-white.png" alt="" class="header-logo">
          <h1 class="grid-content bg-purple header-title">研究项目</h1>
        </el-col>
        <el-col :span="8" class="header-btn-area pull-right">
          <el-dropdown trigger="click" v-for="topBtn in topBtns" :key="topBtn.title">
            <span class="el-dropdown-link">
              <i class="fa" :class="topBtn.icon"></i>{{topBtn.title}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" class="dropdown-list">
              <el-dropdown-item v-for="list in topBtn.list" :key="list.text"><i class="el-icon-info el-icon--left"></i>{{list}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="header-btn">
            <span class="header-btn-text">
              <router-link to="/setting-password">
                <i class="fa fa-user-circle-o"></i>超级管理员
              </router-link>
            </span>
          </div>
          <div class="header-btn">
            <span class="header-btn-text">
              <i class="fa fa-times-circle-o"></i>注销
            </span>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="main-area">
      <el-aside :span='1' :style="{ width:'15%' }">
        <sidenav></sidenav>
      </el-aside>
      <el-main :span='23'>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideNav from '@/components/SideNavigation.vue'

export default {
  components: {
    'sidenav': SideNav
  },
  data () {
    return {
      // icon:按钮图标,title:按钮名称,badge:未读数量,list:下拉信息
      topBtns: [{
        icon: 'fa-envelope-o',
        title: '消息',
        badge: '3',
        list: [
          '信息资源有1条待审核',
          '信息资源有2条待审核',
          '信息资源有3条待审核'
        ]
      }, {
        icon: 'fa-question-circle-o',
        title: '帮助',
        badge: '',
        list: [
          '用户操作手册',
          '国家政务信息资源目录编制指南（试行）',
          '适配浏览器下载'
        ]
      }]
    }
  }
}
</script>

<style scoped>
.el-header, .el-footer {
  padding: 0;
  background-color: #005392;
  color: #fff;
  cursor: default;
}
.main-area{
  /* align-items: stretch; */
}
.el-aside {
  background-color: #f0f5f6;
  color: #333;
  line-height: 200px;
}

.el-main {
  background-color: #fafafa;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}
.header-title-area{
  text-align: left;
}
.header-btn-area{
  text-align: right;
}
.header-logo{
  display: inline-block;
  margin-left: 20px;
  vertical-align: top;
  padding: 18.5px 10px;
}
.header-title{
  display: inline-block;
  margin: 0;
  line-height: 80px;
  font-size: 30px;
}

.el-dropdown, .header-btn{
  display: inline-block;
  line-height: 80px;
  font-size: 1em;
  color: #fff;
  padding: 0 15px;
}
.el-dropdown:hover, .header-btn:hover{
  background-color: rgba(255,255,255,.2);
}
.el-dropdown-link > i:first-child, .header-btn-text > i:first-child{
  font-size: 1.6em;
  vertical-align: sub;
  margin-right: 5px;
}
.el-dropdown-link, .header-btn-text{
  display: inline-block;
  line-height: 3em;
  cursor: pointer;
}
.dropdown-list{
  margin: 0;
}
</style>
