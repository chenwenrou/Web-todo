<template>
<div>

	<md-button class="md-primary" @click="showDialog = true">添加事项</md-button>
	<md-button class="md-primary" @click="sortbydate">排序</md-button>
	<md-dialog :md-active.sync="showDialog" style="padding: 20px">

	  <md-dialog-title>添加事项</md-dialog-title>
		     <md-input v-model="newText" placeholder='请输入事项名称'></md-input>
		    <div>
		      <md-datepicker v-model="newDate" md-immediately>
		        <label>Select date</label>
		      </md-datepicker>
		    </div>
		    <md-field>
		      <label>Description</label>
		      <md-textarea v-model="newDescription" required></md-textarea>
		    </md-field>
		  <md-dialog-actions>
		    <md-button class="md-primary" @click="showDialog = false">Close</md-button>
		    <md-button class="md-primary" @click="addItem">Save</md-button>
		  </md-dialog-actions>
	</md-dialog>
	<md-field>
    <label>Search</label>
    <md-input v-model="searchinfo" @keyup.enter="toSearch"></md-input>
  </md-field>
	<md-list class="md-triple-line">
		<md-list-item v-for="item in items">
		  <md-avatar>
		    <img src="https://placeimg.com/40/40/people/1" alt="People">
		  </md-avatar>

		  <div class="md-list-item-text">
		    <span v-if="isedit === false">{{ item.text }}</span>
		    <span v-if="isedit === true">
		    	<md-field>
				    <label>添加事项</label>
				    <md-input v-model="item.text" @keyup.enter="editItem(item.text);isedit = false"></md-input>
				  </md-field>
		    </span>
		    <span>{{ item.date }}</span>
		    <p>{{ item.description }}</p>
		  </div>

		  <md-button v-if="!item.isfinished" @click="item.isfinished = true;editItem(item.text)" class="md-icon-button md-list-action">
		    <md-icon class="md-primary">done</md-icon>
		  </md-button>

		  <md-button v-if="item.isfinished" class="md-icon-button md-list-action">
		    <md-icon class="md-primary" >star</md-icon>
		  </md-button>

		  <md-button @click="isedit = true" class="md-icon-button md-list-action">
		    <md-icon class="md-primary">border_color</md-icon>
		  </md-button>

		  <md-button @click="deleteItem(item.text)" class="md-icon-button md-list-action">
		    <md-icon class="md-primary">restore_from_trash</md-icon>
		  </md-button>

		</md-list-item>

	</md-list>

</div>

</template>

<script>
import bus from '../assets/eventBus'

const toLower = text => {
  return text.toString().toLowerCase()
}

const searchByName = (items, term) => {
  if (term) {
    console.log(term)
    return items.filter(item => toLower(item.text).includes(toLower(term)))
  }
  return items
}

const sortbydate = (items) => {
  items.sort(function(a,b){
        return a.date > b.date
  });
  return items;
}

export default {
	data() {
		return {
			title: '',
			newText: '',
			newDate: '',
			newDescription: '',
			searchinfo: '',
			isedit: false,
			showDialog: false,
			items: []
		}
	},
	computed: {
		allItems() {
			return this.$store.getters.items;
		}
	},
	created() {
    this.init();
  },
	methods: {
		init() {
			if (this.title === 'all') {
				this.items = this.$store.getters.items
			}else {
				this.items = this.$store.getters.getItemsbytitle(this.title);
			}
		},
		addItem() {
			let newItem = {
				text: this.newText,
				date: this.newDate,
				description: this.newDescription,
				belongto: this.title,
				isfinished: false,
			}
			this.$store.commit('addItem', newItem);
			this.init()
			this.newText  ="";
			this.showDialog = false;
			this.newDescription = '';
		},
		deleteItem(text) {
      this.$store.commit('deleteItem', text);
      this.init()
    },
    searchbytext() {
    	this.items = searchByName(this.$store.getters.items, this.searchinfo);
    },
    editItem(item) {
    	this.$store.commit('editItem', item);
    },
    toSearch() {
      this.items = searchByName(this.allItems, this.searchinfo)
    },
    sortbydate() {
      this.items = sortbydate(this.items);
    }
	},
	mounted() {
    var self = this;
    bus.$on('LIstTitle', function(msg) {
        self.title = msg;
        self.init()
    });
  }
}

</script>

<style>


</style>
