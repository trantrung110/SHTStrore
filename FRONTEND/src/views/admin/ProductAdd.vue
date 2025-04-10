<template>
    <div class="page">
        <h4>Thêm sản phẩm</h4>
        <ProductForm :product="{}" :categories="categories" @submit:product="addProduct" />
    </div>
</template>
 
<script>
import CategoryService from "@/services/category.service";
import ProductForm from "@/components/admin/ProductForm.vue";
import ProductService from "@/services/product.service";
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router"

export default defineComponent({
    components: {
        ProductForm,
    },
    setup(props, context) {
        const router = useRouter();
        const categories = ref([]);
        const onFileChange = (event) => {
            const formData = new FormData();
            formData.append("image", event.target.files[0]);
            product.value.imageimage = formData;
        };

        const addProduct = async (data) => {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("price", data.price);
            formData.append("quantity", data.quantity);
            formData.append("category_id", data.category_id);
            formData.append("image", data.image, data.image.name);
            try {
                await ProductService.create(formData);
                router.push({ name: "admin.product.all" });
            } catch (error) {
                console.log(error);
            }
        };
        onMounted(async () => {
            categories.value = await CategoryService.all();
        });
        return {
            categories,
            addProduct,
            onFileChange,
        };
    },
});

</script>