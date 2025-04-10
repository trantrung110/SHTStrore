<template>
    <!-- Sidebar -->
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

        <!-- Sidebar - Brand -->
        <a class="sidebar-brand d-flex align-items-center justify-content-center">
            <div class="sidebar-brand-icon rotate-n-15">
            </div>
            <div class="sidebar-brand-text mx-3">SHTStore</div>
        </a>

        <!-- Divider -->
        <hr class="sidebar-divider my-0">

        <!-- Nav Item - Dashboard -->
        <li v-if="storeAdmin.isAuthenticatedAdmin || storeSale.isAuthenticatedSale || storeStaff.isAuthenticatedStaff" class="nav-item">
            <a class="nav-link" @click="goToDashBoard">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span></a>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider">

        <!-- Heading -->
        <div  v-if="storeAdmin.isAuthenticatedAdmin || storeStaff.isAuthenticatedStaff" class="sidebar-heading">
            Điều phối kho hàng
        </div>

        <!-- Nav Item - Pages Collapse Menu -->
        <li v-if="storeAdmin.isAuthenticatedAdmin || storeStaff.isAuthenticatedStaff" class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true"
                aria-controls="collapseTwo">
                <i class="fas fa-fw fa-cog"></i>
                <span>Sản Phẩm</span>
            </a>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Quản Lý:</h6>
                    <a class="collapse-item" @click="goToCategory">Quản Lý Loại Sản Phẩm</a>
                    <a class="collapse-item" @click="goToProduct">Quản Lý Sản Phẩm</a>
                </div>
            </div>
        </li>

        <!-- Nav Item - Utilities Collapse Menu -->
        <li v-if="storeSale.isAuthenticatedSale || storeAdmin.isAuthenticatedAdmin" class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                aria-expanded="true" aria-controls="collapseUtilities">
                <i class="fas fa-fw fa-wrench"></i>
                <span>Đơn Hàng</span>
            </a>
            <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Quản lý:</h6>
                    <a class="collapse-item" @click="goToOrder">Đơn hàng mới</a>
                    <a class="collapse-item" >Vận chuyển</a>
                    <a class="collapse-item" >Đơn hàng thành công</a>
                    <a class="collapse-item" >Đơn đã hủy</a>
                    <a class="collapse-item" >Tất cả đơn hàng</a>
                </div>
            </div>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider">

        <!-- Heading -->
        <div v-if="storeAdmin.isAuthenticatedAdmin" class="sidebar-heading">
            Nhân sự
        </div>

        <!-- Nav Item -->
        <li v-if="storeAdmin.isAuthenticatedAdmin" class="nav-item">
            <a @click="goToAdmin" class="nav-link" >
                <i class="fas fa-fw fa-chart-area"></i>
                <span>Quản lý nhân viên</span></a>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider d-none d-md-block">

        <!-- Heading -->
        <div v-if="storeAdmin.isAuthenticatedAdmin"  class="sidebar-heading">
            Khách Hàng
        </div>

        <!-- Nav Item - Charts -->
        <li v-if="storeAdmin.isAuthenticatedAdmin" class="nav-item">
            <a @click="goToCustomer" class="nav-link">
                <i class="fas fa-fw fa-chart-area"></i>
                <span>Quản lý khách hàng</span></a>
        </li>

        <!-- Sidebar Toggler (Sidebar)
        <div class="text-center d-none d-md-inline">
            <button class="rounded-circle border-0" id="sidebarToggle"></button>
        </div> -->

    </ul>
    <!-- End of Sidebar -->
    <!-- <nav class="w3-sidebar w3-white" style="z-index: 3; width: 300px">
        <br />
        <div class="w3-container w3-row">
            <div>
                <img src="https://w7.pngwing.com/pngs/922/214/png-transparent-computer-icons-avatar-businessperson-interior-design-services-corporae-building-company-heroes-thumbnail.png"
                    class="w3-circle w3-margin-right" style="width: 100px; margin-left: 70px;" />
            </div>
            <p>{{ admin.role}}</p>
            <p>{{ admin.name}}</p>
        </div>
        <hr />
        <div class="w3-bar-block">
            <a v-if="storeAdmin.isAuthenticatedAdmin || storeSale.isAuthenticatedSale || storeStaff.isAuthenticatedStaff"
                class="w3-bar-item w3-button w3-padding menu-item" @click="goToDashBoard">
                <i class="fa fa-tachometer fa-fw"></i> DASH BOARD
            </a>
            <a v-if="storeAdmin.isAuthenticatedAdmin || storeStaff.isAuthenticatedStaff"
                class="w3-bar-item w3-button w3-padding menu-item" @click="goToCategory">
                <i class="fa fa-list-alt fa-fw"></i> QUẢN LÝ Thương hiệu
            </a>
            <a v-if="storeAdmin.isAuthenticatedAdmin || storeStaff.isAuthenticatedStaff"
                class="w3-bar-item w3-button w3-padding menu-item" @click="goToProduct">
                <i class="fa fa-shopping-cart fa-fw"></i> QUẢN LÝ SẢN PHẨM
            </a>
            <a v-if="storeAdmin.isAuthenticatedAdmin" class="w3-bar-item w3-button w3-padding menu-item"
                @click="goToCustomer">
                <i class="fa fa-users fa-fw"></i> QUẢN LÝ KHÁCH HÀNG
            </a>
            <a v-if="storeSale.isAuthenticatedSale || storeAdmin.isAuthenticatedAdmin"
                class="w3-bar-item w3-button w3-padding menu-item" @click="goToOrder">
                <i class="fa fa-file-text fa-fw"></i> QUẢN LÝ HÓA ĐƠN
            </a>
            <a v-if="storeAdmin.isAuthenticatedAdmin" class="w3-bar-item w3-button w3-padding menu-item"
                @click="goToAdmin">
                <i class="fa fa-users fa-fw"></i> QUẢN LÝ NHÂN VIÊN
            </a>
        </div>
    </nav> -->
