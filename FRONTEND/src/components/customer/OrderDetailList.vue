<template>
    <div class="container py-5">
        <div class="track">
            <div class="step" :class="{ active: order.status===0 || order.status===1 || order.status===2 || order.status===4}"> <span class="icon"> <i class="fa fa-check"></i> </span> <span class="text">Đơn Hàng Đã Đặt 
                    </span> <span class="text-day">{{ order.created_at }}</span></div>
            <div v-if="order.status !== 3" class="step" :class="{ active: order.status===1 || order.status===2 || order.status===4}"> <span class="icon"> <i class="fa fa-user"></i> </span> <span class="text">Đơn Hàng Đã Được Duyệt </span> <span v-if="order.accept_at" class="text-day">{{ order.accept_at }}</span></div>
            <div v-if="order.status !== 3" class="step" :class="{ active: order.status===2 || order.status===4}"> <span class="icon"> <i class="fa fa-truck"></i> </span> <span class="text"> Đã Giao Cho ĐVVC
                </span><span v-if="order.ship_at" class="text-day">{{ order.ship_at }}</span>
            </div>
            <div v-if="order.status !== 3" class="step" :class="{ active: order.status===4}"> <span class="icon"> <i class="fa fa-box"></i> </span> <span class="text">Đã Nhận Được Hàng</span>
                <span v-if="order.arrive_at" class="text-day">{{ order.arrive_at }}</span></div>
            <div v-if="order.status === 3" class="step" > <span class="icon"> <i class="fa-solid fa-calendar-xmark"></i> </span> <span class="text">Đơn Hàng Đã Bị Hủy</span>
                <span v-if="order.cancle_at" class="text-day">{{ order.cancle_at }}</span></div>
        </div>
    </div>
    <h4 class="text-center fw-bolder pb-3">CHI TIẾT ĐƠN HÀNG</h4>
    <div class="container">
        <table class="table mt-3 mb-5 shadow" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th class="text-start"> {{ orders.status === 0 ? "NGÀY ĐẶT HÀNG: " : orders.status === 1 ? "ĐƯỢC DUYỆT VÀO NGÀY: " : orders.status === 2 ? "BÀN GIAO CHO NHÀ VẬN CHUYỂN VÀO NGÀY: " : orders.status === 3 ? "ĐƠN HÀNG ĐÃ BỊ HỦY VÀO NGÀY: " :
                                            "ĐƠN HÀNG ĐÃ ĐƯỢC GIAO VÀO NGÀY: " }} {{ orders.updated_at }}</th>
                                        <th></th>
                                        <th :style="{ color: orders.status === 0 ? 'grey' : orders.status === 1 ? 'hotpink' : orders.status === 2 ? 'orange' : orders.status === 4 ? 'green' : 'red', }"
                                            class="text-end">
                                            {{ orders.status === 0 ? "🕔 ĐANG CHỜ DUYỆT" : orders.status === 1 ? "📦 ĐANG GÓI HÀNG" : orders.status === 2 ? "🚚 ĐANG VẬN CHUYỂN" : orders.status === 3 ? "❌ ĐÃ HỦY" :
                                            "💵 ĐƠN HÀNG ĐÃ GIAO THÀNH CÔNG" }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(product, index) in orders.products" :key="product.product_id">
                                        <td class="text-start row">
                                            <div class="col-3"><img :src="'http://localhost:3000/' + product.image" alt=""
                                                    style="width: 100px" /></div>
                                            <div class="col-6 pt-3">
                                                <div class="row h5">{{ product.name }}</div>
                                                <div class="row">X {{ product.quantity_sale }}</div>
                                            </div>
                                        </td>
                                        <td></td>
                                        <td class="h5 text-end">{{ formatPrice(product.price) }}</td>
                                    </tr>
                                    <tr class="bg-white" style="border-color:white">
                                        <td colspan="2" class="text-start">
                                            <h5 class="ps-4 mt-2">ĐỊA CHỈ NHẬN HÀNG</h5>
                                            <p class="ps-4 mb-1 text-thin">Tên người nhận: {{ order.name }}</p>
                                            <p class="ps-4 mb-1 text-thin">Số điện thoại: {{ order.phone }}</p>
                                            <p class="ps-4 text-thin">Địa chỉ: {{ order.address }}</p>
                                        </td>
                                        <td class="text-end">
                                            <div class="row">
                                                <p class="col-7">Tổng tiền hàng:</p> 
                                                <h5 class="col-5">{{ formatPrice(orders.total -20000) }}</h5>
                                            </div>
                                            <div class="row">
                                                <p class="col-7">Tiền phí vận chuyển:</p> 
                                                <h5 class="col-5">{{ formatPrice(20000) }}</h5>
                                            </div>
                                            <div class="row">
                                                <p class="col-7 mt-1">Thành tiền:</p> 
                                                <h4 class="col-5 text-danger">{{ formatPrice(orders.total) }}</h4>
                                            </div>
                                            <div class="row">
                                                <p class="col-7 text-thin">🪙 Phương thức thanh toán:</p> 
                                                <p class="col-5 text-thin">Thanh toán khi nhận hàng</p>
                                            </div>
                                        </td>
                                    </tr>
                                    
                                </tbody>
                            </table>
        <!-- <section class="section">
            <div class="card">
                <div class="card-body">
                    <table class="table table-striped text-center" id="table1">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên bánh</th>
                                <th>Hình ảnh</th>
                                <th>Số lượng</th>
                                <th>Giá</th>
                                <th>Tổng</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(product, index) in orders.products" :key="order._id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ product.name }}</td>
                                <td>
                                    <img :src="'http://localhost:3000/' + product.image" alt="Product Image"
                                        style="height: 50px" />
                                </td>
                                <td>{{ product.quantity_sale }}</td>
                                <td>{{ product.price }}</td>
                                <td>{{ product.quantity_sale * product.price }}</td>
                                <td
                                :style="{ color: order.status === 0 ? 'grey' : order.status === 1 ? 'hotpink' : order.status === 2 ? 'green'  : order.status === 4 ? 'blue' : 'red', fontWeight: 'bold' }">
                                    {{ order.status === 0 ? "Đang chờ duyệt..." : order.status === 1 ? "Đang gói hàng" : order.status === 2 ? "Đang vận chuyển" : order.status === 3 ? "Đã hủy" : "Đã hoàn thành"}}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section> -->
    </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import { Field } from "vee-validate";
