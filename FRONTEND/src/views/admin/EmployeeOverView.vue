<template>
    <div>
        <EmployeeList :admins="admins" @rerender:admins="retrieveAdmins"></EmployeeList>
        <div v-if="!admins.length">Không có nhân viên.</div>
    </div>
</template>

<script>
import EmployeeList from "@/components/admin/EmployeeList.vue";
import AdminService from "@/services/admin.service";
import { defineComponent, ref } from 'vue';

export default defineComponent({
    components: {
    EmployeeList
},
    setup(props, context) {
        const admins = ref([]);
        const activeIndex = ref(-1);
        const retrieveAdmins = async () => {
            try {
                admins.value = await AdminService.findAll();
            } catch (error) {
                console.log(error);
            }
        };
        retrieveAdmins();
        return {
            admins,
            activeIndex,
            retrieveAdmins,
        };
    },
});
</script>