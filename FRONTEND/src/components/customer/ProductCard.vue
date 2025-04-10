<template>
    <div class="row gx-3">
        <div class="col-sm-6 col-md-6 col-lg-3 mb-3 p-1" v-for="(product, index) in products" :key="product._id">
            <div class="card card-span h-100 rounded-3"><img class="img-fluid rounded-3 h-100"
                    :src="'http://localhost:3000/' + product.image" alt="" />
                <div class="card-body ps-2">
                    <router-link :to="{ name: 'product.detail', params: { id: product._id, category: product.category_id } }">
                        <h5 class="card-title">{{ product.name }}</h5>
                    </router-link>
                    <div class="row justify-content-between">
                        <div class="col ps-3">
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
    </div>

    <!-- <div class="product-card" v-for="(product, index) in products" :key="product._id">
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

        <div class="card-footer text-center">
            <div class="input-group">
                <input type="number" class="form-control" v-model="quantity_sale[index]" min="1"
                    :max="product.quantity_remain" />
                <button class="btn-cart btn " @click="addToCart(
                    {
                        _id: product._id,
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        image: product.image,
                        quantity_sale: quantity_sale[index],
                        category_id: product.category._id,
                    }
                )" :disabled="product.quantity_remain === 0 || quantity_sale[index] > product.quantity">

                    <i class="fas fa-cart-plus"></i> Thêm vào giỏ
                </button>
                <router-link :to="{ name: 'product.detail', params: { id: product._id, category: product.category_id } }">
                    <button type="button" class="btn btn-info">Chi tiết</button>
                </router-link>
            </div>
        </div>
    </div> -->
</template>
  
<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import CustomerService from "@/services/customer.service";
import { useCustomerStore } from '@/stores/store';
import { useToast } from 'vue-toast-notification';

export default defineComponent({
    props: {
        products: { type: Array, required: true },
    },
    setup(props, context) {
        const toast = useToast();
        const quantity_sale = ref(Array(props.products.length).fill(1));
        const store = useCustomerStore();
        const router = useRouter();
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
        const formatPrice = (price) => {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
        };

        return {
            formatPrice,
            addToCart,
            quantity_sale,
        };
    },
});
</script>
<style>
.fa-star {
    color: orange;
    font-size: 13px;
}

.text-right {
    text-align: right;
}

</style>
