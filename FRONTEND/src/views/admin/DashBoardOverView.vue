<template>
    <!-- Content Row -->
    <div class="row">

        <!-- Earnings (Monthly) Card Example -->
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                TỔNG DOANH THU</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ formatPrice(totalOrderValue) }}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fa-solid fa-sack-dollar fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Earnings (Monthly) Card Example -->
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                Doanh thu tháng {{ current }}</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ formatPrice(totalOrdersThisMonth) }}
                            </div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Pending Requests Card Example -->
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-warning shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                Đơn hàng mới</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ ordersCount }}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fa-solid fa-boxes-packing fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Earnings (Monthly) Card Example -->
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-info shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Số lượng sản phẩm
                            </div>
                            <div class="row no-gutters align-items-center">
                                <div class="col-auto">
                                    <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">{{ totalProducts }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Content Row -->
    <!-- Area Chart -->
    <div class="col-xl-12 col-lg-12">
        <div class="card shadow mb-4">
            <!-- Card Header - Dropdown -->
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Earnings Overview</h6>
                <div class="dropdown no-arrow">
                    <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                        aria-labelledby="dropdownMenuLink">
                        <div class="dropdown-header">Dropdown Header:</div>
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                </div>
            </div>
            <!-- Card Body -->
            <div class="card-body">
                <div class="chart-area">
                    <LineChart :chartData="monthlyChartData" :options="chartOptions" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import OrderService from "@/services/order.service";
import ProductService from "@/services/product.service";
import LineChart from "@/components/admin/LineChart.vue";
import { defineComponent, ref, computed, watchEffect, onMounted } from 'vue';
import moment from 'moment';

export default defineComponent({
    components: {
        LineChart,
    },
    setup(props, context) {
        const products = ref([]);
        const retrieveProducts = async () => {
            try {
                products.value = await ProductService.all();
            } catch (error) {
                console.log(error);
            }
        };
        retrieveProducts();
        const totalProducts = computed(() => {
            const uniqueProductIds = new Set(products.value.map(product => product._id));
            return uniqueProductIds.size;
        });

        const orders = ref([]);
        const retrieveOrders = async () => {
            try {
                orders.value = await OrderService.all();
            } catch (error) {
                console.log(error);
            }
        };
        const totalOrderValue = computed(() => {
            return orders.value
                .filter(order => order.status === 4)
                .reduce((total, order) => total + order.total, 0);
        });
        const current = moment().month() + 1;
        const totalOrdersThisMonth = computed(() => {
            const currentMonth = moment().month();
            const filteredOrders = orders.value.filter(
                (order) =>
                    order.status === 4 &&
                    moment(order.created_at, "hh:mm:ss A, DD/MM/YYYY").month() === currentMonth
            );
            return filteredOrders.reduce((total, order) => total + order.total, 0);
        });
        const ordersCount = computed(() => {
            return orders.value.filter(order => order.status === 0).length;
        });
        const formatPrice = (price) => {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
        };
        retrieveOrders();
        const totalMonth = async (targetMonth) => {
            try {
                const orders = await OrderService.all();
                const filteredOrders = [];

                for (let i = 0; i < orders.length; i++) {
                    const order = orders[i];
                    const orderMonth = moment(order.created_at, "hh:mm:ss A, DD/MM/YYYY").month() + 1;

                    if (order.status === 4 && orderMonth === targetMonth) {
                        filteredOrders.push(order);
                    }
                }
                const total = filteredOrders.reduce((acc, order) => acc + order.total, 0);
                return total;

            } catch (error) {
                console.log(error);
                return 0;
            }
        };

        const labels = [];

        for (let i = current - 4; i <= current; i++) {
            if (i <= 0) {
                labels.push(`Tháng ${i + 12}`);
            } else if (i > 12) {
                labels.push(`Tháng ${i - 12}`);
            } else {
                labels.push(`Tháng ${i}`);
            }
        }

        const monthlyChartData = ref({
            labels: labels,
            datasets: [
                {
                    label: 'Doanh thu hàng tháng',
                    backgroundColor: '#4e73df',
                    borderColor: '#4e73df',
                    fill: false,
                    data: [45000, 70000, 0, 117000, 150000],
                },
            ],
        });
        const chartOptions = ref({
            responsive: true,
            maintainAspectRatio: false,
        });
        async function updateChartData() {
            try {
                const values = await Promise.all([
                    totalMonth(current - 4),
                    totalMonth(current - 3),
                    totalMonth(current - 2),
                    totalMonth(current - 1),
                    totalMonth(current)
                ]);
                monthlyChartData.value.datasets[0].data = [...values];
                console.log(values);
            } catch (error) {
                console.error('Error updating chart data:', error);
            }
        }
        watchEffect(() => {
            updateChartData();
        });

        // const retrieveMonthlyChartData = async () => {
        //     try {
        //         const ordersData = await OrderService.all();
        //         calculateAndSetMonthlyRevenueData(ordersData);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // };

        // const calculateAndSetMonthlyRevenueData = (orders) => {
        //     const monthlyRevenue = {};
        //     orders.forEach((order) => {
        //         const orderMonth = moment(order.created_at, 'MM/DD/YYYY, h:mm:ss A').format('YYYY-MM');
        //         if (!monthlyRevenue[orderMonth]) {
        //             monthlyRevenue[orderMonth] = 0;
        //         }
        //         monthlyRevenue[orderMonth] += order.total;
        //     });

        //     const last6Months = Array.from({ length: 6 }, (_, i) => moment().subtract(i, 'months').format('YYYY-MM'));
        //     console.log(last6Months);
        //     console.log(monthlyRevenue);
        //     monthlyChartData.labels = last6Months.reverse();
        //     monthlyChartData.value.datasets[0].data = last6Months.map((month) => monthlyRevenue[month] || 0);

        // };
        // retrieveMonthlyChartData();
        onMounted(() => {
            updateChartData();
        });

        return {
            orders,
            products,
            current,
            retrieveOrders,
            formatPrice,
            totalOrderValue,
            ordersCount,
            totalProducts,
            totalOrdersThisMonth,
            monthlyChartData,
            chartOptions
        };
    },
});
</script>

<style scoped>
.admin-welcome {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.admin-welcome img {
    margin-top: 30px;
    max-width: 100%;
    height: auto;
}

.admin-welcome {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
}

.admin-welcome h1 {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 20px;
}

.admin-welcome p {
    font-size: 18px;
    margin-bottom: 10px;
    line-height: 1.5;
}

.admin-welcome-image {
    margin-top: 40px;
}

.admin-welcome-image img {
    width: 100%;
    max-height: 500px;
    object-fit: cover;
}
</style>