<template>
    <!-- Carousel Start -->
    <div class="container-fluid p-0 mb-5 pb-5">
        <div id="header-carousel" class="carousel slide carousel-fade" data-bs-touch="false" data-bs-interval="false">
            <div class="carousel-inner">
                <div class="carousel-item active" data-bs-interval="5000">
                    <img class="w-100" src="/src/assets/img/taynghe.jpg" alt="Image">
                    <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                        <div class="p-3" style="max-width: 900px; min-height: 560px;">
                        </div>
                    </div>
                </div>
                <div class="carousel-item" data-bs-interval="5000">
                    <img class="w-100" src="/src/assets/img/chuot.jpg" alt="Image">
                    <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                        <div class="p-3" style="max-width: 900px; min-height: 560px;">
                        </div>
                    </div>
                </div>
                <div class="carousel-item" data-bs-interval="5000">
                    <img class="w-100" src="/src/assets/img/banphim.jpg" alt="Image">
                    <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                        <div class="p-3" style="max-width: 900px; min-height: 560px !important;">
                        </div>
                    </div>
                </div>
            </div>
            <a class="carousel-control-prev" href="#header-carousel" data-slide="prev">
                <div class="btn btn-secondary px-0" style="width: 45px; height: 45px;">
                    <span class="carousel-control-prev-icon mb-n1"></span>
                </div>
            </a>
            <a class="carousel-control-next" href="#header-carousel" data-slide="next">
                <div class="btn btn-secondary px-0" style="width: 45px; height: 45px;">
                    <span class="carousel-control-next-icon mb-n1"></span>
                </div>
            </a>
        </div>
    </div>
    <!-- Carousel End -->

    <!-- About Start -->
    <div class="container-fluid py-2">
        <div class="container py-2">
            <div class="row justify-content-center">
                <div class="col-lg-7">
                    <h1 class="section-title position-relative text-center mb-5">Đồ điện tử đỉnh cao,  chất lượng vượt trội!</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4 py-5">
                    <h3 class="font-weight-bold mb-3">About us</h3>
                    <h5 class="text-muted mb-3">Chào mừng bạn đến với SHTStore, nơi Công nghệ Đỉnh cao & Chất lượng vượt trội</h5>
                    <p>Chúng tôi tự hào mang đến những sản phẩm điện tử tiên tiến, kết hợp hoàn hảo giữa thiết kế hiện đại và chất lượng vượt trội. SHTStore là điểm đến lý tưởng cho những ai đam mê công nghệ và luôn tìm kiếm các thiết bị điện tử tiên tiến. Mỗi sản phẩm tại SHTStore không chỉ đáp ứng nhu cầu công nghệ mà còn đảm bảo độ bền và hiệu suất tối ưu, mang đến trải nghiệm tuyệt vời cho người sử dụng trong mọi lĩnh vực từ công việc đến giải trí.</p>
                    <a href="" class="btn btn-secondary mt-2">Tìm hiểu thêm</a>
                </div>
                <div class="col-lg-4" style="min-height: 400px;">
                    <div class="position-relative h-100 rounded overflow-hidden">
                        <img class="position-absolute w-100 h-100" src="/src/assets/img/product/img1.png
                        "
                            style="object-fit: cover;">
                    </div>
                </div>
                <div class="col-lg-4 py-5">
                    <h3 class="font-weight-bold mb-3">Đặc trưng</h3>
                    <p>Tại SHTStore, các sản phẩm điện tử của chúng tôi được thiết kế không chỉ để nâng tầm trải nghiệm công nghệ của bạn mà còn mang lại hiệu suất tối ưu và sự tiện lợi trong mọi công việc và giải trí. Với sự chú ý tỉ mỉ đến từng chi tiết và công nghệ tiên tiến, sản phẩm của chúng tôi mang đến một số tính năng và ưu điểm chính:</p>
                    <h5 class="text-muted mb-3"><i class="fa fa-check text-secondary me-3"></i>Công nghệ tiên tiến</h5>
                    <h5 class="text-muted mb-3"><i class="fa fa-check text-secondary me-3"></i>Chất lượng vượt trội</h5>
                    <h5 class="text-muted mb-3"><i class="fa fa-check text-secondary me-3"></i>Tiện lợi và hiệu suất cao</h5>
                    <h5 class="text-muted mb-3"><i class="fa fa-check text-secondary me-3"></i>Hài lòng khách hàng</h5>
                    <a href="" class="btn btn-primary mt-2">Tìm hiểu thêm</a>
                </div>
            </div>
        </div>
    </div>
    <!-- About End -->

    <!-- Services Start -->
    <div class="container-fluid py-5">
        <div class="container py-5">
            <div class="row">
                <div class="col-lg-6">
                    <h2 class="section-title position-relative mb-5">Những sản phẩm nổi bật</h2>
                </div>
                <div class="col-lg-6 mb-5 mb-lg-0 pb-5 pb-lg-0"></div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="owl-carousel row">
                        <div class="service-item col-3">
                            <div class="service-img mx-auto">
                                <img class="rounded-circle w-100 h-100 bg-light p-3" src="/src/assets/img/product/banphim.jpg"
                                    style="object-fit: cover;">
                            </div>
                            <div class="position-relative text-center bg-light rounded p-4 pb-5" style="margin-top: -75px; min-height: 290px;">
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
                            <div class="position-relative text-center bg-light rounded p-4 pb-5" style="margin-top: -75px; min-height: 290px;">
                                <h5 class="font-weight-semi-bold mt-5 mb-3 pt-5">Chuột</h5>
                                <p>Sự thanh lịch và cá tính.</p>
                                <a href="product" class="border-bottom border-secondary text-decoration-none text-secondary">Tìm hiểu thêm</a>
                            </div>
                        </div>
                        <div class="service-item col-3">
                            <div class="service-img mx-auto">
                                <img class="rounded-circle w-100 h-100 bg-light p-3" src="/src/assets/img/product/loa.jpg"
                                    style="object-fit: cover; ;">
                            </div>
                            <div class="position-relative text-center bg-light rounded p-4 pb-5" style="margin-top: -75px; min-height: 290px;">
                                <h5 class="font-weight-semi-bold mt-5 mb-3 pt-5">Loa</h5>
                                <p>Âm thanh sống động.</p>
                                <a href="product" class="border-bottom border-secondary text-decoration-none text-secondary">Tìm hiểu thêm</a>
                            </div>
                        </div>
                        <div class="service-item col-3">
                            <div class="service-img mx-auto">
                                <img class="rounded-circle w-100 h-100 bg-light p-3" src="/src/assets/img/product/dongho.jpg"
                                    style="object-fit: cover; ;">
                            </div>
                            <div class="position-relative text-center bg-light rounded p-4 pb-5" style="margin-top: -75px; min-height: 290px;">
                                <h5 class="font-weight-semi-bold mt-5 mb-3 pt-5">Đồng Hồ</h5>
                                <p>Nhỏ gọn chính xác.</p>
                                <a href="product" class="border-bottom border-secondary text-decoration-none text-secondary">Tìm hiểu thêm</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