export default defineComponent({
    components: {
        Field,
    },
    props: {
        order: { type: Object, required: true },
    },
    setup(props, context) {
        const orders = reactive(props.order);
        const formatPrice = (price) => {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
        };
        return {
            orders,
            formatPrice
        };
    },
});
</script>
<style scoped>
.track {
    position: relative;
    background-color: #ddd;
    height: 7px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-bottom: 60px;
    margin-top: 50px
}

.track .step {
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    width: 25%;
    margin-top: -18px;
    text-align: center;
    position: relative
}

.track .step.active:before {
    background: rgb(0, 188, 3)
}

.track .step::before {
    height: 7px;
    position: absolute;
    content: "";
    width: 100%;
    left: 0;
    top: 18px
}

.track .step.active .icon {
    background: rgb(0, 188, 3);
    color: #fff
}

.track .icon {
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    position: relative;
    border-radius: 100%;
    background: #ddd
}

.track .step.active .text {
    font-weight: 400;
    color: #000
}
.track .step.active .text-day {
    font-family: VL BoosterNextFYThin !important;
    color: #000;
    display: block;
    margin-top: 7px;
    font-weight: bold;
}

.track .text {
    display: block;
    margin-top: 7px
}
.text-thin {
    font-family: VL BoosterNextFYThin !important;
    color: #000;
    font-weight: bold;
}
.shadow {
    box-shadow: 0 0rem 0.5rem rgba(0,0,0,.15) !important;
}
.table thead th {
    font-weight: bold;
    background-color: rgb(255 252 239);
    border-style: none;
    text-align: center;
    padding: 15px;
}

.table tbody td {
    vertical-align: middle;
    text-align: center;
}

.table tbody tr:nth-child(odd) {
    background-color: #ffffff;
}

.table tbody tr:hover {
    background-color: #fff2fd;
}
</style>
    