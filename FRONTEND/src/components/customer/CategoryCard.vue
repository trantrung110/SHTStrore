<template>
    <div class="card bg-secondary mb-3">
        <div class="card-header text-white fw-bold"><i class="fa fa-list"></i> DANH MỤC </div>
        <ul class="list-group category_block">
            <li class="list-group-item" v-for="(category, index) in categories" :key="category._id"
                @click="setSelected(category)"
                :class="{ active: selectedCategory && category._id === selectedCategory._id }">{{
                    category.name
                }}</li>
        </ul>
    </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';

export default defineComponent({

    props: {
        categories: { type: Object, required: true },
        selectedCategory: { type: Object }
    },

    emits: ["filter:category"],

    setup(props, context) {
        const setSelected = (category) => {
            context.emit("filter:category", category);
        }
        return {
            setSelected,
        }
    }
});
</script>

<style>
.card-header {
    padding: 0.5rem 1rem;
    margin-bottom: 0;
    background-color: rgba(0, 0, 0, .03);
    border-bottom: none;
}

.list-group {
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
    border-radius: 0;
}

.list-group-item.active {
    z-index: 2;
    color: #fff;
    background-color: #fe6601;
    border-color: #ce5d11;
}

.list-group-item.active::before {
    content: '';
    background-image: url('src/assets/img/hover-teddy.png');
    background-size: 16px 16px;
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 8px;
}

</style>