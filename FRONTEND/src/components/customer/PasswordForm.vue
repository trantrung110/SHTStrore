<template>
    <Form @submit="submitChange" :validation-schema="userFormSchema">
        <div class="row">
            <div class="form-group col-md-12">
                <label for="old_password">Mật Khẩu Hiện Tại</label>
                <Field name="old_password" type="password" class="form-control" v-model="old_password" />
                <ErrorMessage name="old_password" class="error-feedback" />
            </div>
            <div class="form-group col-md-12">
                <label for="password">Mật Khẩu Mới</label>
                <Field name="password" type="password" class="form-control" v-model="password" />
                <ErrorMessage name="password" class="error-feedback" />
            </div>
            <div class="form-group col-md-12">
                <label for="password_confirm">Nhập Lại Mật Khẩu</label>
                <Field name="password_confirm" type="password" class="form-control" v-model="password_confirm" />
                <ErrorMessage name="password_confirm" class="error-feedback" />
            </div>
            <div class="form-group col-md-12">
                <button class="btn btn-primary w-100 mt-3">
                    Lưu
                </button>
            </div>
        </div>
    </Form>
</template>
  
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:changePassword"],
    props: {
        user: { type: Object, required: true },
    },
    data() {
        const userFormSchema = yup.object().shape({
            old_password: yup.string().required("Mật khẩu hiện tại không được để trống."),
            password: yup.string().required("Mật khẩu mới không được để trống."),
            password_confirm: yup
                .string()
                .oneOf(
                    [yup.ref("password"), null],
                    "Mật khẩu xác nhận không trùng khớp."
                )
                .required("Mật khẩu xác nhận không được để trống."),
        });
        return {
            old_password: "", // Lưu trữ mật khẩu cũ
            password: "",     // Lưu trữ mật khẩu mới
            userFormSchema,
        };
    },
    methods: {
        submitChange() {
            this.$emit("submit:changePassword", {
                currentPassword: this.old_password,
                newPassword: this.password,
            });
        },
    },
};
</script>
  
<style scoped>
.form-group {
    margin-bottom: 1rem;
}

.form-control {
    font-size: 1rem;
    padding: 0.5rem;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
}

label {
    font-family: VL BoosterNextFYThin !important;
    font-weight: bold;
    color: black;
}
.error-feedback {
    font-family: VL BoosterNextFYThin !important;
    font-weight: bold;
    color: red;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: block;
}

.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
    color: #fff;
    font-weight: bold;
}

.btn-primary:hover {
    background-color: #0069d9;
    border-color: #0062cc;
    color: #fff;
    font-weight: bold;
}</style>
  
  