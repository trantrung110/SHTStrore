<template>
    <Form @submit="submitChange" :validation-schema="userFormSchema">
        <div class="row">
            <div class="form-group col-md-12">
                <label for="name">Họ và Tên</label>
                <Field name="name" type="text" class="form-control text-thin" v-model="userLocal.name" />
                <ErrorMessage name="name" class="error-feedback" />
            </div>
            <div class="form-group col-md-12">
                <label for="phone">Số điện thoại</label>
                <Field name="phone" type="text" class="form-control text-thin" v-model="userLocal.phone" />
                <ErrorMessage name="phone" class="error-feedback" />
            </div>
            <div class="form-group col-md-12">
                <label for="address">Địa chỉ</label>
                <Field name="address" type="text" class="form-control text-thin" v-model="userLocal.address" />
                <ErrorMessage name="address" class="error-feedback" />
            </div>
            <div class="form-group col-md-12">
                <button class="btn btn-primary w-100 mt-3">Lưu</button>
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
    emits: ["submit:update"],
    props: {
        user: { type: Object, required: true },
    },
    data() {
        const userFormSchema = yup.object().shape({
            name: yup.string().required("Họ và tên không được để trống."),
            phone: yup.string().required("Số điện thoại không được để trống."),
            address: yup
                .string().required("Địa chỉ không được để trống."),
        });
        return {
            userLocal: this.user,
            userFormSchema,
        };
    },
    methods: {
        submitChange() {
            this.$emit("submit:update", this.userLocal);
        },
    },
};
</script>
  
<style scoped>
.text-thin {
    font-family: VL BoosterNextFYThin !important;
    color: #626467;
    font-weight: bold;
}
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
  
  