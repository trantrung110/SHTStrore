<template>
    <div>
        <ProductList :products="products" @rerender:products="retrieveProducts" />
        <div v-if="!products.length">Không có sản phẩm.</div>
    </div>
</template>
  
<script>
import ProductList from "@/components/admin/ProductList.vue";
import ProductService from "@/services/product.service";
import { defineComponent, ref } from 'vue'; 

export default defineComponent({
    components: {
        ProductList,
    },
    setup() {
        const products = ref([]);
        const activeIndex = ref(-1);

        const retrieveProducts = async () => {
            try {
                products.value = await ProductService.all();
            } catch (error) {
                console.log(error);
            }
        };
        retrieveProducts();
        return {
            products,
            activeIndex,
            retrieveProducts,
        };
    },
});
</script>