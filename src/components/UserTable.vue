<script>
import axios from "axios";

export default {
  data() {
    return {
      users: [],
      loading: true,
      error: null, // Keep this only if you want to display the error
      search: "",
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter((user) =>
        user.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  mounted() {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        this.users = response.data;
        this.loading = false;
      })
      .catch((err) => {
        this.error = "Failed to fetch users.";
        console.error(err); // Optional: Log the error to the console
        this.loading = false;
      });
  },
};
</script>
<template>
    <div class="container mx-auto p-4">
      <!-- Title -->
      <h1 class="text-2xl font-bold mb-4">User List</h1>
  
      <!-- Search Bar -->
      <div class="mb-4">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Search by Name or Email"
          class="form-control border border-gray-300 p-2 rounded-lg shadow-sm w-full"
        />
      </div>
  
      <!-- Loading Spinner -->
      <div v-if="isLoading" class="text-center my-4">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
  
      <!-- Error Message -->
      <div v-if="error" class="alert alert-danger text-center">
        {{ error }}
      </div>
  
      <!-- User Table -->
      <table v-if="!isLoading && !error && filteredUsers.length > 0" class="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.company.name }}</td>
            <td>
              <button @click="showUserDetails(user)" class="btn btn-primary btn-sm">
                View Details
              </button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- No Users Found -->
      <div v-if="!isLoading && !error && filteredUsers.length === 0" class="text-center text-gray-500">
        No users found.
      </div>
  
      <!-- User Details Modal -->
      <div v-if="selectedUser" class="modal fade show" tabindex="-1" style="display: block;" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">User Details</h5>
              <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="modal-body">
              <p><strong>Name:</strong> {{ selectedUser.name }}</p>
              <p><strong>Email:</strong> {{ selectedUser.email }}</p>
              <p><strong>Phone:</strong> {{ selectedUser.phone }}</p>
              <p><strong>Company:</strong> {{ selectedUser.company.name }}</p>
              <p><strong>Website:</strong> <a :href="'http://' + selectedUser.website" target="_blank">{{ selectedUser.website }}</a></p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
            </div>
          </div>
        </div>
        <div class="modal-backdrop fade show"></div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        users: [], // Stores the list of users
        isLoading: false, // Loading state
        error: null, // Error message
        searchTerm: "", // Search term for filtering
        selectedUser: null, // Selected user for details modal
      };
    },
    computed: {
      // Filter users by search term (Name or Email)
      filteredUsers() {
        if (!this.searchTerm) return this.users;
  
        const term = this.searchTerm.toLowerCase();
        return this.users.filter(
          (user) =>
            user.name.toLowerCase().includes(term) ||
            user.email.toLowerCase().includes(term)
        );
      },
    },
    methods: {
      // Fetch users from the API
      async fetchUsers() {
        this.isLoading = true;
        this.error = null;
  
        try {
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
          );
          this.users = response.data;
        } catch (err) {
          this.error = "Failed to fetch users. Please try again later.";
        } finally {
          this.isLoading = false;
        }
      },
      // Show user details in a modal
      showUserDetails(user) {
        this.selectedUser = user;
      },
      // Close the modal
      closeModal() {
        this.selectedUser = null;
      },
    },
    mounted() {
      // Fetch users on component mount
      this.fetchUsers();
    },
  };
  </script>
  
  <style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1040;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .modal {
    z-index: 1050;
  }
  </style>
  