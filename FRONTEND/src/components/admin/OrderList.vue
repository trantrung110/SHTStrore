<template>
    <section id="tabs" class="project-tab">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <nav>
                        <div class="nav nav-tabs nav-fill pt-4" id="nav-tab" role="tablist">
                            <a class="nav-item nav-link active" id="nav-all-tab" data-toggle="tab" href="#nav-all"
                                role="tab" aria-controls="nav-all" aria-selected="true">Tất cả</a>
                            <a class="nav-item nav-link" id="nav-0-tab" data-toggle="tab" href="#nav-0" role="tab"
                                aria-controls="nav-0" aria-selected="false">Chờ xác nhận</a>
                            <a class="nav-item nav-link" id="nav-1-tab" data-toggle="tab" href="#nav-1" role="tab"
                                aria-controls="nav-1" aria-selected="false">Chờ vận chuyển</a>
                            <a class="nav-item nav-link" id="nav-2-tab" data-toggle="tab" href="#nav-2" role="tab"
                                aria-controls="nav-2" aria-selected="false">Chờ giao hàng</a>
                            <a class="nav-item nav-link" id="nav-4-tab" data-toggle="tab" href="#nav-4" role="tab"
                                aria-controls="nav-4" aria-selected="false">Hoàn thành</a>
                            <a class="nav-item nav-link" id="nav-3-tab" data-toggle="tab" href="#nav-3" role="tab"
                                aria-controls="nav-3" aria-selected="false">Đã hủy</a>
                        </div>
                    </nav>
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active py-3"
                            id="nav-all" role="tabpanel" aria-labelledby="nav-all-tab">
                            <table v-for="(order, index) in filteredOrders" :key="order._id" class="table mt-3 mb-5 shadow" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th class="text-start"> {{ order.status === 0 ? "NGÀY ĐẶT HÀNG: " : order.status === 1 ? "ĐƯỢC DUYỆT VÀO NGÀY: " : order.status === 2 ? "BÀN GIAO CHO NHÀ VẬN CHUYỂN VÀO NGÀY: " : order.status === 3 ? "ĐƠN HÀNG ĐÃ BỊ HỦY VÀO NGÀY: " :
                                            "ĐƠN HÀNG ĐÃ ĐƯỢC GIAO VÀO NGÀY: " }} {{ order.updated_at }}</th>
                                        <th></th>
                                        <th :style="{ color: order.status === 0 ? 'grey' : order.status === 1 ? 'hotpink' : order.status === 2 ? 'orange' : order.status === 4 ? 'green' : 'red', }"
                                            class="text-end">
                                            {{ order.status === 0 ? "🕔 ĐANG CHỜ DUYỆT" : order.status === 1 ? "📦 ĐANG GÓI HÀNG" : order.status === 2 ? "🚚 ĐANG VẬN CHUYỂN" : order.status === 3 ? "❌ ĐÃ HỦY" :
                                            "💵 ĐƠN HÀNG ĐÃ GIAO THÀNH CÔNG" }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(product, index) in order.products" :key="product.product_id">
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
                                        <td colspan="2" class="text-start ps-3">
                                            <router-link :to="{ name: 'admin.order.detail', params: { id: order._id } }">
                                            <button type="button" class="btn btn-info">Chi tiết</button>
                                        </router-link>
                                        <button v-if="order.status === 0" type="button"
                                            @click="updateOrderStatus(order._id, { status: 1 })"
                                            class="btn btn-success ms-3">Duyệt
                                        </button>
                                        <button v-if="order.status === 1" type="button"
                                            @click="updateOrderStatus(order._id, { status: 2 })"
                                            class="btn btn-success ms-3">Giao hàng
                                        </button>
                                        <button v-if="order.status === 0 || order.status === 1" type="button"
                                            @click="updateOrderStatus(order._id, { status: 3 })"
                                            class="btn btn-danger ms-3">Hủy
                                        </button>
                                        </td>
                                        <td class="text-end row">
                                            <p class="col-7 mt-1">Thành tiền:</p> 
                                            <h4 class="col-5 text-danger">{{ formatPrice(order.total) }}</h4>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <div class="tab-pane fade py-3" id="nav-0" role="tabpanel" aria-labelledby="nav-0-tab">
                            <div v-if="hasPendingOrders1">
                                <div v-for="(order, index) in filteredOrders" :key="order._id">
                                <table class="table mt-3 mb-5 shadow" cellspacing="0" v-if="order.status === 0">
                                    <thead>
                                    <tr>
                                        <th class="text-start"> {{ order.status === 0 ? "NGÀY ĐẶT HÀNG: " : order.status === 1 ? "ĐƯỢC DUYỆT VÀO NGÀY: " : order.status === 2 ? "BÀN GIAO CHO NHÀ VẬN CHUYỂN VÀO NGÀY: " : order.status === 3 ? "ĐƠN HÀNG ĐÃ BỊ HỦY VÀO NGÀY: " :
                                            "ĐƠN HÀNG ĐÃ ĐƯỢC GIAO VÀO NGÀY: " }} {{ order.created_at }}</th>
                                        <th></th>
                                        <th :style="{ color: order.status === 0 ? 'grey' : order.status === 1 ? 'hotpink' : order.status === 2 ? 'orange' : order.status === 4 ? 'green' : 'red', }"
                                            class="text-end">
                                            {{ order.status === 0 ? "🕔 ĐANG CHỜ DUYỆT" : order.status === 1 ? "📦 ĐANG GÓI HÀNG" : order.status === 2 ? "🚚 ĐANG VẬN CHUYỂN" : order.status === 3 ? "❌ ĐÃ HỦY" :
                                            "💵 ĐƠN HÀNG ĐÃ GIAO THÀNH CÔNG" }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(product, index) in order.products" :key="product.product_id">
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
                                            <router-link :to="{ name: 'admin.order.detail', params: { id: order._id } }">
                                            <button type="button" class="btn btn-info">Chi tiết</button>
                                        </router-link>
                                        <button v-if="order.status === 0" type="button"
                                            @click="updateOrderStatus(order._id, { status: 1 })"
                                            class="btn btn-success ms-3">Duyệt
                                        </button>
                                        <button v-if="order.status === 1" type="button"
                                            @click="updateOrderStatus(order._id, { status: 2 })"
                                            class="btn btn-success ms-3">Giao hàng
                                        </button>
                                        <button v-if="order.status === 0 || order.status === 1" type="button"
                                            @click="updateOrderStatus(order._id, { status: 3 })"
                                            class="btn btn-danger ms-3">Hủy
                                        </button>
                                        </td>
                                        <td class="text-end row">
                                            <p class="col-7 mt-1">Thành tiền:</p> 
                                            <h4 class="col-5 text-danger">{{ formatPrice(order.total) }}</h4>
                                        </td>
                                    </tr>
                                    
                                </tbody>
                                </table>
                            </div>
                        </div>
                            <div v-else class="text-center py-2">
                                <img src="https://img.freepik.com/vector-premium/paquete-pila-d-icono-caja-carton-pila-vector_88813-2412.jpg" class="img-fluid w-25 py-4" alt="">
                                <h5>Hiện chưa có đơn hàng nào đang chờ duyệt!</h5>
                            </div>
                        </div>
                        
                        <div v-if="filteredOrders.length > 0" class="tab-pane fade py-3" id="nav-1" role="tabpanel" aria-labelledby="nav-1-tab">
                            <div v-if="hasPendingOrders2">
                                <div v-for="(order, index) in filteredOrders" :key="order._id">
                                <table class="table mt-3 mb-5 shadow" cellspacing="0" v-if="order.status === 1">
                                    <thead>
                                    <tr>
                                        <th class="text-start"> {{ order.status === 0 ? "NGÀY ĐẶT HÀNG: " : order.status === 1 ? "ĐƯỢC DUYỆT VÀO NGÀY: " : order.status === 2 ? "BÀN GIAO CHO NHÀ VẬN CHUYỂN VÀO NGÀY: " : order.status === 3 ? "ĐƠN HÀNG ĐÃ BỊ HỦY VÀO NGÀY: " :
                                            "ĐƠN HÀNG ĐÃ ĐƯỢC GIAO VÀO NGÀY: " }} {{ order.created_at }}</th>
                                        <th></th>
                                        <th :style="{ color: order.status === 0 ? 'grey' : order.status === 1 ? 'hotpink' : order.status === 2 ? 'orange' : order.status === 4 ? 'green' : 'red', }"
                                            class="text-end">
                                            {{ order.status === 0 ? "🕔 ĐANG CHỜ DUYỆT" : order.status === 1 ? "📦 ĐANG GÓI HÀNG" : order.status === 2 ? "🚚 ĐANG VẬN CHUYỂN" : order.status === 3 ? "❌ ĐÃ HỦY" :
                                            "💵 ĐƠN HÀNG ĐÃ GIAO THÀNH CÔNG" }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(product, index) in order.products" :key="product.product_id">
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
                                            <router-link :to="{ name: 'admin.order.detail', params: { id: order._id } }">
                                            <button type="button" class="btn btn-info">Chi tiết</button>
                                        </router-link>
                                        <button v-if="order.status === 0" type="button"
                                            @click="updateOrderStatus(order._id, { status: 1 })"
                                            class="btn btn-success ms-3">Duyệt
                                        </button>
                                        <button v-if="order.status === 1" type="button"
                                            @click="updateOrderStatus(order._id, { status: 2 })"
                                            class="btn btn-success ms-3">Giao hàng
                                        </button>
                                        <button v-if="order.status === 0 || order.status === 1" type="button"
                                            @click="updateOrderStatus(order._id, { status: 3 })"
                                            class="btn btn-danger ms-3">Hủy
                                        </button>
                                        </td>
                                        <td class="text-end row">
                                            <p class="col-7 mt-1">Thành tiền:</p> 
                                            <h4 class="col-5 text-danger">{{ formatPrice(order.total) }}</h4>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                            </div>
                            <div v-else class="text-center pt-2">
                                <img src="https://img.freepik.com/vector-premium/paquete-pila-d-icono-caja-carton-pila-vector_88813-2412.jpg" class="img-fluid w-25 py-4" alt="">
                                <h5>Hiện chưa có đơn hàng nào đang chờ vận chuyển!</h5>
                            </div>
                        </div>
                        
                        <div class="tab-pane fade py-3" id="nav-2" role="tabpanel" aria-labelledby="nav-2-tab">
                            <div v-if="hasPendingOrders3">
                                <div v-for="(order, index) in filteredOrders" :key="order._id">
                                <table class="table mt-3 mb-5 shadow" cellspacing="0" v-if="order.status === 2">
                                    <thead>
                                    <tr>
                                        <th class="text-start"> {{ order.status === 0 ? "NGÀY ĐẶT HÀNG: " : order.status === 1 ? "ĐƯỢC DUYỆT VÀO NGÀY: " : order.status === 2 ? "BÀN GIAO CHO NHÀ VẬN CHUYỂN VÀO NGÀY: " : order.status === 3 ? "ĐƠN HÀNG ĐÃ BỊ HỦY VÀO NGÀY: " :
                                            "ĐƠN HÀNG ĐÃ ĐƯỢC GIAO VÀO NGÀY: " }} {{ order.created_at }}</th>
                                        <th></th>
                                        <th :style="{ color: order.status === 0 ? 'grey' : order.status === 1 ? 'hotpink' : order.status === 2 ? 'orange' : order.status === 4 ? 'green' : 'red', }"
                                            class="text-end">
                                            {{ order.status === 0 ? "🕔 ĐANG CHỜ DUYỆT" : order.status === 1 ? "📦 ĐANG GÓI HÀNG" : order.status === 2 ? "🚚 ĐANG VẬN CHUYỂN" : order.status === 3 ? "❌ ĐÃ HỦY" :
                                            "💵 ĐƠN HÀNG ĐÃ GIAO THÀNH CÔNG" }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(product, index) in order.products" :key="product.product_id">
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
                                            <router-link :to="{ name: 'admin.order.detail', params: { id: order._id } }">
                                            <button type="button" class="btn btn-info">Chi tiết</button>
                                        </router-link>
                                        <button v-if="order.status === 0" type="button"
                                            @click="updateOrderStatus(order._id, { status: 1 })"
                                            class="btn btn-success ms-3">Duyệt
                                        </button>
                                        <button v-if="order.status === 1" type="button"
                                            @click="updateOrderStatus(order._id, { status: 2 })"
                                            class="btn btn-success ms-3">Giao hàng
                                        </button>
                                        <button v-if="order.status === 0 || order.status === 1" type="button"
                                            @click="updateOrderStatus(order._id, { status: 3 })"
                                            class="btn btn-danger ms-3">Hủy
                                        </button>
                                        </td>
                                        <td class="text-end row">
                                            <p class="col-6 mt-1">Thành tiền:</p> 
                                            <h4 class="col-6 text-danger">{{ formatPrice(order.total) }}</h4>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                            </div>
                            <div v-else class="text-center py-2">
                                <img src="https://img.freepik.com/vector-premium/paquete-pila-d-icono-caja-carton-pila-vector_88813-2412.jpg" class="img-fluid w-25 py-4" alt="">
                                <h5>Hiện chưa có đơn hàng nào đang chờ giao hàng!</h5>
                            </div>
                        </div>
                        
                        <div class="tab-pane fade py-3" id="nav-3" role="tabpanel" aria-labelledby="nav-3-tab">
                            <div v-if="hasPendingOrders4">
                                <div v-for="(order, index) in filteredOrders" :key="order._id">
                                <table class="table mt-3 mb-5 shadow" cellspacing="0" v-if="order.status === 3">
                                    <thead>
                                    <tr>
                                        <th class="text-start"> {{ order.status === 0 ? "NGÀY ĐẶT HÀNG: " : order.status === 1 ? "ĐƯỢC DUYỆT VÀO NGÀY: " : order.status === 2 ? "BÀN GIAO CHO NHÀ VẬN CHUYỂN VÀO NGÀY: " : order.status === 3 ? "ĐƠN HÀNG ĐÃ BỊ HỦY VÀO NGÀY: " :
                                            "ĐƠN HÀNG ĐÃ ĐƯỢC GIAO VÀO NGÀY: " }} {{ order.created_at }}</th>
                                        <th></th>
                                        <th :style="{ color: order.status === 0 ? 'grey' : order.status === 1 ? 'hotpink' : order.status === 2 ? 'orange' : order.status === 4 ? 'green' : 'red', }"
                                            class="text-end">
                                            {{ order.status === 0 ? "🕔 ĐANG CHỜ DUYỆT" : order.status === 1 ? "📦 ĐANG GÓI HÀNG" : order.status === 2 ? "🚚 ĐANG VẬN CHUYỂN" : order.status === 3 ? "❌ ĐÃ HỦY" :
                                            "💵 ĐƠN HÀNG ĐÃ GIAO THÀNH CÔNG" }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(product, index) in order.products" :key="product.product_id">
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
                                            <router-link :to="{ name: 'admin.order.detail', params: { id: order._id } }">
                                            <button type="button" class="btn btn-info">Chi tiết</button>
                                        </router-link>
                                        <button v-if="order.status === 0" type="button"
                                            @click="updateOrderStatus(order._id, { status: 1 })"
                                            class="btn btn-success ms-3">Duyệt
                                        </button>
                                        <button v-if="order.status === 1" type="button"
                                            @click="updateOrderStatus(order._id, { status: 2 })"
                                            class="btn btn-success ms-3">Giao hàng
                                        </button>
                                        <button v-if="order.status === 0 || order.status === 1" type="button"
                                            @click="updateOrderStatus(order._id, { status: 3 })"
                                            class="btn btn-danger ms-3">Hủy
                                        </button>
                                        </td>
                                        <td class="text-end row">
                                            <p class="col-6 mt-1">Thành tiền:</p> 
                                            <h4 class="col-6 text-danger">{{ formatPrice(order.total) }}</h4>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                            </div>
                            <div v-else class="text-center py-2">
                                <img src="https://img.freepik.com/vector-premium/paquete-pila-d-icono-caja-carton-pila-vector_88813-2412.jpg" class="img-fluid w-25 py-4" alt="">
                                <h5>Hiện chưa có đơn hàng nào bị hủy!</h5>
                            </div>
                        </div>
                        
                        <div class="tab-pane fade py-3" id="nav-4" role="tabpanel" aria-labelledby="nav-4-tab">
                            <div v-if="hasPendingOrders4">
                                <div v-for="(order, index) in filteredOrders" :key="order._id">
                                <table class="table mt-3 mb-5 shadow" cellspacing="0" v-if="order.status === 4">
                                    <thead>
                                    <tr>
                                        <th class="text-start"> {{ order.status === 0 ? "NGÀY ĐẶT HÀNG: " : order.status === 1 ? "ĐƯỢC DUYỆT VÀO NGÀY: " : order.status === 2 ? "BÀN GIAO CHO NHÀ VẬN CHUYỂN VÀO NGÀY: " : order.status === 3 ? "ĐƠN HÀNG ĐÃ BỊ HỦY VÀO NGÀY: " :
                                            "ĐƠN HÀNG ĐÃ ĐƯỢC GIAO VÀO NGÀY: " }} {{ order.created_at }}</th>
                                        <th></th>
                                        <th :style="{ color: order.status === 0 ? 'grey' : order.status === 1 ? 'hotpink' : order.status === 2 ? 'orange' : order.status === 4 ? 'green' : 'red', }"
                                            class="text-end">
                                            {{ order.status === 0 ? "🕔 ĐANG CHỜ DUYỆT" : order.status === 1 ? "📦 ĐANG GÓI HÀNG" : order.status === 2 ? "🚚 ĐANG VẬN CHUYỂN" : order.status === 3 ? "❌ ĐÃ HỦY" :
                                            "💵 ĐƠN HÀNG ĐÃ GIAO THÀNH CÔNG" }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(product, index) in order.products" :key="product.product_id">
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
                                            <router-link :to="{ name: 'admin.order.detail', params: { id: order._id } }">
                                            <button type="button" class="btn btn-info">Chi tiết</button>
                                        </router-link>
                                        <button v-if="order.status === 0" type="button"
                                            @click="updateOrderStatus(order._id, { status: 1 })"
                                            class="btn btn-success ms-3">Duyệt
                                        </button>
                                        <button v-if="order.status === 1" type="button"
                                            @click="updateOrderStatus(order._id, { status: 2 })"
                                            class="btn btn-success ms-3">Giao hàng
                                        </button>
                                        <button v-if="order.status === 0 || order.status === 1" type="button"
                                            @click="updateOrderStatus(order._id, { status: 3 })"
                                            class="btn btn-danger ms-3">Hủy
                                        </button>
                                        </td>
                                        <td class="text-end row">
                                            <p class="col-7 mt-1">Thành tiền:</p> 
                                            <h4 class="col-5 text-danger">{{ formatPrice(order.total) }}</h4>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                            </div>
                            <div v-else class="text-center py-2">
                                <img src="https://img.freepik.com/vector-premium/paquete-pila-d-icono-caja-carton-pila-vector_88813-2412.jpg" class="img-fluid w-25 py-4" alt="">
                                <h5>Hiện chưa có đơn hàng nào đã giao thành công!</h5>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- <div class="page-heading">
        <div class="page-title">
            <div class="row mb-3">
                <div class="col-12 col-md-8 order-md-1 order-last">
                    <h3>QUẢN LÝ HÓA ĐƠN</h3>
                </div>
            </div>
        </div>

        <section class="section">
            <div class="card">
                <div class="card-header d-flex justify-content-between row">
                    <div class="row">
                        <h4 class="col-4 mt-1"></h4>
                        <div class="col-8">
                            <input class="form-control" type="text" placeholder="search" v-model="searchText" />
                        </div>
                    </div>
                    <div class="col-2"></div>
                </div>
                <div class="card-body">
                    <table class="table table-striped text-center" id="table1">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên khách hàng</th>
                                <th>Tổng tiền</th>
                                <th>Trạng thái</th>
                                <th>Ngày tạo</th>
                                <th>Ngày chỉnh sửa</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(order, index) in filteredOrders" :key="order._id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ order.customer.name }}</td>
                                <td>{{ order.total }}</td>
                                <td
                                :style="{ color: order.status === 0 ? 'grey' : order.status === 1 ? 'hotpink' : order.status === 2 ? 'green' : order.status === 4 ? 'blue' : 'red', fontWeight: 'bold' }">
                                    {{ order.status === 0 ? "Đang chờ duyệt..." : order.status === 1 ? "Đang gói hàng" : order.status === 2 ? "Đang vận chuyển" : order.status === 3 ? "Đã hủy" : "Đã hoàn thành"}}
                                </td>
                                <td>{{ order.created_at }}</td>
                                <td>{{ order.updated_at }}</td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <router-link :to="{ name: 'admin.order.detail', params: { id: order._id } }">
                                            <button type="button" class="btn btn-info">Chi tiết</button>
                                        </router-link>
                                        <button v-if="order.status === 0" type="button"
                                            @click="updateOrderStatus(order._id, { status: 1 })"
                                            class="btn btn-success ms-3">Duyệt
                                        </button>
                                        <button v-if="order.status === 1" type="button"
                                            @click="updateOrderStatus(order._id, { status: 2 })"
                                            class="btn btn-success ms-3">Giao hàng
                                        </button>
                                        <button v-if="order.status === 0 || order.status === 1" type="button"
                                            @click="updateOrderStatus(order._id, { status: 3 })"
                                            class="btn btn-danger ms-3">Hủy
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </div> -->
</template>

<script>
import { defineComponent, reactive, ref, computed } from "vue";
import OrderService from "@/services/order.service";
import Swal from 'sweetalert2';

export default defineComponent({
    props: {
        orders: { type: Array, default: [] },
    },

    setup(props, context) {
        const searchText = ref("");
        const filteredOrders = computed(() => {
            if (!searchText.value) {
                return reactive(props.orders).reverse();;
            }
            return props.orders.filter((order) =>
                Object.values(order).some((value) =>
                    String(value).toLowerCase().includes(searchText.value.toLowerCase())
                )
            );
        });
        
        //Duyệt đơn hàng
        const updateOrderStatus = async (id, data) => {
            if (data.status === 3){
                const result = await Swal.fire({
                title: 'Xác nhận',
                text: 'Bạn muốn hủy đơn hàng này?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancle',
                confirmButtonText: 'OK',
            });
            if (result.isConfirmed) {
                try {
                    await OrderService.updateOrderStatus(id, data);
                    context.emit("rerender:orders", reactive(props.orders));
                } catch (error) {
                    console.log(error);
                }
            }
            } else {
                const result = await Swal.fire({
                title: 'Xác nhận',
                text: 'Bạn muốn cập nhật trạng thái đơn hàng này?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancle',
                confirmButtonText: 'OK',
            });
            if (result.isConfirmed) {
                try {
                    await OrderService.updateOrderStatus(id, data);
                    context.emit("rerender:orders", reactive(props.orders));
                } catch (error) {
                    console.log(error);
                }
            } } 
        };
        const formatPrice = (price) => {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
        };
        const hasPendingOrders1 = computed(() => props.orders.some(order => order.status === 0));
        const hasPendingOrders2 = computed(() => props.orders.some(order => order.status === 1));
        const hasPendingOrders3 = computed(() => props.orders.some(order => order.status === 2));
        const hasPendingOrders4 = computed(() => props.orders.some(order => order.status === 3));
        const hasPendingOrders5 = computed(() => props.orders.some(order => order.status === 4));
        return {
            searchText,
            filteredOrders,
            updateOrderStatus,
            formatPrice,
            hasPendingOrders1,
            hasPendingOrders2,
            hasPendingOrders3,
            hasPendingOrders4,
            hasPendingOrders5
        };
    },
});
</script>
<style scoped>
.shadow {
    box-shadow: 0 0rem 0.5rem rgba(0,0,0,.15) !important;
}
.project-tab {
    padding-top: 5%;
    margin-top: -8%;
}

.project-tab #tabs {
    background: #007b5e;
    color: #eee;
}

.project-tab #tabs h6.section-title {
    color: #eee;
}

.project-tab #tabs .nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active {
    color: #0062cc;
    background-color: transparent;
    border-color: transparent transparent #f3f3f3;
    border-bottom: 3px solid !important;
    font-size: 16px;
    font-weight: bold;
}

.project-tab .nav-link {
    border: 1px solid transparent;
    border-top-left-radius: .25rem;
    border-top-right-radius: .25rem;
    color: #0062cc;
    font-size: 16px;
    font-weight: 600;
}

.project-tab .nav-link:hover {
    border: none;
}

.project-tab thead {
    background: #f3f3f3;
    color: #333;
}

.project-tab a {
    text-decoration: none;
    color: #333;
    font-weight: 600;
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
