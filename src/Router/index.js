import { createRouter, createWebHistory } from "vue-router"


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: () => import("../views/Home.vue")

        },
        {
            path: "/login",
            component: () => import("../views/Login.vue")

        },
        {
            path: "/register",
            component: () => import("../views/Register.vue")

        },
        {
            path: "/category/create",
            component: () => import("../views/CategoryCreate.vue")

        },
        {
            path: "/categories",
            component: () => import("../views/CategoriesList.vue")

        },
        {
            path: "/category/edit/:id",
            component: () => import("../views/CategoryEdit.vue"),
            props :true
        }

    ]
})

export default router;