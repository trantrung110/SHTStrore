import { defineStore } from "pinia";
import CustomerService from "@/services/customer.service";
import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useCartWatcher() {
  const cart = ref(JSON.parse(localStorage.getItem('user') || '[]'));

  const updateCart = () => {
    const cartData = JSON.parse(localStorage.getItem('user') || '[]');
    cart.value = cartData;
  };

  onMounted(() => {
    updateCart();
    // Cập nhật giá trị cart 
    const intervalId = setInterval(updateCart, 500);

    // Ngừng cập nhật khi component bị hủy
    onBeforeUnmount(() => {
      clearInterval(intervalId);
    });
  });

  return cart;
}

