<template>
    <div v-if="state.customer.cart.length > 0" class="container-fluid pt-3 pb-5">
        <div class="mx-4">
            <div class="row pt-5 ">
                <div class="col-sm-12 col-md-12 col-lg-8 text-center">
                    <div class="card">
                        <div class="card-body">
                            <table class="table" id="table1">
                                <thead>
                                    <tr>
                                        <th class="h4 text-dark">GIỎ HÀNG</th>
                                        <th class="text-dark"></th>
                                        <th class="text-dark">Đơn giá</th>
                                        <th class="text-dark">Số lượng</th>
                                        <th class="text-dark">Thành tiền</th>
                                        <th class="text-dark"></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr v-for="(product, index) in state.customer.cart" :key="product.product_id">
                                        <td>
                                            <img :src="'http://localhost:3000/' + product.image" alt=""
                                                style="width: 100px" />
                                        </td>
                                        <td class="pt-5">{{ product.name }}</td>
                                        <td class="pt-5">{{ formatPrice(product.price) }}</td>
                                        <td class="pt-5">
                                            <button class="btn btn-cart btn-sm mx-2" @click="decreaseQuantity(product)">
                                                <i class="fa-solid fa-minus"></i>
                                            </button>
                                            {{ product.quantity_sale }}
                                            <button class="btn btn-cart btn-sm mx-2" @click="increaseQuantity(product)">
                                                <i class="fa-solid fa-plus"></i>
                                            </button>
                                        </td>
                                        <td class="pt-5">{{ formatPrice(product.subtotal) }}</td>
                                        <td class="pt-5">
                                            <i class="fa-regular fa-trash-can"
                                                @click="deleteProductFromCart(product.product_id)"></i>
                                            <!-- <button type="button" @click="deleteProductFromCart(product.product_id)"
                                                class="btn btn-danger">
                                                <i class="fa-regular fa-trash-can"></i>
                                            </button> -->
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="col-sm-10 col-md-12 col-lg-4 pb-2">
                    <Form>
                        <div class="row">
                            <div class="form-group col-md-12 pb-2">
                                <label for="name">Họ và Tên</label>
                                <Field name="name" type="text" class="form-control" v-model="name"
                                    style="font-family: VL BoosterNextFYThin; font-weight: bolder;" />
                                <ErrorMessage name="name" class="error-feedback" />
                            </div>
                            <div class="form-group col-md-12 pb-2">
                                <label for="phone">Số điện thoại</label>
                                <Field name="phone" type="text" class="form-control" v-model="phone"
                                    style="font-family: VL BoosterNextFYThin; font-weight: bolder;" />
                                <ErrorMessage name="phone" class="error-feedback" />
                            </div>
                            <div class="form-group col-md-12 pb-2">
                                <label for="address">Địa chỉ</label>
                                <Field name="address" type="text" class="form-control" v-model="address"
                                    style="font-family: VL BoosterNextFYThin; font-weight: bolder;" />
                                <ErrorMessage name="address" class="error-feedback" />
                            </div>
                        </div>
                    </Form>

                    <div class="card mt-3">
                        <div class="card-body">
                            <div class="row mb-2">
                                <h5 class="col-6">Tính tạm: </h5>
                                <h5 class="col-6 text-end">{{ formatPrice(state.total) }}</h5>
                            </div>
                            <div class="row mb-2">
                                <h5 class="col-6">Phí vận chuyển: </h5>
                                <h5 class="col-6 text-end">{{ formatPrice(20000) }}</h5>
                            </div>
                            <div class="row mb-1 border-top pt-3">
                                <h5 class="col-6">Tổng thanh toán: </h5>
                                <h5 class="col-6 text-end">{{ formatPrice(state.total + 20000) }}</h5>
                            </div>
                            <p class="text-end" style="font-family: VL BoosterNextFYThin; font-style: italic;">(Đã bao gồm
                                VAT)</p>
                            <div class="col-12">
                                <button class="btn btn-cart" @click="addToOrder()">
                                    <i class="fa-solid fa-receipt"></i> ĐẶT HÀNG NGAY
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-8">

            </div>
            <div class="col-4">

            </div>
        </div>
    </div>
    <div v-else="state.customer.cart.length < 1" class="container py-5 text-center">
        <img src="/src/assets/img/cart-empty.png" class="img-fluid" alt="">
        <h5>Hiện chưa có sản phẩm nào trong giỏ hàng của bạn!</h5>
    </div>
</template>
  
<script>
import { defineComponent, reactive, ref } from "vue";
import * as yup from 'yup';
import CustomerService from "@/services/customer.service";
import OrderService from "@/services/order.service";
import VueJwtDecode from "vue-jwt-decode";
import { useRouter } from "vue-router";
import { useToast } from 'vue-toast-notification';
import { Field } from "vee-validate";
import Swal from 'sweetalert2';

