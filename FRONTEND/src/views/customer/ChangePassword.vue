<template>
    <div v-if="user" class="page p-5">
        <h3 class="text-center mb-4">ĐỔI MẬT KHẨU TÀI KHOẢN</h3>
        <div class="col-6 mx-auto">
            <ChangeForm :user="user" @submit:changePassword="changePass" />
            <p class="text-thin">{{ errorMessage }}</p>
        </div>
    </div>
</template>

<script>
import ChangeForm from "@/components/customer/PasswordForm.vue";
import CustomerService from "@/services/customer.service";

export default {
    components: {
        ChangeForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            user: null,
            message: "",
        };
    },
    methods: {
        async getUser(id) {
            try {
                this.user = await CustomerService.findId(id);
            } catch (error) {
                console.log(error);
            }
        },
        async changePass(data) {
            try {
                await CustomerService.changePassword(this.user._id, data);
                this.$toast.success('Thay đổi mật khẩu thành công!', { timeout: 1500 });
            } catch (error) {
                console.log(error);
                const errorMessage = error.response.data.message;
                this.$toast.error(errorMessage, { timeout: 1500 });
            }
        },
    },

    created() {
        this.getUser(this.id);
        this.message = "";
    },
};
</script>
