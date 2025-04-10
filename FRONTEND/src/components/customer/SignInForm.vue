<template>
    
    <div class="container">
        <div class="row">
            <div class="col-md-5 ms-5">
                <img src="/src/assets/img/anhnen.jpg"
                    class="img-fluid" alt="Sign In" />
            </div>
            <div class="col-md-6 py-5">
                <Form @submit="submitSignIn" :validation-schema="signInFormSchema" class="w-75 m-auto">
                    <h4 class="text-center pb-3">ĐĂNG NHẬP</h4>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <Field name="email" type="email" class="form-control" v-model="signInLocal.email" />
                        <ErrorMessage name="email" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <label for="password">Mật khẩu</label>
                        <Field name="password" type="password" class="form-control" v-model="signInLocal.password" />
                        <ErrorMessage name="password" class="error-feedback" />
                    </div>
                    <div class="form-group pt-3">
                        <button class="btn btn-primary w-100">Đăng nhập</button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>
  
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { defineComponent, reactive} from "vue";
export default defineComponent({
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    setup(props, context) {
        const signInLocal = reactive({
            email: "",
            password: "",
        });
        const signInFormSchema = yup.object().shape({
            email: yup.string().required("Email không được để trống."),
            password: yup.string().required("Mật khẩu không được để trống."),
        });
        const submitSignIn = () => {
            context.emit("submit:signin", signInLocal);
        };
        return {
            signInLocal,
            signInFormSchema,
            submitSignIn,
        };
    },
});
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

.error-feedback {
    color: red;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: block;
}

</style>
  