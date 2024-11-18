<template>
    <form @submit.prevent="addTask" class="p-4 border rounded-md">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input
          v-model="task.title"
          id="title"
          type="text"
          class="form-control"
          placeholder="Enter task title"
          required
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea
          v-model="task.description"
          id="description"
          class="form-control"
          placeholder="Enter task description"
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="priority" class="form-label">Priority</label>
        <select v-model="task.priority" id="priority" class="form-select">
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="dueDate" class="form-label">Due Date</label>
        <input
          v-model="task.dueDate"
          id="dueDate"
          type="date"
          class="form-control"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary w-100">Add Task</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        task: {
          title: "",
          description: "",
          priority: "Medium",
          dueDate: "",
        },
      };
    },
    methods: {
      addTask() {
        this.$emit("add-task", { ...this.task, id: Date.now() });
        this.task = { title: "", description: "", priority: "Medium", dueDate: "" };
      },
    },
  };
  </script>
  