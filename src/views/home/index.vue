<template>
  <el-container class="container-home">
    <el-aside :width="isOpen ? '64px' : '200px' ">
      <div class="logo" :class="{logoSmall : isOpen}"></div>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isOpen"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span @click="open" class="el-icon-s-fold icon"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <el-dropdown class="dropdown" @command='loginOut'>
          <span class="el-dropdown-link">
            <img :src="userPhoto" alt />
            <span>{{userName}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" command='0'>个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" command='1'>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import local from '@/utils/local'
import router from '@/router'
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      isOpen: false,
      userName: '',
      userPhoto: ''
    }
  },
  methods: {
    open () {
      this.isOpen = !this.isOpen
    },
    loginOut (command) {
      if (command === '0') {
        this.$message(command)
      } else {
        this.$confirm('确定要退出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          local.delUser()
          router.push('/login')
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
      }
    }
  },
  created () {
    let { name, photo } = local.getUser()
    this.userName = name
    this.userPhoto = photo
    // 更改用户名
    eventBus.$on('changeName', (data) => {
      this.userName = data
    })
    // 更改用户头像
    eventBus.$on('changePhoto', (data) => {
      this.userPhoto = data
    })
  }
}
</script>

<style scoped lang='less'>
.container-home {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside {
    background: #002033;
    .logo {
      width: 100%;
      height: 60px;
      background: #002344 url(../../assets/images/logo_admin.png) no-repeat
        center / 140px auto;
    }
    .logoSmall {
      background: url(../../assets/images/logo_admin_01.png) no-repeat center / 36px auto;
    }
    .el-menu {
      border-right: none;
    }
  }
  .el-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .icon {
      font-size: 30px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
    }
    .dropdown {
      float: right;
      img {
        width: 36px;
        display: inline-block;
        vertical-align: middle;
        margin: 0 5px 0 0;
      }
    }
  }
}
</style>
