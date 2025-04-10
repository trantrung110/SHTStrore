<template>
    <Form @submit="submitSignUp" :validation-schema="signUpFormSchema">
        <div class="form-group">
            <label for="username">Tài khoản</label>
            <Field name="username" type="text" class="form-control" v-model="signUpLocal.username" />
            <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="name">Họ và tên</label>
            <Field name="name" type="text" class="form-control" v-model="signUpLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="phone">Số điện thoại</label>
            <Field name="phone" type="text" class="form-control" v-model="signUpLocal.phone" />
            <ErrorMessage name="phone" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <Field name="address" type="text" class="form-control" v-model="signUpLocal.address" />
            <ErrorMessage name="address" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="role">Chức vụ</label>
            <Field name="role" type="text" class="form-control" v-model="signUpLocal.role" />
            <ErrorMessage name="role" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="password">Mật khẩu</label>
            <Field name="password" type="password" class="form-control" v-model="signUpLocal.password" />
            <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="passwordConfirmation">Xác nhận mật khẩu</label>
            <Field name="passwordConfirmation" type="password" class="form-control"
                v-model="signUpLocal.passwordConfirmation" />
            <ErrorMessage name="passwordConfirmation" class="error-feedback" />
        </div>
        <div class="form-group text-center">
            <button class="btn btn-primary">Thêm tài khoản</button>
        </div>
    </Form>
</template>
  
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { defineComponent, reactive } from "vue";

export default defineComponent({
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    setup(props, context) {
        const signUpLocal = reactive({
            name: "",
            phone: "",
            role: "",
            password: "",
            passwordConfirmation: "",
        });
        const signUpFormSchema = yup.object().shape({
            username: yup.string().required("Tên đăng nhập không được để trống."),
            password: yup.string().required("Mật khẩu không được để trống."),
            name: yup.string().required("Họ và tên không được để trống."),
            phone: yup.string().required("SĐT không được để trống."),
            role: yup.string().required("Chức vụ không được để trống."),
            passwordConfirmation: yup
                .string()
                .oneOf([yup.ref("password"), null], "Mật khẩu xác nhận không trùng khớp.")
                .required("Mật khẩu xác nhận không được để trống."),
        });
        const submitSignUp = () => {
            context.emit("submit:signup", signUpLocal);
        }
        return {
            signUpLocal,
            signUpFormSchema,
            submitSignUp,
        }
    },
});
</script>
  
<style scoped>
@import "@/assets/form.css";
</style>
  