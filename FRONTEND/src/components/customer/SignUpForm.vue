<template>
    <Form @submit="submitSignUp" :validation-schema="signUpFormSchema" class="w-50 m-auto">
        <h4 class="text-center pt-5 pb-4">ĐĂNG KÝ</h4>
        <div class="row">
            <div class="col">
                <div class="form-group">
                    <label for="name">Tên</label>
                    <Field name="name" type="text" class="form-control" v-model="signUpLocal.name" />
                    <ErrorMessage name="name" class="error-feedback" />
                </div>

                <div class="form-group">
                    <label for="">Giới tính</label>
                    <div class="form-check form-check-inline">
                        <Field name="gender" type="radio" class="form-check-input" value="1" v-model="signUpLocal.gender" />Nam
                    </div>
                    <div class="form-check form-check-inline">
                        <Field name="gender" type="radio" class="form-check-input ml-4" value="0" v-model="signUpLocal.gender" />
                        Nữ
                    </div>
                    <ErrorMessage name="gender" class="error-feedback d-block" />
                </div>

                <div class="form-group">
                    <label for="birth">Ngày sinh</label>
                    <Field name="birth" type="date" class="form-control" v-model="signUpLocal.birth" />
                    <ErrorMessage name="birth" class="error-feedback" />
                </div>

                <div class="form-group">
                    <label for="address">Địa chỉ</label>
                    <Field as="textarea" name="address" class="form-control" v-model="signUpLocal.address" />
                    <ErrorMessage name="address" class="error-feedback" />
                </div>
            </div>
            <div class="col">
                <div class="form-group">
                    <label for="phone">Số điện thoại</label>
                    <Field name="phone" type="text" class="form-control" v-model="signUpLocal.phone" />
                    <ErrorMessage name="phone" class="error-feedback" />
                </div>

                <div class="form-group">
                    <label for="email">Email</label>
                    <Field name="email" type="email" class="form-control" v-model="signUpLocal.email" />
                    <ErrorMessage name="email" class="error-feedback" />
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
            </div>
            <div class="form-group pt-4 pb-5">
                <button class="btn btn-primary w-100">Đăng Ký</button>
            </div>
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
            email: "",
            phone: "",
            gender: "",
            birth: "",
            address: "",
            password: "",
            passwordConfirmation: "",
        });

        const signUpFormSchema = yup.object().shape({
            name: yup.string().required("Tên không được để trống."),
            email: yup.string().required("Email không được để trống."),
            gender: yup.string().required("Giới tính không được để trống."),
            birth: yup.string().required("Ngày sinh không được để trống."),
            address: yup.string().required("Địa chỉ không được để trống."),
            phone: yup.string().required("Số điện thoại không được để trống."),
            password: yup.string().required("Mật khẩu không được để trống."),
            passwordConfirmation: yup
                .string()
                .oneOf(
                    [yup.ref("password"), null],
                    "Mật khẩu xác nhận không trùng khớp."
                )
                .required("Mật khẩu xác nhận không được để trống."),
        });

        const submitSignUp = () => {
            context.emit("submit:signup", signUpLocal);
        };

        return {
            signUpLocal,
            signUpFormSchema,
            submitSignUp,
        };
    },
});
</script>

<style scoped>
@import "@/assets/form.css";
</style>
