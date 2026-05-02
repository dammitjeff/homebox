import { useI18n } from "vue-i18n";
import type { UserClient } from "~~/lib/api/user";

type StatCard = {
  label: string;
  value: number;
  type: "currency" | "number";
  to?: string;
  variant?: "default" | "warning";
};

export function statCardData(api: UserClient) {
  const { t } = useI18n();

  const { data: statistics } = useAsyncData(
    "statistics",
    async () => {
      const { data } = await api.stats.group();
      return data;
    },
    {
      deep: true,
    }
  );

  const { data: pendingCount } = useAsyncData("pending-decisions", async () => {
    const { data } = await api.items.getAll({ status: "pending", page: 1, pageSize: 1 });
    return data?.total ?? 0;
  });

  return computed(() => {
    return [
      {
        label: t("home.total_value"),
        value: statistics.value?.totalItemPrice || 0,
        type: "currency",
      },
      {
        label: t("home.total_items"),
        value: statistics.value?.totalItems || 0,
        type: "number",
      },
      {
        label: "Needs Decision",
        value: pendingCount.value ?? 0,
        type: "number",
        to: "/decisions",
        variant: "warning",
      },
    ] as StatCard[];
  });
}
