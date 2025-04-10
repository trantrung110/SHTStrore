<template>
    <div class="container-fluid bg-primary py-3 d-none d-md-block">
        <div class="container">
            <div class="row">
                <div class="col-md-6 text-center text-lg-left mb-2 mb-lg-0">
                    <div class="d-inline-flex align-items-center pt-2">
                        <a class="text-white pe-3" href="">FAQs</a>
                        <span class="text-white">|</span>
                        <a class="text-white px-3" href="">Help</a>
                        <span class="text-white">|</span>
                        <a class="text-white ps-3" href=""> Support</a>
                    </div>
                </div>
                <div class="col-md-6 text-center text-lg-right">
                    <div class="d-inline-flex align-items-center">
                        <div>
                            <ProductSearch :products="products" @rerender:products="retrieveProducts" />
                        </div>

                        <a class="text-white px-3" href="">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a class="text-white px-3" href="">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a class="text-white ps-3" href="">
                            <i class="fab fa-youtube"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Topbar End -->


    <!-- Navbar Start -->
    <div class="container-fluid position-relative nav-bar p-0">
        <div class="container-lg position-relative p-0 px-lg-3" style="z-index: 9;">
            <nav class="navbar sticky-top navbar-expand-lg bg-white navbar-light shadow p-lg-0">
                <a href="/" class="navbar-brand d-block d-lg-none">
                    <h1 class="m-0 display-4 text-primary"><span class="text-secondary">SHT</span>Store</h1>
                </a>
                <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-between px-4" id="navbarCollapse">
                    <div class="navbar-nav ml-auto py-0">
                        <a href="/" class="nav-item nav-link">Trang chủ</a>
                        <a href="/about" class="nav-item nav-link">Giới thiệu</a>
                        <a href="/product" class="nav-item nav-link">Sản phẩm</a>

                    </div>
                    <a href="/" class="navbar-brand mx-5 d-none d-lg-block">
                        <h2 class="m-0 display-4 text-secondary"><span class="text-primary">SHT</span>Store</h2>
                    </a>
                    <div class="navbar-nav mr-auto py-0">
                        <div>
                            <router-link class="nav-item nav-link me-2" v-if="store.isAuthenticatedCustomer"
                                style="text-decoration: none;" :to="{ name: 'cart' }">🛒</router-link>
                            <span v-if="store.isAuthenticatedCustomer" class="badgecart">{{ cartLength }}</span>
                        </div>

                        <router-link v-if="!store.isAuthenticatedCustomer" class="nav-item nav-link"
                            :to="{ name: 'signin' }">👤Đăng nhập</router-link>

                        <router-link v-if="!store.isAuthenticatedCustomer" class="nav-item nav-link"
                            :to="{ name: 'signup' }">👤Đăng ký</router-link>

                        <router-link v-if="store.isAuthenticatedCustomer" class="nav-item nav-link"
                            :to="{ name: 'order' }">📋 Đơn Hàng</router-link>

                        <div v-if="store.isAuthenticatedCustomer">
                            <a href="#" class="dropdown-toggle nav-item nav-link" data-bs-toggle="dropdown" role="button"
                                aria-expanded="false">
                                <span>👤{{ username }}</span>
                            </a>

                            <ul class="dropdown-menu" role="menu">
                                <li class="px-2 mb-2 text-start">
                                    <router-link :to="{
                                        name: 'customer.infor',
                                        params: { id: userId },
                                    }">Tài khoản</router-link>
                                </li>
                                <li class="px-2 mb-2 text-start">
                                    <router-link :to="{
                                        name: 'customer.changepass',
                                        params: { id: userId },
                                    }">Đổi mật khẩu</router-link>
                                </li>
                                <li class="px-2 text-start">
                                    <a @click="signOut">Đăng xuất ➡️</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </div>
    <!-- Navbar End -->
</template>

