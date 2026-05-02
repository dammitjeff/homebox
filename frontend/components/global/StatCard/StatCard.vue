<template>
  <NuxtLink v-if="to" :to="to" class="block">
    <Card class="flex flex-col items-center bg-secondary p-3 text-secondary-foreground shadow transition-opacity hover:opacity-80">
      <CardHeader class="p-0">
        <CardTitle class="text-sm font-medium">{{ title }}</CardTitle>
      </CardHeader>
      <CardContent class="p-0 text-2xl font-bold" :class="valueClass">
        <Currency v-if="type === 'currency'" :amount="value" />
        <template v-if="type === 'number'">{{ value }}</template>
      </CardContent>
      <CardFooter v-if="subtitle">{{ subtitle }}</CardFooter>
    </Card>
  </NuxtLink>
  <Card v-else class="flex flex-col items-center bg-secondary p-3 text-secondary-foreground shadow">
    <CardHeader class="p-0">
      <CardTitle class="text-sm font-medium">{{ title }}</CardTitle>
    </CardHeader>
    <CardContent class="p-0 text-2xl font-bold" :class="valueClass">
      <Currency v-if="type === 'currency'" :amount="value" />
      <template v-if="type === 'number'">{{ value }}</template>
    </CardContent>
    <CardFooter v-if="subtitle">{{ subtitle }}</CardFooter>
  </Card>
</template>

<script setup lang="ts">
  import Currency from "../Currency.vue";
  import type { StatsFormat } from "./types";
  import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

  type Props = {
    title: string;
    value: number;
    subtitle?: string;
    type?: StatsFormat;
    to?: string;
    variant?: "default" | "warning";
  };

  const props = withDefaults(defineProps<Props>(), {
    type: "number",
    subtitle: undefined,
    to: undefined,
    variant: "default",
  });

  const valueClass = computed(() => ({
    "text-amber-400": props.variant === "warning",
  }));
</script>

<style></style>
