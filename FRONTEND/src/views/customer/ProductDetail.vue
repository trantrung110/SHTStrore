<template>
    <div v-if="product" class="page">
        <div class="container mb-1">
            <div class="row pt-5 ">
                <div class="col-sm-12 col-md-12 col-lg-5 text-center">
                    <img style="height:400px" :src="'http://localhost:3000/' + product.image" />
                </div>
                <div class="col-sm-10 col-md-12 col-lg-7 pb-2">
                    <header>
                        <div class="flex justify-center absolute items-center w-full flex-col">
                            <span class="text-secondary text-lg">
                                <router-link tag="span" class="text-lg cursor-pointer" to="/">
                                    Trang chủ
                                </router-link>
                                <router-link tag="span" class="text-lg cursor-pointer" to="/">
                                    / Sản phẩm/
                                </router-link>
                                {{ product.name }}
                            </span>
                        </div>
                    </header>
                    <div class="row">
                        <h3 class="pb-0 mb-3 col-12">
                            {{ product.name }}
                            <button class="btn btn-primary btn-sm text-white ms-4">{{ category.name }}</button>
                        </h3>
                    </div>

                    <div class="row">
                        <h2 class="col-3 text-danger">
                            {{ formatPrice(product.price) }}
                        </h2>
                        <p class="col-3 mb-0 pb-0"><i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </p>
                    </div>
                    <p>
                    </p>
                    <div class="row">
                        <p class="col-6"><b>Đã bán: </b>
                            {{ product.quantity_sale }}</p>
                    </div>
                    <p>
                        {{ product.description }}
                    </p>
                    <hr>

                    <p class="fw-bold col-3">SỐ LƯỢNG</p>
                    <div class="row ps-3"><input type="number" class="col-1 text-center" v-model="quantity_sale" min="1"
                            :max="product.quantity_remain" />
                        <p class="col-3 mb-0 text-muted">Kho:
                            {{ product.quantity_remain }}
                        </p>
                    </div>
                    <button class="btn-danger btn mt-3" @click="addToCart(
                        {
                            _id: product._id,
                            name: product.name,
                            description: product.description,
                            price: product.price,
                            image: product.image,
                            quantity_sale: quantity_sale,
                            category_id: product.category_id,
                        }
                    )" :disabled="product.quantity_remain === 0 || quantity_sale > product.quantity">

                        <i class="fas fa-cart-plus"> </i> Thêm vào giỏ
                    </button>
                </div>
            </div>
        </div>
        <h4 class="container mt-3">Sản phẩm tương tự</h4>
        <div class="container col-9 ms-5 ps-4">
            <ProductCard v-if="state.products.length > 0" :products="state.products" />
            <div v-else class="text-center">Loading...</div>
        </div>

        <!-- <section class="container py-4">
            <div class="row">
                <div class="col-md-12">
                    <h4>Thông tin sản phẩm</h4>
                    <div id="tabsContent" class="tab-content pb-5">
                        <div id="home1" class="tab-pane fade active show">
                            <div class="row pb-2">
                                <div class="col-md-7">
                                    <p style="font-family: VL BoosterNextFYThin; font-weight: bold;">
                                        Màu sắc: Đen.
                                        <br>
                                        Chất liệu da: da bò.
                                        <br>
                                        Chất liệu da lót: da dê + da nhân tạo + canvas.
                                        <br>
                                        Chất liệu đế: cao su cao cấp có độ mềm và đàn hồi tốt, hoạ tiết kim cương dưới
                                        đế giúp ma sát cực kì tốt.
 
                                        Bảng thun dày dặn, đàn hồi và độ bề cao.
                                        <br>
                                        Gót giày có một lớp mút giảm độ cấn khi mang.
                                        <br>
                                        Lót giày 4mm, có kết cấu EVA độ đàn hồi cao.
                                        <br>
                                        Độ cao gót: 3,5cm. </p>
                                </div> -->
                                <!-- <div class="col-md-4"><img src="https://pngimg.com/d/ice_cream_PNG5101.png"
                                        class="float-right img-fluid img-rounded"></div> -->
                            <!-- </div>
                        </div>
                        <div id="profile1" class="tab-pane fade col-8">
                            <table class="table table-bordered text-dark">
                                <thead>
                                    <tr>
                                        <th>Total Fat</th>
                                        <th>11 g</th>
                                        <th>14 %</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>Cholesterol</th>
                                        <td>5 mg</td>
                                        <td>2 %</td>
                                    </tr>
                                    <tr>
                                        <th>Protein</th>
                                        <td>1 g</td>
                                        <td>2 %</td>
                                    </tr>
                                    <tr>
                                        <th>Calcium</th>
                                        <td>40 g</td>
                                        <td>3 %</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section> -->

        <!-- <div class="product-details">
            <img :src="'http://localhost:3000/' + product.image" alt="" />

            <div class="product-info">
                <h5>{{ product.name }}</h5>
                <p>{{ product.description }}</p>
                <p>Giá: {{ product.price }}</p>
                <p>Số lượng còn lại: {{ product.quantity_remain }}</p>
                <input type="number" class="form-control" v-model="quantity_sale" min="1" :max="product.quantity_remain" />
                <button class="btn-cart btn " @click="addToCart(
                    {
                        _id: product._id,
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        image: product.image,
                        quantity_sale: quantity_sale,
                        category_id: product.category_id,
                    }
                )" :disabled="product.quantity_remain === 0 || quantity_sale > product.quantity">

                    <i class="fas fa-cart-plus"></i> Thêm vào giỏ
                </button>
            </div>
        </div> -->
    </div>
