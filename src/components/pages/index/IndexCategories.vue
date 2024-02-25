<template>
    <transition-group
        :class="$style.IndexCategories"
        tag="div"
        name="fade-up"
    >
        <!-- Category cards grid -->
        <IndexCategoryGrid
            v-show="!category"
            key="category"
            :cards="categories"
            @change="onCategorySelect"
        >
            <template #title>
                Выберите интересующую вас категорию
            </template>
        </IndexCategoryGrid>

        <!-- Subcategory cards grid -->
        <IndexCategoryGrid
            v-show="category"
            key="subcategory"
            :class="$style.subcategory"
            :values="subcategoryList"
            :cards="currentSubcategories"
            @close="onCategoryReset"
            @change="onSubcategorySelect"
        >
            <template #title>
                <VIcon
                    :class="$style.arrow"
                    name="triangle"
                />
                
                <div :class="$style.label">
                    {{ categoryItem?.title }}
                </div>
            </template>
        </IndexCategoryGrid>
    </transition-group>
</template>

<script>
export default {
    name: 'IndexCategories',
};
</script>

<script setup>
import { ref, computed } from 'vue';

// UI
import VIcon from '@/components/ui/icon/VIcon.vue';

// Components
import IndexCategoryGrid from '@/components/pages/index/category/IndexCategoryGrid.vue';

// Data
const category = ref(null);
const subcategoryList = ref([]);
const categoryItem = ref(null);

// Mock
const img = imgName => `/images/index/category/${imgName}`;
const categories = ref([
    { value: 'bedroom', title: 'Спальня', description: '', image: img('bedroom.png'), color: '#fbf9f7' },
    { value: 'living-room', title: 'Гостиная', description: '', image: img('livingroom.png'), color: '#fef7ee' },
    { value: 'bathroom', title: 'Ванная', description: '', image: img('bathroom.png'), color: '#f6f0ec' },
    { value: 'dining-room', title: 'Столовая', description: '', image: img('diningroom.png'), color: '#fef7ee' },
    { value: 'gift', title: 'Подарочная упаковка', description: '', image: img('gift.png'), color: '#fef7ee' },
    { value: 'children-room', title: 'Детская', description: '', image: img('childrenroom.png'), color: '#fbf9f7' },
    { value: 'closet', title: 'Домашняя одежда', description: '', image: img('closet.png'), color: '#fbf9f7' },
    { value: 'accessory', title: 'Аксессуары', description: '', image: img('accessory.png'), color: '#f6f0ec' },
]);

const subcategories = ref([
    { value: 'bed-sheet', category: 'bedroom', title: 'Постельное белье', image: '/images/index/gojo-laugh.jpg' },
    { value: 'bedspreads', category: 'bedroom', title: 'Покрывала', image: '/images/index/nanami-coffee.png' },
]);

// Computed
const currentSubcategories = computed(() => {
    if (!category.value) {
        return [];
    }

    return subcategories.value.filter(subcategory => subcategory.category === category.value);
});

// Methods
function onCategorySelect(newCategory) {
    if (!newCategory?.value) {
        return;
    }

    category.value = newCategory.value;
    categoryItem.value = { ...newCategory };
}

function onCategoryReset() {
    category.value = null;

    setTimeout(() => {
        categoryItem.value = null;
    }, 400);
}

function onSubcategorySelect(subcategory) {
    const updatedSubcategories = Array.from(subcategoryList.value);

    const index = updatedSubcategories.findIndex(value => value === subcategory?.value);

    if (index < 0) {
        updatedSubcategories.push(subcategory.value);
    } else {
        updatedSubcategories.splice(index, 1);
    }

    subcategoryList.value = updatedSubcategories;
}
</script>

<style lang="scss" module>
    .IndexCategories {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        height: 78rem;
        padding: 8rem 0;
        transition: $default-transition;
    
        & > * {
            grid-column: 1 / 2;
            grid-row: 1 / 2;
        }
    }

    .subcategory {
        :global(.index-category-grid-title) {
            cursor: pointer;
            transition: opacity $default-transition;

            &:hover {
                .arrow {
                    transform: translateX(-.4rem) rotate(180deg);
                }
            }

            &:active {
                opacity: .7;
            }
        }
    }

    .arrow {
        transform: rotate(180deg);
        transition: transform $default-transition;
    }

    .label {
        margin-left: .8rem;
        user-select: none;
    }
</style>
