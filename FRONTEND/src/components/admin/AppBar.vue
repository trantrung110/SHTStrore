<template>
    <!-- Topbar -->
    <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

        <!-- Sidebar Toggle (Topbar) -->
        <form class="form-inline">
            <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                <i class="fa fa-bars"></i>
            </button>
        </form>

        <!-- Topbar Navbar -->
        <ul class="navbar-nav ml-auto">

            <!-- Nav Item - Search Dropdown (Visible Only XS) -->
            <li class="nav-item dropdown no-arrow d-sm-none">
                <a class="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-search fa-fw"></i>
                </a>
                <!-- Dropdown - Messages -->
                <div class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                    aria-labelledby="searchDropdown">
                    <form class="form-inline mr-auto w-100 navbar-search">
                        <div class="input-group">
                            <input type="text" class="form-control bg-light border-0 small" placeholder="Search for..."
                                aria-label="Search" aria-describedby="basic-addon2">
                            <div class="input-group-append">
                                <button class="btn btn-primary" type="button">
                                    <i class="fas fa-search fa-sm"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </li>
            <li class="nav-item dropdown no-arrow">
                <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <span class="mr-2 d-none d-lg-inline text-dark bold small">{{ admin.role }}</span>
                </a>
            </li>
            <div class="topbar-divider d-none d-sm-block"></div>

            <!-- Nav Item - User Information -->
            <li class="nav-item dropdown no-arrow">
                <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <span class="mr-2 d-none d-lg-inline text-dark bold small">{{ admin.name }}</span>
                    <img class="img-profile rounded-circle" src="https://cdn-icons-png.flaticon.com/512/149/149071.png">
                </a>
                <!-- Dropdown - User Information -->
                <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                    <a @click="signOut" class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                        <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                        Đăng Xuất
                    </a>
                </div>
            </li>

        </ul>

    </nav>
    <!-- End of Topbar -->
    <!-- <div class="appbar">
        <div>
            <nav class="navbar navbar-dark bg-dark">
                <button class="navbar-toggler" type="button">
                    <span class="navbar-toggler-icon ms-2"></span>
                </button>
                <div class="btn-group">
                    <button class="btn btn-primary me-2" type="button" @click="signOut">Đăng xuất</button>
                </div>
            </nav>
        </div>
    </div> -->
</template>

<script>
import { useRouter } from "vue-router"
import { useAdminStore } from '@/stores/store';
import { useSaleStore } from '@/stores/store';
import { useStaffStore } from '@/stores/store';
import { defineComponent } from "vue";
import adminService from "@/services/admin.service";

export default defineComponent({
    setup() {
        const store = useAdminStore();
        const storeSale = useSaleStore();
        const storeStaff = useStaffStore();
        const admin = JSON.parse(localStorage.getItem("admin"));
        const router = useRouter();
        const signOut = async () => {
            try {
                const headers = {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                };
                await adminService.signOut({ headers });
                localStorage.removeItem('token');
                localStorage.removeItem('admin');
                store.setIsAuthenticatedAdmin(false);
                storeSale.setIsAuthenticatedSale(false);
                storeStaff.setIsAuthenticatedStaff(false);
                router.push({ name: 'admin.signin' });
            } catch (error) {
                console.log(error);
            }
        };
        return {
            admin,
            store,
            storeSale,
            signOut
        }
    },
});
</script>