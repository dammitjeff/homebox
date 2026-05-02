<script setup lang="ts">
  import { useI18n } from "vue-i18n";
  import { toast } from "@/components/ui/sonner";
  import type { EntitySummary, EntityOut, EntityUpdate } from "~~/lib/api/types/data-contracts";
  import BaseContainer from "@/components/Base/Container.vue";
  import BaseCard from "@/components/Base/Card.vue";
  import Subtitle from "~/components/global/Subtitle.vue";
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
  import { Label } from "@/components/ui/label";

  const { t } = useI18n();

  definePageMeta({
    middleware: ["auth"],
  });

  useHead({
    title: "HomeBox | Decisions",
  });

  const api = useUserApi();

  const loading = ref(false);
  const items = ref<EntitySummary[]>([]);

  async function fetchPending() {
    loading.value = true;
    const { data, error } = await api.items.getAll({ status: "pending", pageSize: 200 });
    loading.value = false;
    if (error) {
      toast.error("Failed to load pending decisions");
      return;
    }
    items.value = data.items ?? [];
  }

  onMounted(fetchPending);

  const decisionOptions = [
    { value: "keep", label: "Keep" },
    { value: "sell", label: "Sell" },
    { value: "return", label: "Return" },
    { value: "donate", label: "Donate" },
  ];

  const updating = ref<Record<string, boolean>>({});

  async function decide(item: EntitySummary, status: string) {
    if (!status) return;
    updating.value[item.id] = true;

    // Fetch full item to build the update payload
    const { data: full, error: fetchErr } = await api.items.get(item.id);
    if (fetchErr || !full) {
      toast.error("Failed to load item details");
      updating.value[item.id] = false;
      return;
    }

    const payload: EntityUpdate = {
      ...full,
      status,
      tagIds: full.tags.map(t => t.id),
      parentId: full.parent?.id ?? null,
      purchasePrice: full.purchasePrice ?? 0,
      soldPrice: full.soldPrice ?? 0,
      assetId: full.assetId,
    };

    const { error } = await api.items.update(item.id, payload);
    updating.value[item.id] = false;

    if (error) {
      toast.error("Failed to save decision");
      return;
    }

    toast.success(`Marked "${item.name}" as ${status}`);
    // Remove from pending list
    items.value = items.value.filter(i => i.id !== item.id);
  }
</script>

<template>
  <div>
    <BaseContainer class="flex flex-col gap-4">
      <section>
        <Subtitle>Pending Decisions</Subtitle>
        <p class="mb-4 text-sm text-muted-foreground">
          Items marked as "Needs Decision" — choose what to do with each one.
        </p>

        <p v-if="loading" class="ml-2 text-sm text-muted-foreground">Loading...</p>

        <p v-else-if="items.length === 0" class="ml-2 text-sm text-muted-foreground">
          No items need a decision right now.
        </p>

        <BaseCard v-else>
          <div class="divide-y">
            <div
              v-for="item in items"
              :key="item.id"
              class="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div class="flex flex-col gap-1">
                <a :href="`/item/${item.id}`" class="font-medium hover:underline">{{ item.name }}</a>
                <div class="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span v-if="item.location">{{ item.location.name }}</span>
                  <span v-if="item.purchasePrice"> · ${{ item.purchasePrice.toFixed(2) }}</span>
                  <span v-for="tag in item.tags" :key="tag.id"> · {{ tag.name }}</span>
                </div>
              </div>

              <div class="flex min-w-[160px] flex-col gap-1">
                <Label class="text-xs text-muted-foreground">Decision</Label>
                <Select
                  :disabled="updating[item.id]"
                  :model-value="undefined"
                  @update:model-value="(val: string) => decide(item, val)"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem v-for="opt in decisionOptions" :key="opt.value" :value="opt.value">
                      {{ opt.label }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </BaseCard>
      </section>
    </BaseContainer>
  </div>
</template>