</template>

<script>
import { defineComponent, onMounted, ref, reactive, computed } from 'vue';
import ProductService from '@/services/product.service';
import CategoryService from '@/services/category.service';
import { useRouter } from "vue-router";
import CustomerService from "@/services/customer.service";
import ProductCard from '@/components/customer/ProductCard.vue';
import { useCustomerStore } from '@/stores/store';
import { useToast } from 'vue-toast-notification';

export default defineComponent({
    components: {
        ProductCard,
    },
    props: {
        id: { type: String, required: true },
    },
    mounted() {
        document.title = 'Chi tiết sản phẩm';
    },
    setup(props) {
        const state = reactive({
            products: [],
        });

        const product = ref(null);
        const category = ref(null);
        const toast = useToast();
        const quantity_sale = ref(1);
        const store = useCustomerStore();
        const router = useRouter();
        const addToCart = async (data) => {
            console.log(data);
            if (store.isAuthenticatedCustomer) {
                try {
                    const response = await CustomerService.addToCart(data);
                    localStorage.setItem("user", JSON.stringify(response.user));
                    toast.success('Thêm vào giỏ hàng thành công!', { timeout: 1500 });
                    //router.push({ name: "cart" });
                }
                catch (error) {
                    console.log(error);
                }
            } else {
                router.push({
                    name: "signin",
                });
            }
        };

        const formatPrice = (price) => {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
        };

        onMounted(async () => {
            product.value = await ProductService.get(props.id);
            category.value = await CategoryService.get(product.value.category_id);
        });
        const retrieveProducts = async () => {
            try {
                product.value = await ProductService.get(props.id);
                console.log("product: " + product);
                console.log("product cate: " + product.value.category_id);
                const products = await ProductService.findByCategory(product.value.category_id);
                state.products = products;
            } catch (error) {
                console.log(error);
            }
        };
        retrieveProducts();
        return {
            state,
            category,
            product,
            formatPrice,
            retrieveProducts,
            addToCart,
            quantity_sale,
        };
    },
});
</script>
<style scoped>
.fa-star {
    color: orange;
    font-size: 16px;
}
</style>