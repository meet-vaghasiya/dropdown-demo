<template>
  <h1 class="text-center font-bold text-3xl py-10">
    Dropdown Component Examples
  </h1>
  <div class="p-20  mx-auto  grid grid-cols-4  gap-20">
    <div >
      <h2 class="text-lg font-semibold mb-2">Single Select Example</h2>
      <CustomDropdown v-model="singleValues" :items="languageOptions" />
      <pre class="language-json"><code>{{ singleValues  }}</code></pre>
    </div>
    <div >
      <h2 class="text-lg font-semibold  mb-2">Multi-Select Example</h2>
      <CustomDropdown
        v-model="multipleValues"
        :items="languageOptions"
        multiSelect
      />
      <pre class="language-json"><code>{{ multipleValues  }}</code></pre>
    </div>
    <div >
      <h2 class="text-lg font-semibold mb-2">Single Select With Initial Value</h2>
      <CustomDropdown v-model="singleValuesInitialValue" :items="languageOptions" />
      <pre class="language-json"><code>{{ singleValuesInitialValue  }}</code></pre>
    </div>
    <div >
      <h2 class="text-lg font-semibold  mb-2">Multi-Select With Initial Value</h2>
      <CustomDropdown
        v-model="multipleValuesInitialValues"
        :items="languageOptions"
        multiSelect
      />
      <pre class="language-json"><code>{{ multipleValuesInitialValues  }}</code></pre>
    </div>
  </div>
</template>

<script setup>
import CustomDropdown from "@/components/common/CustomDropdown.vue";
import { ref } from "vue";

const singleValues = ref({});
const multipleValues = ref([]);
const singleValuesInitialValue = ref({ title: "Gujarati", value: "gu" });
const multipleValuesInitialValues = ref([ { title: "Spanish", value: "es" },
  { title: "Hindi", value: "hi" },]);

const languageOptions = [
  { title: "English", value: "en" },
  { title: "Spanish", value: "es" },
  { title: "Hindi", value: "hi" },
  { title: "Gujarati", value: "gu" },
];
</script>
