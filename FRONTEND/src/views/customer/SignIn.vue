<template>
    <div class="page">
        <SignInForm @submit:signin="submitSignIn" />
        <p class="text-center text-danger">{{ message }}</p>
    </div>
</template>

<script>
import customerService from "@/services/customer.service";
import SignInForm from "@/components/customer/SignInForm.vue";
import { defineComponent, ref } from "vue";
import { useCustomerStore } from "@/stores/store";
import { useRouter } from "vue-router";

export default defineComponent({
    components: {
        SignInForm,
    },
    setup() {
        const store = useCustomerStore();
        const message = ref("");
        const router = useRouter();
        const submitSignIn = async (data) => {
            try {
                const response = await customerService.signIn(data);
                const token = response.token;
                localStorage.clear();
                localStorage.setItem("token", token);
                store.setIsAuthenticatedCustomer(true);
                localStorage.setItem("user", JSON.stringify(response.customer));
                router.push({ name: 'home' });
            } catch (error) {
                console.log(error);
                message.value = "Tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại.";
            }
        };
        return { store, message, submitSignIn }
    },
});
</script>