export default {
  mounted() {
    document.title = 'Trang chủ';
  }
}
</script>
<!-- <style>
.carousel {
    position: relative;
}

.carousel.pointer-event {
    touch-action: pan-y;
}

.carousel-inner {
    position: relative;
    width: 100%;
    overflow: hidden;
}

.carousel-inner::after {
    display: flex;
    clear: both;
    content: "";
}

.carousel-item {
    position: relative;
    display: none;
    float: left;
    width: 100%;
    margin-right: -100%;
    backface-visibility: hidden;
    transition: opacity ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
    .carousel-item {
        transition: none;
    }
}

.carousel-item.active,
.carousel-item-next,
.carousel-item-prev {
    display: block;
}

.carousel-item-next:not(.carousel-item-left),
.active.carousel-item-right {
    transform: translateX(100%);
}

.carousel-item-prev:not(.carousel-item-right),
.active.carousel-item-left {
    transform: translateX(-100%);
}

.carousel-fade .carousel-item {
    opacity: 0;
    transition-property: opacity;
    transform: none;
}

.carousel-fade .carousel-item.active,
.carousel-fade .carousel-item-next.carousel-item-left,
.carousel-fade .carousel-item-prev.carousel-item-right {
    z-index: 1;
    opacity: 1;
}

.carousel-fade .active.carousel-item-left,
.carousel-fade .active.carousel-item-right {
    z-index: 0;
    opacity: 0;
    transition: opacity 0s 0.6s;
}

@media (prefers-reduced-motion: reduce) {

    .carousel-fade .active.carousel-item-left,
    .carousel-fade .active.carousel-item-right {
        transition: none;
    }
}

.carousel-control-prev,
.carousel-control-next {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15%;
    color: #fff;
    text-align: center;
    opacity: 0.5;
    transition: opacity 0.15s ease;
}

@media (prefers-reduced-motion: reduce) {

    .carousel-control-prev,
    .carousel-control-next {
        transition: none;
    }
}

.carousel-control-prev:hover,
.carousel-control-prev:focus,
.carousel-control-next:hover,
.carousel-control-next:focus {
    color: #fff;
    text-decoration: none;
    outline: 0;
    opacity: 0.9;
}

.carousel-control-prev {
    left: 0;
}

.carousel-control-next {
    right: 0;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
    display: inline-block;
    width: 20px;
    /* height: 20px; */
    background: no-repeat 50% / 100% 100%;
}

.carousel-control-prev-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath d='M5.25 0l-4 4 4 4 1.5-1.5L4.25 4l2.5-2.5L5.25 0z'/%3e%3c/svg%3e");
}

.carousel-control-next-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath d='M2.75 0l-1.5 1.5L3.75 4l-2.5 2.5L2.75 8l4-4-4-4z'/%3e%3c/svg%3e");
}</style> -->