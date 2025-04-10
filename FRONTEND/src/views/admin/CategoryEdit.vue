<template>
    <div v-if="category" class="page">
        <h4>Hiệu chỉnh Thương hiệu sản phẩm</h4>
        <CategoryForm :category="category" @submit:category="updateCategory" @delete:category="deleteCategory" />
    </div>
    <div class="p-5 m-5"></div>
    <div class="p-5"></div>
</template>

<script>
import CategoryForm from "@/components/admin/CategoryForm.vue";
import CategoryService from "@/services/category.service";
import { useRouter } from "vue-router"
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
    components: {
        CategoryForm,
    },
    props: {
        id: { type: String, required: true },
    },
    setup(props, context) {
        const category = ref(null);
        const router = useRouter();
        const getCategory = async () => {
            try {
                category.value = await CategoryService.get(props.id);
            } catch (error) {
                console.log(error);
            }
        }
        const updateCategory = async (data) => {
            try {
                await CategoryService.update(category.value._id, data); 
                router.push({ name: "admin.category.all" });
            } catch (error) {
                console.log(error);
            }
        }
        const deleteCategory = async () => {
            if (confirm("Bạn muốn xóa Thương hiệu này?")) {
                try {
                    await CategoryService.delete(category.value._id);
                    router.push({ name: "admin.category.all" });
                } catch (error) {
                    console.log(error);
                }
            }
        }
        onMounted(async () => {
            await getCategory();
        });
        return {
            category,
            getCategory,
            updateCategory,
            deleteCategory,
        }
    },
});
</script>
