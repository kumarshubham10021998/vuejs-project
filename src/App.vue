<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <!-- Brand Name -->
        <a class="navbar-brand text-lg font-bold" href="#">Task Management App</a>

        <!-- Toggler for Mobile View -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navigation Links -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link
                to="/"
                class="nav-link"
                active-class="active"
                exact
              >
                Task List
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/users"
                class="nav-link"
                active-class="active"
              >
                User List
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Main Content Area -->
    <div class="container mt-4">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* Global Styles */
body {
  font-family: "Arial", sans-serif;
}
.navbar-brand {
  font-weight: bold;
}
</style>
