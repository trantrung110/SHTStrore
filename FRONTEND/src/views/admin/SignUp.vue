<template>
    <div class="page">
        <div class="d-flex justify-content-center align-items-center h-100">
            <div class="p-5 m-5 shadow" style="width: 40%;">
                <h4 class="text-center pb-3">THÊM TÀI KHOẢN NHÂN VIÊN</h4>
                <SignUpForm @submit:signup="submitSignUp" />
                <p class="text-center text-danger">{{ message }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import SignUpForm from "@/components/admin/SignUpForm.vue";
import adminService from "@/services/admin.service";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
    components: {
        SignUpForm,
    },
    setup(props, context) {
        const message = ref("");
        const router = useRouter();
        const submitSignUp = async (data) => {
            try {
                await adminService.signUp(data);
                router.push({ name: 'admin.signin' });
            } catch (error) {
                console.log(error);
                message.value = "Thêm tài khoản nhân viên không thành công. Vui lòng thử lại.";
            }
        };
        return { message, submitSignUp, }
    },
});
</script>