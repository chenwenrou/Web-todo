<template>
  <div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-layout md-gutter">
        <div class="md-layout-item md-size-30">
          <md-button @click="toLogin" class="md-primary">注销</md-button>
        	<list></list>
        </div>
        <div class="md-layout-item">
        	<todo></todo>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import list from './list'
import todo from './todo'

export default {
  data() {
  	return {

  	}
  },
  components: {
  	list,
  	todo
  },
  methods: {
    toLogin() {
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>

</style>
