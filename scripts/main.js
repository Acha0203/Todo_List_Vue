class Task {
	constructor(todoId, task, doneFlag) {
		this.todoId = todoId;
		this.task = task;
		this.doneFlag = doneFlag;
		this.next = null;
	}
}

class TodoList {
	static head = new Task(0, "dammy", false);

	static createTask(task) {
		TodoList.getLastTask().next = new Task(TodoList.getLastTask().todoId + 1, task, false);
	}

	static getLastTask() {
		let iterator = TodoList.head;

		while (iterator.next !== null) {
			iterator = iterator.next;
		}

		return iterator;
	}

	static deleteTask(todoId) {
		let iterator = TodoList.head;
		let preTrask = null;

		while (iterator.todoId !== todoId){
			preTrask = iterator;
			iterator = iterator.next;
		}

		preTrask.next = iterator.next;
	}

	static createTaskArray() {
		let taskArray = [];
		let iterator = TodoList.head.next;

		while (iterator !== null) {
			taskArray.push(iterator);
			iterator = iterator.next;
		}

		return taskArray;
	}

	static toggleFlag(todoId) {
		let iterator = TodoList.head;

		while (iterator.todoId !== todoId){
			iterator = iterator.next;
		}

		iterator.doneFlag = iterator.doneFlag ? false : true;
	}
}

new Vue({
	el: "#todo-list",
	data: {
		inputText: "",
		todoList: TodoList.head,
	},
	computed: {
		getTaskArray() {
			return TodoList.createTaskArray();
		},
		isTextEmpty() {
			return this.inputText.length === 0;
		},
		isTodoListEmpty() {
			return TodoList.createTaskArray().length === 0;
		},
	},
	methods: {
		createNewTask() {
			TodoList.createTask(this.inputText);
			this.inputText = "";
		},
		deleteTask(todoId) {
			TodoList.deleteTask(todoId);
		},
		toggleFlag(todoId) {
			TodoList.toggleFlag(todoId);
		},
	}
})