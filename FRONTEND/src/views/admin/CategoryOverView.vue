<template>
    <div>
        <CategoryList :categories="categories" @rerender:categories="retrieveCategories"></CategoryList>
        <div v-if="!categories.length">Không có Thương hiệu.</div>
    </div>
</template>

<script>
import CategoryList from "@/components/admin/CategoryList.vue";
import CategoryService from "@/services/category.service";
import { defineComponent, ref } from 'vue';

export default defineComponent({
    components: {
        CategoryList,
    },
    setup(props, context) {
        const categories = ref([]);
        const activeIndex = ref(-1);
        const retrieveCategories = async () => {
            try {
                categories.value = await CategoryService.all();
            } catch (error) {
                console.log(error);
            }
        };
        retrieveCategories();
        return {
            categories,
            activeIndex,
            retrieveCategories,
        };
    },
});
</script>