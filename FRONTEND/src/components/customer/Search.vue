<template>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        <i class="fas fa-search"></i>
    </button>

    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Tìm kiếm</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="col-12 my-2">
                        <input class="form-control" v-model="searchText" type="text" placeholder="Tìm kiếm sản phẩm" />
                    </div>
                    <div v-if="showNoResultsMessage && filteredProducts.length === 0">
                        <div class="text-center">
                            <img src="@/assets/img/not-found.png" alt="Not Found" class="w-25">
                            <h4>Không tìm thấy kết quả phù hợp!</h4>
                        </div>
                    </div>
                    <div v-else class="row gx-3">
                        <div class="col-sm-4 col-md-4 mb-3 p-1" v-for="(product, index) in filteredProducts"
                            :key="product._id">
                            <div class="card card-span h-100 rounded-3"><img class="img-fluid rounded-3 h-100"
                                    :src="'http://localhost:3000/' + product.image" alt="" />
                                <div class="card-body ps-2">
                                    <router-link
                                        :to="{ name: 'product.detail', params: { id: product._id, category: product.category_id } }">
                                        <h5 class="card-title text-start">{{ product.name }}</h5>
                                    </router-link>
                                    <div class="row justify-content-between">
                                        <div class="col text-start">
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                        </div>
                                        <div class="col text-right">
                                            <p class="text-mute">Đã bán: {{ product.quantity_sale }}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <h4 class="fw-bold text-danger col">{{ formatPrice(product.price) }}</h4>
                                        <a class="col text-right" @click="addToCart(
                                            {
                                                _id: product._id,
                                                name: product.name,
                                                description: product.description,
                                                price: product.price,
                                                image: product.image,
                                                quantity_sale: 1,
                                                category_id: product.category._id,
                                            }
                                        )" :disabled="product.quantity_remain === 0">

                                            <i class="fas fa-cart-plus h4"></i>
                                        </a>
                                    </div>

                                    <span class="text-1000 fw-bold"></span>
                                </div>
                            </div>

                        </div>
                        <!-- <div class="product-card" v-for="(product, index) in filteredProducts" :key="product._id">
                            <img :src="'http://localhost:3000/' + product.image" alt="" />
                            <h5 class="title text-center" style="font-size: 20px">{{ product.name }}</h5>
                            <div class="price text-danger"
                                style=" font-size: 20px; font-weight: bold; font-family: Arial, sans-serif; color: #ff0000;">
                                {{ product.price + " VNĐ" }}
                            </div>
                            <div class="price text-danger"
                                style="font-size: 16px; font-weight: normal; font-family: Verdana, sans-serif; color: #000000; ">
                                {{ product.quantity_remain === 0 ? "HẾT HÀNG" : "Số lượng kho:" + product.quantity_remain }}
                            </div>
                        </div> -->
                    </div>
                    <div class="modal-footer mt-4">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Đóng</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js";
import { defineComponent, reactive, ref, computed } from "vue";
import CustomerService from "@/services/customer.service";
import { useCustomerStore } from '@/stores/store';
import { useToast } from 'vue-toast-notification';
import { useRouter } from "vue-router";

export default defineComponent({
    props: {
        products: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    setup(props, context) {
        const router = useRouter();
        const toast = useToast();
        const store = useCustomerStore();
        const searchText = ref("");
        const showNoResultsMessage = ref(false);
        const filteredProducts = computed(() => {
            const filtered = props.products.filter((product) =>
                Object.values(product).some((value) =>
                    String(value).toLowerCase().includes(searchText.value.toLowerCase())
                )
            );
            if (!searchText.value) {
                return [];
            }
            showNoResultsMessage.value = filtered.length === 0;
            return filtered;
        });
        const formatPrice = (price) => {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
        };
        const addToCart = async (data) => {
            console.log(data);
            if (store.isAuthenticatedCustomer) {
                try {
                    const response = await CustomerService.addToCart(data);
                    localStorage.setItem("user", JSON.stringify(response.user));
                    toast.success('Thêm vào giỏ hàng thành công!', { timeout: 1500 });
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
        return {
            searchText,
            filteredProducts,
            showNoResultsMessage,
            formatPrice,
            addToCart
        };
    },
});
</script>
<style>
.fa-star {
    color: orange;
    font-size: 13px;
}

</style>
