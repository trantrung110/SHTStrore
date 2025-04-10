<template>
    <!-- Services Start -->
    <div class="container-fluid py-5">
        <div class="container py-5">
            <div class="row">
                <div class="col-12">
                    <div class="owl-carousel row">
                        <div class="service-item col-3">
                            <div class="service-img mx-auto">
                                <img class="rounded-circle w-100 h-100 bg-light p-3" src="/src/assets/img/product/banphim.jpg"
                                    style="object-fit: cover;">
                            </div>
                            <div class="position-relative text-center bg-light rounded p-4 pb-5" style="margin-top: -75px;">
                                <h5 class="font-weight-semi-bold mt-5 mb-3 pt-5">Bàn Phím</h5>
                                <p>Phong cách độc đáo và thoải mái.</p>
                                <a href="product" class="border-bottom border-secondary text-decoration-none text-secondary">Tìm hiểu thêm</a>
                            </div>
                        </div>
                        <div class="service-item col-3">
                            <div class="service-img mx-auto">
                                <img class="rounded-circle w-100 h-100 bg-light p-3" src="/src/assets/img/product/chuot.jpg"
                                    style="object-fit: cover;">
                            </div>
                            <div class="position-relative text-center bg-light rounded p-4 pb-5" style="margin-top: -75px;">
                                <h5 class="font-weight-semi-bold mt-5 mb-3 pt-5">Chuột</h5>
                                <p>Tính năng đa dạng, cảm biến chính xác.</p>
                                <a href="product" class="border-bottom border-secondary text-decoration-none text-secondary">Tìm hiểu thêm</a>
                            </div>
                        </div>
                        <div class="service-item col-3">
                            <div class="service-img mx-auto">
                                <img class="rounded-circle w-100 h-100 bg-light p-3" src="/src/assets/img/product/dongho.jpg"
                                    style="object-fit: cover;">
                            </div>
                            <div class="position-relative text-center bg-light rounded p-4 pb-5" style="margin-top: -75px;">
                                <h5 class="font-weight-semi-bold mt-5 mb-3 pt-5">Đồng Hồ</h5>
                                <p>Nhỏ gọn và chính xác.</p>
                                <a href="product" class="border-bottom border-secondary text-decoration-none text-secondary">Tìm hiểu thêm</a>
                            </div>
                        </div>
                        <div class="service-item col-3">
                            <div class="service-img mx-auto">
                                <img class="rounded-circle w-100 h-100 bg-light p-3" src="/src/assets/img/product/loa.jpg"
                                    style="object-fit: cover;">
                            </div>
                            <div class="position-relative text-center bg-light rounded p-4 pb-5" style="margin-top: -75px;">
                                <h5 class="font-weight-semi-bold mt-5 mb-3 pt-5">Loa</h5>
                                <p>Âm thanh chân thực.</p>
                                <a href="product" class="border-bottom border-secondary text-decoration-none text-secondary">Tìm hiểu thêm</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Services End -->

    <section>
        <div class="container pb-5">
            <div class="row justify-content-center">
                <div class="col-xxl-10">
                    <div class="card card-span shadow-warning" style="border-radius: 35px;">
                        <div class="card-body py-5">
                            <div class="row justify-content-evenly">
                                <div class="col-md-3">
                                    <div
                                        class="d-flex d-md-block d-xl-flex justify-content-evenly justify-content-lg-between">
                                        <img src="/src/assets/img/gallery/discounts.png" width="100" alt="..." />
                                        <div class="d-flex d-lg-block d-xl-flex flex-center">
                                            <h2 class="fw-bolder text-1000 mb-0 text-gradient">Daily<br
                                                    class="d-none d-md-block" />Discounts </h2>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3 hr-vertical">
                                    <div
                                        class="d-flex d-md-block d-xl-flex justify-content-evenly justify-content-lg-between">
                                        <img src="/src/assets/img/gallery/live-tracking.png" width="100" alt="..." />
                                        <div class="d-flex d-lg-block d-xl-flex flex-center">
                                            <h2 class="fw-bolder text-1000 mb-0 text-gradient">Live Tracking</h2>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3 hr-vertical">
                                    <div
                                        class="d-flex d-md-block d-xl-flex justify-content-evenly justify-content-lg-between">
                                        <img src="/src/assets/img/gallery/quick-delivery.png" width="100" alt="..." />
                                        <div class="d-flex d-lg-block d-xl-flex flex-center">
                                            <h2 class="fw-bolder text-1000 mb-0 text-gradient">Quick Delivery </h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
  mounted() {
    document.title = 'Giới thiệu';
  }
}
</script>
<style>
.shadow-warning {
    -webkit-box-shadow: 0 0 3rem 0 rgba(14, 110, 255, 0.3) !important;
    box-shadow: 0 0 3rem 0 rgba(14, 50, 255, 0.3) !important;
}

.hr-vertical {
    border-left: 2px solid #CFCFCF;
}

.text-gradient {
    background: -o-linear-gradient(-40deg, #0047fb, #00ccff);
    background: linear-gradient(-50deg, #0019fb, #00ddff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
</style>