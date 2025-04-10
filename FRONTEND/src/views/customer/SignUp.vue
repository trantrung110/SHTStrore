<template>
    <div class="page">
        <SignUpForm @submit:signup="submitSignUp" />
        <p class="text-center text-danger">{{ message }}</p>
    </div>
</template>

<script>
import SignUpForm from "@/components/customer/SignUpForm.vue";
import customerService from "@/services/customer.service";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from 'vue-toast-notification';

export default defineComponent({
    components: {
        SignUpForm,
    },
    setup(props, context) {
        const toast = useToast();
        const message = ref("");
        const router = useRouter();
        const submitSignUp = async (data) => {
            try {
                await customerService.signUp(data);
                toast.success('Đăng ký tài khoản thành công!', { timeout: 1500 });
                router.push({ name: 'signin' });
            } catch (error) {
                console.log(error);
                message.value = "Đăng ký thất bại. Vui lòng thử lại.";
            }
        };
        return { message, submitSignUp, }
    },
});
</script>