import { defineStore } from 'pinia';
import { RewardShopCart, RewardShop } from '@/types/models';
import { ref, computed } from 'vue';
export const useRewardShopCartStore = defineStore('rewardShopCartStore', () => {
    const cartItems = ref<RewardShopCart[]>([]);
    const findIndexBy = (id: number) => {
        return cartItems.value.findIndex(t => t.item.id == id);
    }
    const addCart = (p: RewardShop) => {
        if (!p || !p.id) {
            return;
        }
        const existIndex = findIndexBy(p.id);
        if (existIndex >= 0) {
            const existItem = cartItems.value[existIndex];
            if (existItem) {
                cartItems.value[existIndex] = {
                    item: existItem.item,
                    quantity: existItem.quantity + 1,
                    selected: false
                }
            }

        } else {
            cartItems.value.push({
                item: p,
                quantity: 1,
                selected: false
            })
        }
    };
    const removeCart = (index: number) => {
        cartItems.value.splice(index, 1)
    }
    const clearCart = () => {
        cartItems.value = [];
    }

    const totalCarts = computed(() => cartItems.value.length)
    const selectedRewardItems = computed(() => cartItems.value.filter((t) => t.selected));
    const totalPrizeCal = computed(() => {
        let total = 0;
        selectedRewardItems.value.forEach((element) => {
            total += element.item.prizePerUnit * element.quantity;
        });
        return total;
    });
    const totalItems = computed(() => {
        let total = 0;
        selectedRewardItems.value.forEach((element) => {
            total += element.quantity;
        });
        return total;
    });
    return {
        cartItems,
        addCart,
        removeCart,
        totalCarts,
        selectedRewardItems,
        totalPrizeCal,
        clearCart,
        totalItems
    };
});
