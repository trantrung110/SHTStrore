<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <div class="row">
                <h6 class="m-0 font-weight-bold text-primary col-5">QUẢN LÝ SẢN PHẨM</h6>
                <div class="col-3 m-0 text-end">
                    <button type="button" class="btn btn-success" @click="goToAddProduct">Thêm sản phẩm</button>
                </div>
                <div class="col-4">
                    <div class="input-group">
                        <input type="text" class="form-control small" placeholder="Search for..."
                            aria-label="Search" aria-describedby="basic-addon2" v-model="searchText">
                        <div class="input-group-append">
                            <button class="btn btn-primary" type="button">
                                <i class="fas fa-search fa-sm"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Hình ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Thương hiệu</th>
                            <th>Số lượng</th>
                            <th>Đã bán</th>
                            <th>Kho</th>
                            <th>Giá</th>
                            <th>Mô tả</th>
                            <th>Ngày tạo</th>
                            <th class="text-center">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(product, index) in filteredProducts" :key="product._id">
                                <td>{{ index + 1 }}</td>
                                <td>
                                    <img :src="'http://localhost:3000/' + product.image" alt="" style="width: 75px" />
                                </td>
                                <td>{{ product.name }}</td>
                                <td>{{ product.category.name }}</td>
                                <td>{{ product.quantity }}</td>
                                <td>{{ product.quantity_sale }}</td>
                                <td>{{ product.quantity_remain }}</td>
                                <td>{{ product.price }}</td>
                                <td>{{ product.description }}</td>
                                <td>{{ product.created_at }}</td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <router-link :to="{
                                            name: 'admin.product.edit',
                                            params: { id: product._id },
                                        }">
                                            <button type="button" class="btn btn-info">Sửa</button>
                                        </router-link>
                                        <button type="button" @click="deleteProduct(product._id)"
                                            class="btn btn-danger ms-3">
                                            Xóa
                                        </button>
                                    </div>
                                </td>
                            </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <!-- <div class="page-heading">
        <div class="row mb-3">
            <div class="col-12 col-md-8">
                <h3>QUẢN LÝ SẢN PHẨM</h3>
            </div>
        </div>
        <section class="section">
            <div class="card">
                <div class="card-header d-flex justify-content-between row">
                    <div class="row">
                        <div class="col-4 mt-1">
                            <button type="button" class="btn btn-success" @click="goToAddProduct">Thêm sản phẩm</button>
                        </div>
                        <div class="col-8 mt-1">
                            <input class="form-control" v-model="searchText" type="text" placeholder="search" />
                        </div>
                    </div>
                    <div class="col-2"></div>
                </div>
                <div class="card-body">
                    <table class="table table-striped text-center" id="table1">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Hình ảnh</th>
                                <th>Tên sản phẩm</th>
                                <th>Thương hiệu</th>
                                <th>SL</th>
                                <th>SL bán</th>
                                <th>SL còn lại</th>
                                <th>Giá</th>
                                <th>Mô tả</th>
                                <th>Ngày tạo</th>
                                <th>Ngày chỉnh sửa</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(product, index) in filteredProducts" :key="product._id">
                                <td>{{ index + 1 }}</td>
                                <td>
                                    <img :src="'http://localhost:3000/' + product.image" alt="" style="width: 75px" />
                                </td>
                                <td>{{ product.name }}</td>
                                <td>{{ product.category.name }}</td>
                                <td>{{ product.quantity }}</td>
                                <td>{{ product.quantity_sale }}</td>
                                <td>{{ product.quantity_remain }}</td>
                                <td>{{ product.price }}</td>
                                <td>{{ product.description }}</td>
                                <td>{{ product.created_at }}</td>
                                <td>{{ product.updated_at }}</td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <router-link :to="{
                                            name: 'admin.product.edit',
                                            params: { id: product._id },
                                        }">
                                            <button type="button" class="btn btn-info">Sửa</button>
                                        </router-link>
                                        <button type="button" @click="deleteProduct(product._id)"
                                            class="btn btn-danger ms-3">
                                            Xóa
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
import { defineComponent, reactive, ref, computed, onMounted, nextTick, watch } from "vue";
import ProductService from "@/services/product.service";
import { useRouter } from "vue-router";
import Swal from 'sweetalert2';

export default defineComponent({
    props: {
        products: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    setup(props, context) {
        const router = useRouter();
        const searchText = ref("");
        const dataTable = ref(null);
        const filteredProducts = computed(() => {
            if (!searchText.value) {
                return reactive(props.products).reverse();
            }
            return props.products.filter((product) =>
                Object.values(product).some((value) =>
                    String(value).toLowerCase().includes(searchText.value.toLowerCase())
                )
            );
        });
        const deleteProduct = async (productId) => {
            const result = await Swal.fire({
                title: 'Xác nhận',
                text: 'Bạn muốn xóa sản phẩm này ra khỏi hệ thống?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Hủy',
                confirmButtonText: 'Xóa',
            });

            if (result.isConfirmed) {
                try {
                    await ProductService.delete(productId);
                    context.emit("rerender:products", reactive(props.products));
                } catch (error) {
                    console.log(error);
                }
            }
        };
        const goToAddProduct = () => {
            router.push({ name: "admin.product.add" });
        };
        const initializeDataTables = () => {
            if (dataTable.value) {
                dataTable.value.destroy();
            }
            dataTable.value = $("#dataTable").DataTable();
        };

        onMounted(() => {
            if (filteredProducts.value.length > 0) {
                nextTick(() => {
                    initializeDataTables();
                });
            }
        }); 
        watch(() => filteredProducts.value, () => {
      nextTick(() => {
        initializeDataTables()
      })
    })
        initializeDataTables();
        return {
            searchText,
            initializeDataTables,
            filteredProducts,
            deleteProduct,
            goToAddProduct
        };
    },
});
</script>