export default defineComponent({
    props: {
        id: { type: Object, required: true },
    },
    setup(props, context) {
        const toast = useToast();
        const state = reactive({
            customer: [],
            total: 0,
        });
        const userLocal = JSON.parse(localStorage.getItem("user"));
        const name = ref(userLocal.name);
        const phone = ref(userLocal.phone);
        const address = ref(userLocal.address);
        const activeIndex = ref(-1);
        const deleteProductFromCart = async (id) => {
            const result = await Swal.fire({
                title: 'Xác nhận',
                text: 'Bạn muốn xóa sản phẩm này trong giỏ hàng?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Hủy',
                confirmButtonText: 'Xóa',
            });

            if (result.isConfirmed) {
                try {
                    const response = await CustomerService.deleteProductFromCart(id);
                    localStorage.setItem('user', JSON.stringify(response.user));
                    state.total = 0;
                    retrieveCustomer();
                } catch (error) {
                    console.error(error);
                }
            }
        };
        const retrieveCustomer = async () => {
            try {
                const customer = await CustomerService.getCustomer();
                state.customer = customer;
                state.customer.cart.reduce((acc, product) => {
                    const price = product.price;
                    const quantity_sale = product.quantity_sale;
                    const total_temp = price * quantity_sale;
                    state.total += total_temp;
                }, 0);
            }
            catch (error) {
                console.log(error);
            }
        };
        const router = useRouter();
        const addToOrder = async () => {
            try {
                const token = localStorage.getItem("token");
                const decoded = VueJwtDecode.decode(token);
                const customer = await CustomerService.getCustomer(decoded.id);
                const result = await OrderService.addToOrder({
                    customer_id: customer._id,
                    name: name.value,
                    phone: phone.value,
                    address: address.value,
                    products: state.customer.cart,
                    total: state.total + 20000,
                });
                if (result === "") {
                    // Hiển thị thông báo lỗi về số lượng sản phẩm trong kho không đủ
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi',
                        text: 'Số lượng sản phẩm trong kho không đủ.',
                    });
                }
                else {
                    const response = await CustomerService.deleteAllProductsFromCart();
                    localStorage.setItem("user", JSON.stringify(response.user));
                    state.customer = [];
                    state.total = 0;
                    router.push({ name: "order" });
                }
            }
            catch (error) {
                console.log(error);
            }
        };
        const increaseQuantity = (product) => {
            // Tăng số lượng sản phẩm lên 1
            product.quantity_sale += 1;
            product.subtotal = product.quantity_sale * product.price;
            state.total += product.price;
            // Gọi lại hàm addToCart với thông tin sản phẩm đã cập nhật
            CustomerService.addToCart({
                _id: product.product_id,
                name: product.name,
                description: product.description,
                price: product.price,
                image: product.image,
                quantity_sale: 1,
                category_id: product.category_id,
            });
        };
        const decreaseQuantity = (product) => {
            // Giảm số lượng sản phẩm 
            if (product.quantity_sale > 1) {
                product.quantity_sale -= 1;
                product.subtotal = product.quantity_sale * product.price;
                state.total -= product.price;
                // Gọi lại hàm addToCart với thông tin sản phẩm đã cập nhật
                CustomerService.addToCart({
                    _id: product.product_id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    image: product.image,
                    quantity_sale: -1,
                    category_id: product.category_id,
                });
            }
            else {
                deleteProductFromCart(product.product_id)
            }
        };
        const formatPrice = (price) => {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
        };
        retrieveCustomer();
        console.log(userLocal);
        return {
            state,
            name,
            phone,
            address,
            activeIndex,
            retrieveCustomer,
            deleteProductFromCart,
            addToOrder,
            increaseQuantity,
            decreaseQuantity,
            formatPrice
        };
    },
    components: { Field }
});
</script>
  
<style>
.card-body {
    padding: 1.25rem;
    border: none;
    border-radius: 0.25rem;
}

.card-title {
    margin-bottom: 0.75rem;
    font-size: 1.25rem;
    font-weight: 500;
}

.text-start {
    text-align: left;
}

.text-end {
    text-align: right;
}

.text-thin {
    font-family: VL BoosterNextFYThin !important;
    color: #000;
    font-weight: bold;
}

.btn-cart {
    color: #fff;
    background-color: #68b1ff;
    border-color: #65b0ff;
    border-radius: 0.25rem;
    line-height: 1.5;
    cursor: pointer;
    transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
        box-shadow 0.15s ease-in-out;
}

.btn-cart:hover {
    color: #fff;
    background-color: #2890ff;
    border-color: #3194ff;
}
</style>
  