<template>
    <div id="wrapper">
        <AppDrawer></AppDrawer>
        <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
                <AppBar></AppBar>
                <div class="container-fluid">
                    <router-view v-slot="{ Component }">
                        <transition name="fade">
                            <component :is="Component" />
                        </transition>
                    </router-view>
                </div>
                <!-- Footer -->
                <footer class="sticky-footer bg-white">
                    <div class="container my-auto">
                        <div class="copyright text-center my-auto">
                            <span>Bài tập cuối kỳ Học phần: Phát triển hệ thống TMĐT</span>
                        </div>
                    </div>
                </footer>
                <!-- End of Footer -->
            </div>
        </div>

        <!-- <div class="w3-overlay w3-hide-large w3-animate-opacity" style="cursor: pointer"></div>
        <div class="w3-main" style="margin-left: 310px; margin-top: 43px"> -->

        <!-- </div> -->
    </div>
</template>

<script>
import "@/assets/admin/jquery/jquery.min.js";
import "@/assets/admin/jquery-easing/jquery.easing.min.js";
import "@/assets/admin/js/sb-admin-2.min.js";
import "@/assets/admin/datatables/jquery.dataTables.min.js";
import "/src/assets/admin/datatables/dataTables.bootstrap4.min.js";
import "/src/assets/admin/js/demo/datatables-demo.js";
import AppDrawer from "@/components/admin/AppDrawer.vue";
import AppBar from "@/components/admin/AppBar.vue";
import { defineComponent } from "vue";
export default defineComponent({
    components: {
        AppBar,
        AppDrawer,
    },
});
</script>

<style>
@import "@/assets/admin/css/sb-admin-2.min.css";
@import "@/assets/admin/datatables/dataTables.bootstrap4.min.css";
</style>