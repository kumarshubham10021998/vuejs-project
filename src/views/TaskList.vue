<template>
  <div class="container my-5">
    <h1 class="text-center">Task List App</h1>
    <TaskForm @add-task="addTask" />
    <TaskTable
      :tasks="tasks"
      @edit-task="openEditModal"
      @delete-task="deleteTask"
    />
  
    <div
      class="modal fade"
      id="editTaskModal"
      tabindex="-1"
      aria-labelledby="editTaskModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editTaskModalLabel">Edit Task</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
           
            <form v-if="selectedTask" @submit.prevent="updateTask">
              <div class="mb-3">
                <label for="editTitle" class="form-label">Title</label>
                <input
                  v-model="selectedTask.title"
                  id="editTitle"
                  type="text"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="editDescription" class="form-label">Description</label>
                <textarea
                  v-model="selectedTask.description"
                  id="editDescription"
                  class="form-control"
                  required
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="editPriority" class="form-label">Priority</label>
                <select
                  v-model="selectedTask.priority"
                  id="editPriority"
                  class="form-select"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="editDueDate" class="form-label">Due Date</label>
                <input
                  v-model="selectedTask.dueDate"
                  id="editDueDate"
                  type="date"
                  class="form-control"
                  required
                />
              </div>
              <button type="submit" class="btn btn-success w-100">Update Task</button>
            </form>
            <div v-else>
              <p class="text-danger">Error: No task selected for editing.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TaskForm from "../components/TaskForm.vue";
import TaskTable from "../components/TaskTable.vue";
import * as bootstrap from "bootstrap"; 

export default {
  components: { TaskForm, TaskTable },
  data() {
    return {
      tasks: [],
      selectedTask: null, 
    };
  },
  methods: {
    loadTasks() {
      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      this.tasks = storedTasks;
    },
    saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    addTask(task) {
      this.tasks.push(task);
      this.saveTasks();
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
      this.saveTasks();
    },
    openEditModal(task) {
      // Ensure selectedTask is copied and not mutated directly
      this.selectedTask = { ...task };

      // Use $nextTick to wait for Vue DOM updates before opening the modal
      this.$nextTick(() => {
        if (this.selectedTask) {
          const modalElement = document.getElementById("editTaskModal");

         
          if (modalElement) {
            const modal = new bootstrap.Modal(modalElement);
            modal.show();  
          }
        }
      });
    },
    updateTask() {
      if (this.selectedTask && this.selectedTask.id) {
        const index = this.tasks.findIndex((task) => task.id === this.selectedTask.id);
        if (index !== -1) {
          this.tasks.splice(index, 1, this.selectedTask); 
          this.saveTasks(); 
        }
      }
     
      const modalElement = document.getElementById("editTaskModal");
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
      }
    },
  },
  mounted() {
    this.loadTasks(); 
  },
};
</script>

<style scoped>

</style>
