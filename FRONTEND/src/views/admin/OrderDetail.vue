<template>
    <div v-if="order" class="page">
        <OrderForm :order="order" />
    </div>
</template>

<script>
import OrderForm from "@/components/admin/OrderDetailList.vue";
import OrderService from "@/services/order.service";
import { defineComponent, onMounted, ref } from 'vue';
export default defineComponent({
    components: {
        OrderForm,
    },
    props: {
        id: { type: String, required: true },
    },
    setup(props) {
        const order = ref(null);
        const getOrder = async () => {
            console.log("id : " + props.id);
            try {
                order.value = await OrderService.get(props.id);
            } catch (error) {
                console.log(error);
            }
        }
        onMounted(async () => {
            await getOrder();
        });
        return {
            order,
            getOrder,
        }
    },
});
</script>