</template>

<script>

import { useRouter } from "vue-router";
import { defineComponent, computed, watch } from 'vue';
import { useSaleStore } from '@/stores/store';
import { useAdminStore } from '@/stores/store';
import { useStaffStore } from '@/stores/store';
export default defineComponent({
    components: {

    },
    setup() {
        const router = useRouter();
        const storeSale = useSaleStore();
        const storeAdmin = useAdminStore();
        const storeStaff = useStaffStore();
        const admin = JSON.parse(localStorage.getItem("admin"));
        const goToDashBoard = () => { router.push({ name: "admin.dashboard.show" }); };
        const goToCategory = () => { router.push({ name: "admin.category.all" }); };
        const goToProduct = () => { router.push({ name: "admin.product.all" }); };
        const goToCustomer = () => { router.push({ name: "admin.customer.all" }); };
        const goToOrder = () => { router.push({ name: "admin.order.all" }); };
        const goToAdmin = () => { router.push({ name: "admin.all" }); };
        watch(
            () => storeAdmin,
            (newStoreAdmin) => {
                admin.value = newStoreAdmin?.admin;
            },
            { deep: true }
        );
        return {
            admin,
            storeSale,
            storeAdmin,
            storeStaff,
            goToDashBoard,
            goToCategory,
            goToProduct,
            goToCustomer,
            goToOrder,
            goToAdmin,
        };
    },
});
</script>

<!-- <style scoped>


.w3-sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;
}

.menu-item:hover {
    background-color: orange;
}

.menu-item {
    margin-bottom: 20px;

}

.w3-bar-block {
    font-family: "Roboto", sans-serif;
    font-size: 16px;
}

@import url(https://fonts.googleapis.com/css?family=Open+Sans);
@import url(https://www.w3schools.com/w3css/4/w3.css);
@import url(https://fonts.googleapis.com/css?family=Raleway);
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css);
</style> -->