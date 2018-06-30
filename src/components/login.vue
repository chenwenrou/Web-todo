<template>

<div class="app-location">
  <md-dialog :md-active.sync="showDialog" style="padding: 50px">
    <md-dialog-title>Preferences</md-dialog-title>
    信息输入有误！
    <md-dialog-actions>
      <md-button class="md-primary" @click="showDialog = false">Close</md-button>
    </md-dialog-actions>
  </md-dialog>

  <div class="md-layout-item md-layout md-gutter">
    <div class="md-layout-item">
      <md-field>
        <label>Username</label>
        <md-input v-model="username" md-counter="30"></md-input>
      </md-field>

      <md-field>
        <label>Password</label>
        <md-input type="password" v-model="password" md-counter="30"></md-input>
      </md-field>

      <md-button @click="checkLogin" class="md-primary">登陆</md-button>
    </div>
  </div>



</div>

</template>

<script>

export default{
  data() {
    return {
      username: '',
      password: '',
      showDialog: false,
      isLogin: false
    }
  },
  computed: {
    users() {
      return this.$store.getters.users;
    }
  },
  methods: {
    showModal () {
      this.$refs.myModalRef.show()
    },
    hideModal () {
      this.$refs.myModalRef.hide()
    },
    checkLogin() {
      if ( this.username === 'Mayday' && this.password === 'chenxinhong1206') {
        this.$router.push('/todo');
      }else {
        this.showDialog = true;
      }
    }
  }
}

</script>

<style>
.app-location {
  width: 500px;
  margin: 200px auto;
}



</style>
