<template>
<div>
	<md-list>
		<md-list-item @click='goList("all")' href="#">
      	所有事项
      </md-list-item>
      <md-list-item v-for="list in lists" @click="goList(list.title)" href="#">
      	{{ list.title }}
      	<span style="float: right">
      		<md-button @click="deleteList(list.title)" class="md-icon-button md-list-action">
				    <md-icon class="md-primary">restore_from_trash</md-icon>
				  </md-button>
      	</span>
      </md-list-item>
      <md-list-item v-if="isAdd" href="#">
      	<md-field>
			    <label>添加事项</label>
			    <md-input v-model="newTitle" @keyup.enter="addList"></md-input>
			  </md-field>
      </md-list-item>
      <md-list-item @click="isAdd = true" href="#">
      	+新建清单
      </md-list-item>
    </md-list>
</div>

</template>

<script>
import bus from '../assets/eventBus'

export default {
	data() {
		return {
			name: 'lsl',
			newTitle: '',
			isAdd: false
		}
	},
	computed: {
		lists() {
			return this.$store.getters.lists;
		}
	},
	methods: {
		addList() {
			let newList = {
				title: this.newTitle,
				count: 0
			}
			this.$store.commit('addList', newList)
			this.newTitle = "";
			this.isAdd = false
		},
		deleteList(title) {
      this.$store.commit('deleteList', title);
    },
		goList(title) {
      bus.$emit('LIstTitle', title)
    },
    toLogin() {
      this.$router.push('/');
    }
	}
}

</script>

<style>


</style>
