<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <div class="row">
                <h6 class="m-0 font-weight-bold text-primary col-5">QUẢN LÝ LOẠI SẢN PHẨM</h6>
                <div class="col-3 m-0 text-end">
                    <button type="button" class="btn btn-success" @click="goToAddCategory">Thêm loại sản phẩm</button>
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
                            <th>Tên Loại Sản Phẩm</th>
                            <th>Ngày Tạo</th>
                            <th>Ngày Chỉnh Sửa</th>
                            <th class="text-center">Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(category, index) in filteredCategories" :key="category._id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ category.name }}</td>
                            <td>{{ category.created_at }}</td>
                            <td>{{ category.updated_at }}</td>
                            <td>
                                <div class="d-flex justify-content-center">
                                    <router-link :to="{ name: 'admin.category.edit', params: { id: category._id } }">
                                        <button type="button" class="btn btn-info">Sửa</button>
                                    </router-link>
                                    <button type="button" @click="deleteCategory(category._id)"
                                        class="btn btn-danger ms-3">Xóa
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, reactive, ref, computed, onBeforeMount, onMounted, watch } from "vue";
import CategoryService from "@/services/category.service";
import { useRouter } from "vue-router";
import { nextTick } from "vue";
import Swal from 'sweetalert2';

export default defineComponent({
    props: {
        categories: { type: Array, default: [] },
    },
    setup(props, context) {
        const router = useRouter();
        const categories = reactive(props.categories);
        const searchText = ref("");
        const dataTable = ref(null);

        const filteredCategories = computed(() => {
            if (!searchText.value) {
                return reactive(props.categories);
            }
            return props.categories.filter((category) =>
                Object.values(category).some((value) =>
                    String(value).toLowerCase().includes(searchText.value.toLowerCase())
                )
            );
        });

        const deleteCategory = async (id) => {
            const result = await Swal.fire({
                title: 'Xác nhận',
                text: 'Bạn muốn xóa thương hiệu này ra khỏi hệ thống?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Hủy',
                confirmButtonText: 'Xóa',
            });

            if (result.isConfirmed) {
                try {
                    await CategoryService.delete(id);
                    context.emit("rerender:categories", categories);
                } catch (error) {
                    console.log(error);
                }
            }
        };

        const goToAddCategory = () => {
            router.push({ name: "admin.category.add" });
        };

        const initializeDataTables = () => {
            if (dataTable.value) {
                dataTable.value.destroy();
            }
            dataTable.value = $("#dataTable").DataTable();
            dataTable.value.draw();
        };

        watch(() => filteredCategories.value, () => {
            nextTick(() => {
                initializeDataTables()
            })
        })
        return {
            searchText,
            filteredCategories,
            deleteCategory,
            goToAddCategory,
        };
    },
});
</script>



<style>
/* @import "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"; */
</style>
<!-- <div class="page-heading">
        <div class="page-title">
            <div class="row mb-3">
                <div class="col-12 col-md-8 order-md-1 order-last">
                    <h3>QUẢN LÝ Thương hiệu</h3>
                </div>
            </div>
        </div>

        <section class="section">
            <div class="card">
                <div class="card-header d-flex justify-content-between row">
                    <div class="row">
                        <div class="col-4 mt-1">
                            <button type="button" class="btn btn-success" @click="goToAddCategory">Thêm Thương hiệu</button>
                        </div>
                        <div class="col-8 mt-1">
                            <input class="form-control" v-model="searchText" type="text" placeholder="search" />
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên Thương hiệu</th>
                                <th>Ngày tạo</th>
                                <th>Ngày chỉnh sửa</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(category, index) in filteredCategories" :key="category._id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ category.name }}</td>
                                <td>{{ category.created_at }}</td>
                                <td>{{ category.updated_at }}</td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <router-link :to="{ name: 'admin.category.edit', params: { id: category._id } }">
                                            <button type="button" class="btn btn-info">Sửa</button>
                                        </router-link>
                                        <button type="button" @click="deleteCategory(category._id)"
                                            class="btn btn-danger ms-3">Xóa
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