<script>
import { useCustomerStore } from '@/stores/store';
import { defineComponent, reactive, ref, computed } from "vue";
import { useCartWatcher } from '@/stores/cart';
import { useRouter } from "vue-router"
import customerService from "@/services/customer.service";
import ProductSearch from "@/components/customer/Search.vue";
import ProductService from "@/services/product.service";
export default defineComponent({
    components: {
        ProductSearch,
    },
    setup() {
        const state = reactive({
            customer: [],
        });
        const store = useCustomerStore();
        const cart = useCartWatcher();
        const products = ref([]);
        const activeIndex = ref(-1);
        const user = JSON.parse(localStorage.getItem("user"));
        const retrieveProducts = async () => {
            try {
                products.value = await ProductService.all();
            } catch (error) {
                console.log(error);
            }
        };
        retrieveProducts();
        console.log(user);
        const cartLength = computed(() => cart.value.cart.length);
        const username = computed(() => cart.value.name);
        const userId = computed(() => cart.value._id);
        const customer = computed(() => cart.value);
        console.log('Cart length:', cart.value.cart);
        const router = useRouter();
        const retrieveCustomer = async () => {
            try {
                const customer = await customerService.getCustomer();
                state.customer = customer;
            } catch (error) {
                console.log(error);
            }
        };
        const signOut = async () => {
            try {
                const headers = {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                };
                await customerService.signOut({ headers });
                localStorage.removeItem('token');
                //localStorage.removeItem('user');
                store.setIsAuthenticatedCustomer(false);
                router.push({ name: 'home' });
            } catch (error) {
                console.log(error);
            }
        };
        retrieveCustomer();
        return {
            store,
            state,
            customer,
            username,
            cartLength,
            userId,
            signOut,
            retrieveCustomer,
            products,
            activeIndex,
            retrieveProducts,
        }
    },
});
</script>

<style>
.search-box {
    width: fit-content;
    height: fit-content;
    position: relative;
}

.input-search {
    height: 40px;
    width: 40px;
    border-style: none;
    padding: 1px;
    font-size: 16px;
    letter-spacing: 2px;
    outline: none;
    border-radius: 50%;
    box-shadow: 0 5px 10px #ffcbcb8a;
    transition: all .5s ease-in-out;
    background-color: #e44a6be4;
    padding-left: 30px;
    color: #fff;
}

.input-search::placeholder {
    color: rgba(255, 255, 255, 0.628);
    font-size: 17px;
    letter-spacing: 2px;
    font-weight: 100;
}

.btn-search {
    width: 40px;
    height: 40px;
    border-style: none;
    font-size: 18px;
    font-weight: bold;
    outline: none;
    cursor: pointer;
    border-radius: 50%;
    position: absolute;
    left: 0px;
    color: #ffffff;
    background-color: transparent;
    pointer-events: painted;
}

.btn-search:focus~.input-search {
    width: 300px;
    border-radius: 0px;
    background-color: transparent;
    border-bottom: 1px solid rgba(255, 255, 255, 0.562);
    transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
}

.input-search:focus {
    width: 300px;
    border-radius: 0px;
    background-color: transparent;
    border-bottom: 1px solid rgba(255, 255, 255, 0.598);
    transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
}

.text-lg-left {
    text-align: left !important;
}

.text-lg-right {
    text-align: right !important;
}

.nav-bar::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 50%;
    top: 0;
    left: 0;
    background: rgb(254, 102, 1);
}

.nav-tabs .nav-link.active {
    font-weight: bold !important;
    background-color: #faf1ff !important;
    color: rgb(254, 102, 1) !important;
}

.navbar-light .navbar-nav .nav-link:hover,
.navbar-light .navbar-nav .nav-link.active {
    color: rgb(254, 102, 1);
}

.navbar-collapse {
    flex-basis: 100%;
    flex-grow: 1;
    align-items: center;
}

.navbar-light {
    border-radius: 60px;
}

.navbar-light .navbar-nav .nav-link {
    padding: 30px 15px;
    color: #333333;
    font-size: 17px;
    font-weight: 500;
    outline: none;
}

.navbar-light .navbar-brand {
    color: rgba(0, 0, 0, 0.9);
}

.badge {
    position: absolute;
    text-transform: uppercase;
    font-size: 15px;
    font-weight: 700;
    background: red;
    color: #fff;
    padding: 3px 10px;
    z-index: 20;
}

.badgecart {
    position: absolute;
    top: 21px;
    margin-left: 36px;
    border-radius: 50%;
    font-size: 11px;
    font-weight: 700;
    background: red;
    color: #fff;
    padding: 2px 7px;
    z-index: 20;
}

@media (min-width: 992px) {
  .navbar-light {
    border-radius: 60px;
  }
  #header-carousel,
  .page-header {
    margin-top: -45px;
  }
}

.carousel-caption {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
}
</style>
