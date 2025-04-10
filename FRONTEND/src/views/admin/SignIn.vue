<template>
    <div class="page">
        <SignInForm @submit:signin="submitSignIn" />
        <p class="text-center text-danger">{{ message }}</p>
    </div>
</template>
<script>
import adminService from "@/services/admin.service";
import SignInForm from "@/components/admin/SignInForm.vue";
import { defineComponent, ref } from "vue";
import { useAdminStore } from "@/stores/store";
import { useSaleStore } from "@/stores/store";
import { useStaffStore } from "@/stores/store";
import { useRouter } from "vue-router";

export default defineComponent({
    components: {
        SignInForm,
    },
    setup() {
        const store = useAdminStore();
        const storeSale = useSaleStore();
        const storeStaff = useStaffStore();
        const router = useRouter();
        const message = ref("");
        const submitSignIn = async (data) => {
            try {
                const response = await adminService.signIn(data);
                const token = response.token;
                if (response.admin.isLocked === 1) {
                    message.value = "Tài khoản đã bị khóa";
                } else {
                    localStorage.setItem("token", token);
                    localStorage.setItem("admin", JSON.stringify(response.admin));

                    //console.log("admin: "+ response.admin);
                    if (response.role === "Quản lý đơn hàng") {
                        storeSale.setIsAuthenticatedSale(true);
                        router.push({ name: 'admin.dashboard.show' });
                    }
                    else if (response.role === "Quản lý kho hàng") {
                        storeStaff.setIsAuthenticatedStaff(true);
                        router.push({ name: 'admin.dashboard.show' });
                    } else {
                        store.setIsAuthenticatedAdmin(true);
                        router.push({ name: 'admin.dashboard.show' });
                    }
                }
            } catch (error) {
                console.log(error);
                message.value = "Tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại.";
            }
        };
        return {
            store,
            storeSale,
            storeStaff,
            message,
            submitSignIn
        }
    },
});
</script>