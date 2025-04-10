<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <div class="row">
                <h6 class="m-0 font-weight-bold text-primary col-5">QUẢN LÝ NHÂN VIÊN</h6>
                <div class="col-3 m-0 text-end">
                    <button type="button" class="btn btn-success" @click="goToAddEmployee">Thêm nhân viên</button>
                </div>
                <div class="col-4">
                    <div class="input-group">
                        <input type="text" class="form-control small" placeholder="Search for..." aria-label="Search"
                            aria-describedby="basic-addon2" v-model="searchText">
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
                    <thead class="text-center">
                        <tr>
                            <th>STT</th>
                            <th>Tài khoản</th>
                            <th>Họ tên</th>
                            <th>Chức vụ</th>
                            <th>SĐT</th>
                            <th>Địa chỉ</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(admin, index) in filteredAdmins" :key="admin._id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ admin.username }}</td>
                            <td>{{ admin.name }}</td>
                            <td>{{ admin.role }}</td>
                            <td>{{ admin.phone }}</td>
                            <td>{{ admin.address }}</td>
                            <td>
                                <div class="d-flex justify-content-center">
                                    <button v-if=!admin.isLocked type="button" @click="lock(admin._id, { isLocked: 1 })" class="btn btn-warning ms-3">Khóa tài
                                        khoản
                                    </button>
                                    <button v-if=admin.isLocked type="button" @click="lock(admin._id, { isLocked: 0 })" class="btn btn-success ms-3">Mở khóa
                                    </button>
                                    <!-- <button type="button" class="btn btn-warning ms-3">Khóa tài khoản
                                    </button> -->
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <!-- <div class="page-heading">
        <div class="page-title">
            <div class="row mb-3">
                <div class="col-12 col-md-8 order-md-1 order-last">
                    <h3>QUẢN LÝ NHÂN VIÊN</h3>
                </div>
            </div>
        </div>

        <section class="section">
            <div class="card">
                <div class="card-header d-flex justify-content-between row">
                    <div class="row">
                        <div class="col-4 mt-1">
                            <button type="button" class="btn btn-success" @click="goToAddEmployee">Thêm nhân viên</button>
                        </div>
                        <div class="col-8">
                            <input class="form-control" type="text" placeholder="search" v-model="searchText" />
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <table class="table table-striped text-center" id="table1">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tài khoản</th>
                                <th>Họ tên</th>
                                <th>Chức vụ</th>
                                <th>SĐT</th>
                                <th>Địa chỉ</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(admin, index) in filteredAdmins" :key="admin._id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ admin.username }}</td>
                                <td>{{ admin.name }}</td>
                                <td>{{ admin.role }}</td>
                                <td>{{ admin.phone }}</td>
                                <td>{{ admin.address }}</td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        
                                        <button type="button" class="btn btn-warning ms-3">Khóa tài khoản
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
import { useRouter } from "vue-router";
import AdminService from "@/services/admin.service";
import Swal from 'sweetalert2';

export default defineComponent({
    props: {
        admins: { type: Array, default: [] },
    },
    setup(props, context) {
        const searchText = ref("");
        const dataTable = ref(null);
        const router = useRouter();
        const filteredAdmins = computed(() => {
            if (!searchText.value) {
                return reactive(props.admins);
            }
            return props.admins.filter((admin) =>
                Object.values(admin).some((value) =>
                    String(value).toLowerCase().includes(searchText.value.toLowerCase())
                )
            );
        });
        const goToAddEmployee = () => {
            router.push({ name: "admin.signup" });
        };
        const initializeDataTables = () => {
            if (dataTable.value) {
                dataTable.value.destroy();
            }
            dataTable.value = $("#dataTable").DataTable();
        };

        onMounted(() => {
            if (filteredAdmins.value.length > 0) {
                nextTick(() => {
                    initializeDataTables();
                });
            }
        });
        watch(() => filteredAdmins.value, () => {
            nextTick(() => {
                initializeDataTables()
            })
        })
        const lock = async (id, data) => {
            if (data.isLocked === 1){
                const result = await Swal.fire({
                title: 'Xác nhận',
                text: 'Bạn muốn khóa tài khoản nhân viên này?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancle',
                confirmButtonText: 'OK',
            });
            if (result.isConfirmed) {
                try {
                    await AdminService.update(id, data);
                    context.emit("rerender:admins", reactive(props.admins));
                } catch (error) {
                    console.log(error);
                }
            }
            } else {
                const result = await Swal.fire({
                title: 'Xác nhận',
                text: 'Bạn muốn mở khóa tài khoản nhân viên này?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancle',
                confirmButtonText: 'OK',
            });
            if (result.isConfirmed) {
                try {
                    await AdminService.update(id, data);
                    context.emit("rerender:admins", reactive(props.admins));
                } catch (error) {
                    console.log(error);
                }
            } } 
        };
        initializeDataTables();
        return {
            searchText,
            filteredAdmins,
            initializeDataTables,
            goToAddEmployee,
            lock
        };
    },
});
</script>

<style></style>