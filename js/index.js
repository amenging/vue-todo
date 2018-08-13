Vue.directive('focus', {
	inserted (el, {value}) {
		console.log(value)
		if (value) {
			el.focus()
		}
	}
})

// 应用
Vue.component('todo-app', {
	props: {
		'todos': {
			type: Array
		}
	},
	template: `
		<div>
			<slot></slot>
			<slot
				name='content'
				v-for='(todo, index) in todos'
				:index='index'
				:todo='todo'></slot>
		</div>
	`
})

// 标题列表
Vue.component('todo-title', {
	props: {
		'todo': {
			type: Object
		},
		title: {
			type: Number || String
		},
		index: {
			type: Number
		}
	},
	template: `
		<li @click.self='handleListTitle(index)' :class='{"titleActive": index == title}'>
			{{todo.name}}
			<span class='deleteList' @click='deleteList(index)'>
				<i class='iconfont icon-delete'></i>
			</span>
			<span class='editList' @click='editList(index)'>
				<i class='iconfont icon-edit'></i>
			</span>
		</li>
	`,
	methods: {
		handleListTitle (index) {
			this.$emit('handlelisttitle', index)
		},
		editList (index) {
			this.$emit('editlist', index)
		},
		deleteList (index) {
			this.$emit('deletelist', index)
		}
	}
})

// 清单列表
Vue.component('list', {
	props: {
		lists: {
			type: Array,
			default () {
				return []
			}
		},
		count: {
			type: [Number, String]
		},
		title: {
			type: [Number, String]
		},
		inputval: {
			type: [Number, String]
		},
		editval: {
			type: [Number, String]
		},
		editindex: {
			type: [Number, String]
		},
		choosetab: {
			type: [Number, String]
		}
	},
	 // v-if='lists.length > 0'
	template: `
		<div class='todo-list' v-if='count == title'>
			<slot></slot>
			<ul>
				<li v-for='(list, index) in lists' :class='{ "checked": list.status == 1 }'>
					<input
						class='editInput'
						v-if='editIndex == index && list.status == 0'
						v-model='editValue'
						v-focus='editIndex == index'
						@blur='confirmEdit(index)'
						@keyup.enter='confirmEdit(index)'/>
					<div class='checkRadio'>
						<i 
							@click='click(index)' 
							:class='["iconfont", list.status == 1 ? check : uncheck]'></i>
					</div>
					<div>
						<span
							@click='editItem(index)'
							class='listContent'>{{ list.content }}</span>
					</div>
					<div>
						<span
							@click='deleteItem(index)'
							class='deleteItem'>
							<i class='iconfont icon-delete'></i>
						</span>
					</div>
				</li>
				<div v-if='lists.length == 0' class='tips'>啥都木有哦(*/ω＼*)</div>
				<input
					v-if='choosetab == 0'
					v-model='val'
					@keyup.enter='addNewItem'
					class='addNewItem'
					placeholder='输入后enter新增'></input>
			</ul>
		</div>
	`,
	data () {
		return {
			choose: [],
			check: "icon-check",
			uncheck: "icon-weixuanyuanquan",
			val: this.inputval,
			editValue: this.editval,
			editIndex: this.editindex,
			// ifCanEdit: ''
		}
	},
	computed: {
		// ifCanEdit () {
		// 	return 
		// }
		// ifFocus () {
			// return this.
		// }
		// val () {
		// 	return this.inputVal
		// }
		// editIndexNow () {
		// 	return this.editIndex
		// }
	},
	watch: {
		inputval () {
			this.val = this.inputval
		},
		editval () {
			this.editValue = this.editval
		},
		editindex () {
			this.editIndex = this.editindex
		}
	},
	methods: {
		click (index) {
			this.$emit('changestatus', index)
		},
		editItem (index) {
			// this.editIndex = index
			this.$emit('edititem', index)
		},
		deleteItem (index) {
			this.$emit('deleteitem', index)
		},
		addNewItem () {
			this.$emit('addnewitem', this.val)
			this.val = ''
		},
		confirmEdit (index) {
			this.$emit('confirmedit', { index, val: this.editValue })
		}
	}
})

// Vue.dialog
Vue.component('todo-dialog', {
	props: {
		listdata: {
			type: [Object, String]
		}
	},
	data () {
		return {
			editListValue: this.listdata.name || '',
			online: this.listdata.online == false ? false : true
		}
	},
	template: `
		<div class='dialog'>
			<div class='dialog-body'>
				<div class='dialog-header'></div>
				<div class='dialog-content'>
					<div>
						<label>清单名称</label>
						<input @keyup.enter='confirmList' v-model='editListValue' />
					</div>
					<div>
						<label>云端同步</label>
						<input v-model='online' type='checkbox' />
					</div>
				</div>
				<div class='dialog-footer'>
					<button @click='cancel'>取消</button>
					<button @click='submit'>确认</button>
				</div>
			</div>
		</div>
	`,
	methods: {
		confirmList () {

		},
		cancel () {
			this.$emit('cancel')
		},
		submit () {
			this.$emit('submitlist', {
				name: this.editListValue,
				online: this.online
			})
		},
	},
	computed: {
		// online () {
		// 	// return this.listData.online
		// }
	}
})

