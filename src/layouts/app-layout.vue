<script lang="ts" setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <component :is="route.meta.layoutComponent"> <slot></slot> </component>
</template>
