import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import SignUpPage from "@/views/SignUpPage.vue";
import SignInPage from "@/views/SignInPage.vue";



const routes = [
    {
        path: "/",
        name: "HomePage",
        component: HomePage	
    },

    {
        path: "/signup",
        name: "SignUpPage",
        component: SignUpPage	
    },

    {
        path: "/login",
        name: "SignInPage",
        component: SignInPage	
    }
]


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL), routes
   
})
export default router;