// 标签切换
Vue.component('todo-tab', {
	props: {
		titles: {
			type: Array
		}, 
		choosetab: {
			type: [Number, String]
		}
	},
	template: `
		<div class='todo-tab'>
			<div
				:class="['tab-item', index == choosetab ? 'tab-active': '']"
				@click='tabChange(index)' 
				v-for='(title, index) in titles'>
				{{title}}
			</div>
		</div>
	`,
	methods: {
		tabChange (index) {
			this.$emit('tabchange', index)
		}
	}
})


const Todo = new Vue({
	el: '#app',
	data: {
		todoData: [],
		// todos: [],
		titles: ['全部', '未完成', '已完成'],
		title: 0,
		inputVal: '',
		editVal: '',
		editIndex: null,
		listData: '',
		showDialog: false,
		chooseTab: 0,
		searchValue: ''
	},
	methods: {
		changeStatus (i) {
			var list = this.todoData.todos[this.title].lists[i]
			list.status = Math.abs(list.status - 1)
		},
		handleListTitle (i) {
			this.title = i
		},
		addNewList () {
			this.showDialog = true
		},
		editList (i) {
			this.title = i
			this.listData = this.todoData.todos[i]
			this.showDialog = true
		},
		deleteList (i) {
			this.todoData.todos.splice(i, 1)
		
			if (this.title == i && !this.todoData.todos[i]) {
				this.title = i - 1
			}
		},

		addNewItem (val) {
			this.todoData.todos[this.title].lists.push({
				content: val,
				status: 0
			})
		},
		editItem (i) {
			this.editVal = this.todoData.todos[this.title].lists[i].content
			this.editIndex = i
		},
		deleteItem (i) {
			this.todoData.todos[this.title].lists.splice(i, 1)
		},
		confirmEdit (data) {
			this.editIndex = null
			this.todoData.todos[this.title].lists[data.index].content = data.val
		},
		cancel () {
			this.showDialog = false
		},
		submitList (data) {
			if (this.listData) {
				this.todoData.todos[this.title].name = data.name
				this.todoData.todos[this.title].online = data.online
			} else {
				this.todoData.todos.push({
					name: data.name,
					online: data.online,
					lists: []
				})
				this.title = this.todoData.todos.length - 1
			}
			this.listData = ''
			this.showDialog = false
		},
		tabChange (i) {
			this.chooseTab = i
		},
		search () {

		},
		clearSearchValue () {
			this.searchValue = ''
		}
	},
	watch: {
		// chooseTab: function (e) {
		// 	console.log(e)
		// 	if (e == 0) {
		// 		console.log(this.todoData.todos)
		// 		this.todos = this.todoData.todos
		// 	} else {
		// 		// this.todos = []
		// 		this.todos[this.title].lists = []
		// 	}
			
		// }
	},
	computed: {
		todos () {
			if (this.chooseTab == 0) {
				return this.todoData.todos
			} else {
				var todoList = JSON.parse(JSON.stringify(this.todoData.todos))
				var arr = todoList[this.title].lists.filter(ele => {
					// console.log(ele.status, this.chooseTab)
					return (ele.status + 1) == this.chooseTab
				})
				todoList[this.title].lists = arr
				// console.log(todoList)
				return todoList
				// this.todos[this.title].lists = todoList
				// return this.todos
				// return this.todoData.todos.filter(ele => {
				// 	return ele.status + 1 == this.chooseTab
				// })
			}
			// return this.todoData.filter((ele))
		}
	},
	mouted () {},
	created () {
		var todoData = {
			todos: [
			// 	{
			// 		name: '学习计划1',
			// 		lists: [
			// 			{
			// 				content: '学习学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1学习计划1计划1',
			// 				status: 0
			// 			}
			// 		],
			// 		online: true
			// 	},
			// 	{
			// 		name: '学习计划2',
			// 		lists: [
			// 			{
			// 				content: '学习计划1',
			// 				status: 0
			// 			},
			// 			{
			// 				content: '学习计划1',
			// 				status: 0
			// 			}
			// 		],
			// 		online: false
			// 	}
			]
		}
		this.todoData = todoData
		// this.todos = todoData.todos
	}
})