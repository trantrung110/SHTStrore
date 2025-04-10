import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
      path: "/:pathMatch(.*)*",
      name: "notfound",
      component: () => import("@/views/customer/NotFound.vue"),
  },
  {
    path: "/admin/signup",
    name: "admin.signup",
    component: () => import("@/views/admin/SignUp.vue"),
  },
  {
    path: "/admin/signin",
    name: "admin.signin",
    component: () => import("@/views/admin/SignIn.vue"),
  },

  //ADMIN
  {
    path: "/admin",
    component: () => import("@/components/admin/AdminHomePage.vue"),
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("token");
      const isAuthenticatedAdmin = JSON.parse(
        localStorage.getItem("AdminAuthenticated")
      );
      const isAuthenticatedSale = JSON.parse(
        localStorage.getItem("SaleAuthenticated")
      );
      const isAuthenticatedStaff = JSON.parse(
        localStorage.getItem("StaffAuthenticated")
      );
      if (
        isAuthenticatedAdmin &&
        isAuthenticatedAdmin.isAuthenticatedAdmin === true &&
        token
      ) {
        // Nếu là admin, cho phép truy cập tất cả các route
        next();
      } else if (
        isAuthenticatedSale &&
        isAuthenticatedSale.isAuthenticatedSale === true &&
        token
      ) {
        // Nếu là sale, chỉ cho phép truy cập các route order
        const isOrderRoute =
          to.name === "admin.order.all" ||
          to.name === "admin.order.detail" ||
          to.name === "admin.dashboard.show";
        if (isOrderRoute) {
          next();
        } else {
          next({ name: "admin.signin" });
        }
      } else if (
        isAuthenticatedStaff &&
        isAuthenticatedStaff.isAuthenticatedStaff === true &&
        token
      ) {
        // Nếu là staff, chỉ cho phép truy cập các route product
        const isOrderRoute =
          to.name === "admin.category.all" ||
          to.name === "admin.category.add" ||
          to.name === "admin.category.edit" ||
          to.name === "admin.product.all" ||
          to.name === "admin.product.add" ||
          to.name === "admin.product.edit" ||
          to.name === "admin.dashboard.show";
        if (isOrderRoute) {
          next();
        } else {
          next({ name: "admin.signin" });
        }
      } else {
        next({ name: "admin.signin" });
      }
    },
    children: [
      {
        path: "/admin/dashboard",
        name: "admin.dashboard.show",
        component: () => import("@/views/admin/DashBoardOverView.vue"),
      },
      {
        path: "/admin/category",
        name: "admin.category.all",
        component: () => import("@/views/admin/CategoryOverView.vue"),
      },
      {
        path: "/admin/category",
        name: "admin.category.add",
        component: () => import("@/views/admin/CategoryAdd.vue"),
      },

      {
        path: "/admin/category/:id",
        name: "admin.category.edit",
        component: () => import("@/views/admin/CategoryEdit.vue"),
        props: true,
      },
      {
        path: "/admin/product",
        name: "admin.product.all",
        component: () => import("@/views/admin/ProductOverView.vue"),
      },

      {
        path: "/admin/product",
        name: "admin.product.add",
        component: () => import("@/views/admin/ProductAdd.vue"),
      },

      {
        path: "/admin/product/:id",
        name: "admin.product.edit",
        component: () => import("@/views/admin/ProductEdit.vue"),
        props: true,
      },
      {
        path: "/admin/customer",
        name: "admin.customer.all",
        component: () => import("@/views/admin/CustomerOverView.vue"),
      },
      {
        path: "/admin/employee",
        name: "admin.all",
        component: () => import("@/views/admin/EmployeeOverView.vue"),
      },

      {
        path: "/admin/order",
        name: "admin.order.all",
        component: () => import("@/views/admin/OrderOverView.vue"),
      },

      {
        path: "/admin/order/:id",
        name: "admin.order.detail",
        component: () => import("@/views/admin/OrderDetail.vue"),
        props: true,
      },
    ],
  },

  //KHÁCH HÀNG
  {
    path: "/",
    component: () => import("@/views/customer/CustomerPage.vue"),
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("@/components/customer/Home.vue"),
      },
      {
        path: "/product",
        name: "product",
        component: () => import("@/views/customer/Product.vue"),
      },
      {
        path: "/product/:id",
        name: "product.detail",
        component: () => import("@/views/customer/ProductDetail.vue"),
        props: true,
      },
      {
        path: "/about",
        name: "about",
        component: () => import("@/views/customer/About.vue"),
      },
      {
        path: "/cart",
        name: "cart",
        component: () => import("@/views/customer/Cart.vue"),
      },
      {
        path: "/order",
        name: "order",
        component: () => import("@/views/customer/Order.vue"),
      },
      {
        path: "/signup",
        name: "signup",
        component: () => import("@/views/customer/SignUp.vue"),
      },
      {
        path: "/signin",
        name: "signin",
        component: () => import("@/views/customer/SignIn.vue"),
      },
      {
        path: "/order/:id",
        name: "customer.order.detail",
        component: () => import("@/views/customer/OrderDetail.vue"),
        props: true,
      },
      {
        path: "/changepass/:id",
        name: "customer.changepass",
        component: () => import("@/views/customer/ChangePassword.vue"),
        props: true,
      },
      {
        path: "/account/:id",
        name: "customer.infor",
        component: () => import("@/views/customer/AccountInfor.vue"),
        props: true,
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// router.beforeEach((to, from, next) => {
//     const token = localStorage.getItem("token");
//     //Nếu cố gắng ra khỏi trang signin,signup, notfound thì quay về signin
//     if (to.name !== "admin.signin" && to.name !== "admin.signup" && to.name !== "notfound" && !token)
//         next({ name: "admin.signin" });
//     else
//         next();
// });

export default router;
