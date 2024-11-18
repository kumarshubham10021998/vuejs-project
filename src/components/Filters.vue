<template>
    <div class="row g-3 my-4">
      <div class="col">
        <select v-model="filters.priority" class="form-select">
          <option value="">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <div class="col">
        <input
          v-model="filters.search"
          type="text"
          class="form-control"
          placeholder="Search Title or Description"
        />
      </div>
      <div class="col">
        <button @click="$emit('apply-filters', filters)" class="btn btn-primary w-100">
          Apply Filters
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        filters: {
          priority: "",
          search: "",
        },
      };
    },
  };
  </script>
  