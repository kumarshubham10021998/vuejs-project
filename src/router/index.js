import { createRouter, createWebHistory } from "vue-router";
import TaskList from "../views/TaskList.vue";
import UserList from "../views/UserList.vue";

const routes = [
  {
    path: "/",
    name: "TaskList",
    component: TaskList,
  },
  {
    path: "/users",
    name: "UserList",
    component: UserList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
