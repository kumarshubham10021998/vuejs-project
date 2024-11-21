<template>
    <div class="container mx-auto p-4">
      <div class="row g-4 mb-4">
        <div class="col-md-6 col-lg-3">
          <label class="form-label block text-lg font-semibold">Search</label>
          <input 
            v-model="searchTerm" 
            type="text" 
            placeholder="Search tasks by title or description" 
            class="form-control border border-gray-300 p-2 rounded-lg shadow-sm" 
          />
        </div>
  
        <div class="col-md-6 col-lg-3">
          <label class="form-label block text-lg font-semibold">Priority</label>
          <select v-model="selectedPriority" class="form-select border border-gray-300 p-2 rounded-lg shadow-sm">
            <option value="">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
  
        <div class="col-md-6 col-lg-3">
          <label class="form-label block text-lg font-semibold">Status</label>
          <select v-model="selectedStatus" class="form-select border border-gray-300 p-2 rounded-lg shadow-sm">
            <option value="">All</option>
            <option value="Complete">Complete</option>
            <option value="Incomplete">Incomplete</option>
          </select>
        </div>
  
        <div class="col-md-6 col-lg-3">
          <label class="form-label block text-lg font-semibold">Due Date</label>
          <input 
            type="date" 
            v-model="selectedDate" 
            class="form-control border border-gray-300 p-2 rounded-lg shadow-sm" 
          />
        </div>
      </div>
      <div class="mb-4">
        <div class="flex items-center gap-4">
          <div class="flex flex-col md:flex-row gap-2">
            <label class="form-label block text-lg font-semibold">Sort by:</label>
            <select v-model="sortBy" class="form-select border border-gray-300 p-2 rounded-lg shadow-sm">
              <option value="title">Title (A-Z)</option>
              <option value="dueDate">Due Date (Ascending)</option>
              <option value="priority">Priority (High to Low)</option>
            </select>
          </div>
          <button 
            @click="toggleSortOrder" 
            class="btn btn-primary px-4 py-2 rounded-lg shadow-sm">
            Toggle Sort Order
          </button>
        </div>
      </div>
      <table class="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in paginatedTasks" :key="task.id">
            <td v-html="highlightSearchTerm(task.title)"></td>
            <td v-html="highlightSearchTerm(task.description)"></td>
            <td>{{ task.priority }}</td>
            <td>{{ task.status }}</td>
            <td>{{ task.dueDate }}</td>
            <td>
              <button @click="$emit('edit-task', task)" class="btn btn-warning btn-sm me-2">Edit</button>
              <button @click="$emit('delete-task', task.id)" class="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination-controls text-center mt-4">
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" class="btn btn-secondary">Previous</button>
        <span class="mx-3">Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages" class="btn btn-secondary">Next</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ["tasks"], 
  
    data() {
      return {
        searchTerm: "",
        selectedPriority: "",
        selectedStatus: "",
        selectedDate: "",
        sortBy: "title", 
        sortOrder: "asc", 
        currentPage: 1,
        tasksPerPage: 5,
      };
    },
  
    computed: {
      filteredTasks() {
        return this.tasks.filter(task => {
          
          const matchesSearch =
            (task.title.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
            task.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            task.priority.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
            task.status.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
            task.dueDate.toLowerCase().includes(this.searchTerm.toLowerCase())); 
  
          const matchesPriority = this.selectedPriority ? task.priority === this.selectedPriority : true;
          
          const matchesStatus = this.selectedStatus ? task.status === this.selectedStatus : true;
          const matchesDueDate = this.selectedDate ? task.dueDate === this.selectedDate : true;
  
          return matchesSearch && matchesPriority && matchesStatus && matchesDueDate;
        });
      },
  
      sortedTasks() {
        let sorted = [...this.filteredTasks];
        if (this.sortBy === "title") {
          sorted.sort((a, b) => a.title.localeCompare(b.title));
        } else if (this.sortBy === "dueDate") {
          sorted.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        } else if (this.sortBy === "priority") {
          const priorityOrder = { High: 3, Medium: 2, Low: 1 };
          sorted.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
        }
  
        if (this.sortOrder === "desc") {
          sorted.reverse();
        }
  
        return sorted;
      },
  

      paginatedTasks() {
        const start = (this.currentPage - 1) * this.tasksPerPage;
        const end = start + this.tasksPerPage;
        return this.sortedTasks.slice(start, end);
      },
  
      totalPages() {
        return Math.ceil(this.sortedTasks.length / this.tasksPerPage);
      },
    },
  
    methods: {
      goToPage(page) {
        if (page >= 1 && page <= this.totalPages) {
          this.currentPage = page;
        }
      },
  
      toggleSortOrder() {
        this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      },
  
      highlightSearchTerm(text) {
        if (!this.searchTerm) return text;
        const regex = new RegExp(`(${this.searchTerm})`, "gi");
        return text.replace(regex, `<span class="highlight">$1</span>`);
      },
    },
  };
  </script>
  
  <style scoped>
  .highlight {
    background-color: yellow;
  }
  .pagination-controls {
    margin-top: 10px;
  }
  button[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
  </style>
  