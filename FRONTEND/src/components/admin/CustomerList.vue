<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <div class="row">
                <h6 class="m-0 font-weight-bold text-primary col-6">QUẢN LÝ TÀI KHOẢN KHÁCH HÀNG</h6>
                <div class="col-6">
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
                            <th>Email</th>
                            <th>Họ tên</th>
                            <th>SĐT</th>
                            <th>Ngày sinh</th>
                            <th>Giới tính</th>
                            <th>Địa chỉ</th>
                            <!-- <th>Thao tác</th> -->
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(customer, index) in filteredCustomers" :key="customer._id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ customer.email }}</td>
                                <td>{{ customer.name }}</td>
                                <td>{{ customer.phone }}</td>
                                <td>{{ customer.birthday }}</td>
                                <td>{{ customer.gender === 1 ? 'Nam' : 'Nữ' }}</td>
                                <td>{{ customer.address }}</td>
                                <!-- <td>
                                    
                                        
                                        <button type="button" class="btn btn-warning ms-3">Khóa tài khoản
                                        </button>
                                    
                                </td> -->
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
                    <h3>QUẢN LÝ KHÁCH HÀNG</h3>
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
                </div>
                <div class="card-body">
                    <table class="table table-striped text-center" id="table1">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Email</th>
                                <th>Họ tên</th>
                                <th>SĐT</th>
                                <th>Ngày sinh</th>
                                <th>Giới tính</th>
                                <th>Địa chỉ</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(customer, index) in filteredCustomers" :key="customer._id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ customer.email }}</td>
                                <td>{{ customer.name }}</td>
                                <td>{{ customer.phone }}</td>
                                <td>{{ customer.birthday }}</td>
                                <td>{{ customer.sex === 1 ? 'Nam' : 'Nữ' }}</td>
                                <td>{{ customer.address }}</td>
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

export default defineComponent({
    props: {
        customers: { type: Array, default: [] },
    },
    setup(props, context) {
        const searchText = ref("");
        const dataTable = ref(null);
        const filteredCustomers = computed(() => {
            if (!searchText.value) {
                return reactive(props.customers);
            }
            return props.customers.filter((customer) =>
                Object.values(customer).some((value) =>
                    String(value).toLowerCase().includes(searchText.value.toLowerCase())
                )
            );
        });
        const initializeDataTables = () => {
            if (dataTable.value) {
                dataTable.value.destroy();
            }
            dataTable.value = $("#dataTable").DataTable();
        };

        onMounted(() => {
            if (filteredCustomers.value.length > 0) {
                nextTick(() => {
                    initializeDataTables();
                });
            }
        });
        watch(() => filteredCustomers.value, () => {
      nextTick(() => {
        initializeDataTables()
      })
    })
        initializeDataTables();
        
        return {
            searchText,
            filteredCustomers,
            initializeDataTables,
            // deleteCustomer,
        };
    },
});
</script>
