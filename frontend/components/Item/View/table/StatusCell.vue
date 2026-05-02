<script setup lang="ts">
  import { toast } from "@/components/ui/sonner";
  import type { EntitySummary, EntityUpdate } from "~~/lib/api/types/data-contracts";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "~/components/ui/dropdown-menu";

  const props = defineProps<{
    item: EntitySummary;
    onRefresh?: () => void;
  }>();

  const api = useUserApi();
  const saving = ref(false);

  const statusConfig: Record<string, { label: string; class: string }> = {
    none: { label: "—", class: "bg-muted text-muted-foreground border" },
    pending: { label: "Needs Decision", class: "bg-yellow-100 text-yellow-800 border-yellow-300" },
    in_use: { label: "In Use", class: "bg-cyan-100 text-cyan-800 border-cyan-300" },
    keep: { label: "Keep", class: "bg-green-100 text-green-800 border-green-300" },
    sell: { label: "Sell", class: "bg-blue-100 text-blue-800 border-blue-300" },
    return: { label: "Return", class: "bg-orange-100 text-orange-800 border-orange-300" },
    donate: { label: "Donate", class: "bg-purple-100 text-purple-800 border-purple-300" },
  };

  const options = [
    { value: "none", label: "None" },
    { value: "pending", label: "Needs Decision" },
    { value: "in_use", label: "In Use" },
    { value: "keep", label: "Keep" },
    { value: "sell", label: "Sell" },
    { value: "return", label: "Return" },
    { value: "donate", label: "Donate" },
  ];

  const currentStatus = ref(props.item.status || "none");

  const display = computed(() => statusConfig[currentStatus.value] ?? statusConfig.none);

  async function setStatus(newStatus: string) {
    if (newStatus === currentStatus.value || saving.value) return;
    saving.value = true;

    // Optimistic update
    const previous = currentStatus.value;
    currentStatus.value = newStatus;

    const { data: full, error: fetchErr } = await api.items.get(props.item.id);
    if (fetchErr || !full) {
      currentStatus.value = previous;
      toast.error("Failed to load item");
      saving.value = false;
      return;
    }

    const payload: EntityUpdate = {
      ...full,
      status: newStatus,
      tagIds: full.tags.map(t => t.id),
      parentId: full.parent?.id ?? null,
      purchasePrice: full.purchasePrice ?? 0,
      soldPrice: full.soldPrice ?? 0,
      assetId: full.assetId,
    };

    const { error } = await api.items.update(props.item.id, payload);
    saving.value = false;

    if (error) {
      currentStatus.value = previous;
      toast.error("Failed to update status");
      return;
    }

    props.item.status = newStatus;
    props.onRefresh?.();
  }
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <button
        class="inline-flex cursor-pointer items-center rounded-full border px-3 py-1 text-xs font-medium transition-all hover:ring-2 hover:ring-white hover:ring-offset-1 hover:shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]"
        :class="[display.class, saving ? 'opacity-50' : '']"
      >
        {{ display.label }}
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start">
      <DropdownMenuLabel class="text-xs text-muted-foreground">Set status</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        v-for="opt in options"
        :key="opt.value"
        :class="opt.value === currentStatus ? 'font-semibold' : ''"
        @click="setStatus(opt.value)"
      >
        {{ opt.label }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
