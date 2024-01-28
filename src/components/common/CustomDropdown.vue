<!-- CustomDropdown.vue -->
<template>
  <div class="relative"  ref="dropdownRef">
    <div class="flex flex-wrap">
      <div
        @click="toggleDropdown"
        class="bg-white text-gray-800 w-full px-4 py-2 rounded focus:outline-none border border-gray-300 cursor-pointer"
      >
        <div v-if="props.multiSelect" class="flex gap-1 items-center flex-wrap">
          <template v-if="selectedItems.length">
            <span
              v-for="(item, index) in selectedItems"
              :key="index"
              @click.stop
              class="bg-slate-500 text-white text-sm px-2 py-1 rounded-full flex items-center space-x-1 cursor-pointer"
            >
              {{ item[props.label] }}
              <button @click="removeTag(index)" class="ml-1 text-white font-bold">
                &times;
              </button>
            </span>
          </template>
          <div v-else>Select Multiple</div>
        </div>
        <span v-else>{{ props.modelValue[props.label] || "Select" }} </span>
      </div>
      <svg
        class="w-4  h-4 absolute transition-transform right-2 top-1/2 transform -translate-y-1/2"
        :class="[isDropdownOpen ? 'rotate-0' : 'rotate-180']"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 15l7-7 7 7"
        ></path>
      </svg>
    </div>

    <transition name="fade">
      <div
        v-if="isDropdownOpen"
        class="absolute z-10 w-full mt-2 rounded-md bg-white shadow-md border border-gray-200"
      >
        <ul class="py-1">
          <li
            v-for="(item, index) in props.items"
            :key="index"
            @click="selectItem(item)"
            class="text-gray-700 cursor-pointer px-4 py-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            :class="{ 'bg-green-100' : selectedValues.includes(item.value)  }"
          >
            <input
              v-if="props.multiSelect"
              type="checkbox"
              :id="`checkbox-${index}`"
              :checked="selectedValues.includes(item.value)"
              class="mr-2 form-checkbox focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
            />
            {{ item.title || item.value }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed } from "vue";
import useClickOutside from '@/composables/useClickOutside'
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  multiSelect: {
    type: Boolean,
    default: false,
    required: false,
  },
  modelValue: {
    type: [String, Array, Object],
  },
  label: {
    type: String,
    default: "title",
  },
  
});
const emits = defineEmits(["update:modelValue"]);

const dropdownRef = ref(null);
const isDropdownOpen = ref(false);
useClickOutside(dropdownRef, () => isDropdownOpen.value = false)
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};


const selectedItems = ref(props.modelValue);
const selectedValues = computed(() => props.multiSelect ? selectedItems.value.map((item) => item.value) : [selectedItems.value.value])

const selectItem = (item) => {
  if (props.multiSelect) {
    selectedItems.value = selectedValues.value.includes(item.value)
      ? selectedItems.value.filter(selected => selected.value !== item.value)
      : [...selectedItems.value, item];
    
  } else {
    selectedItems.value = item;
    isDropdownOpen.value = false;
  }

  emits("update:modelValue", selectedItems.value);
};

const removeTag = (index) => {
  selectedItems.value.splice(index, 1);
  emits("update:modelValue", selectedItems.value);
};

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
