<template>
    <div class="page">
        <h4>Thêm loại hiệu sản phẩm</h4>
        <CategoryForm :category="{}" @submit:category="addCategory" />
    </div>
    <div class="p-5 m-5"></div>
    <div class="p-5"></div>
</template>

<script>
import CategoryForm from "@/components/admin/CategoryForm.vue";
import CategoryService from "@/services/category.service";
import { defineComponent, ref } from "vue"
import { useRouter } from "vue-router"

export default defineComponent({
    components: {
        CategoryForm,
    },
    setup(props, context) {
        const router = useRouter();
        const addCategory = async (data) => {
            try {
                await CategoryService.create(data);
                router.push({ name: "admin.category.all" });
            } catch (error) {
                console.log(error);
            }
        }
        return {
            addCategory,
        }
    },
});
</script>