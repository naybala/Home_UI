import { useRef, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { confirmDialog } from "primereact/confirmdialog";
import { PaginatorPageChangeEvent } from "primereact/paginator";
import { useAssociationList } from "../queries/useAssociationList";
import { useAssociationMutations } from "../mutations/useAssociationMutations";
import { useAppToast } from "@/hooks/useAppToast";
import { usePermissionStore } from "@stores/permission";
import { TableColumn, TableAction } from "@/components/common/BaseTable";
import { AssociationIndex } from "../types/association.types";
import { useDebounced } from "@/services/useDebounced";

export function useAssociationTable() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const permissionStore = usePermissionStore();
  const { showSuccess, showError } = useAppToast();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const search = searchParams.toString();

  // Derived params from URL
  const params = {
    page: parseInt(searchParams.get("page") || "1"),
    limit: parseInt(searchParams.get("limit") || "10"),
    search: searchParams.get("search") || "",
  };

  const { data, isLoading } = useAssociationList(params);
  const { remove } = useAssociationMutations();

  const items = data?.data?.data || [];
  const totalRecords = items.length || 0;

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.value = params.search;
    }
  }, [params.search]);

  const columns: TableColumn[] = [
    {
      label: t("associations.logo") || "Logo",
      field: "logo",
      isImage: true,
      isHeaderStart: false,
      isTextStart: false,
    },
    {
      label: t("associations.name") || "Name",
      field: "name",
      isHeaderStart: true,
      isTextStart: true,
    },
  ];

  const handleEdit = (item: AssociationIndex) => {
    router.push(`/associations/edit/${item.id}?${search}`);
  };

  const handleDelete = (item: AssociationIndex) => {
    confirmDialog({
      message: `Are you sure you want to delete ${item.name}?`,
      header: "Delete Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        try {
          await remove.mutateAsync(item.id!);
          showSuccess("Success", "Association deleted successfully");
        } catch (err: any) {
          showError("Error", err.message || "Failed to delete association");
        }
      },
    });
  };

  const handleView = (item: AssociationIndex) => {
    router.push(`/associations/view/${item.id}?${search}`);
  };

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("page", (event.page + 1).toString());
    current.set("limit", event.rows.toString());
    router.push(`${pathname}?${current.toString()}`);
  };

  const updateSearchParam = useDebounced((value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) {
      current.set("search", value);
    } else {
      current.delete("search");
    }
    current.set("page", "1");
    router.push(`${pathname}?${current.toString()}`);
  }, Number(process.env.NEXT_PUBLIC_DEBOUNCE_DURATION || 300));

  const resetFilter = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.delete("search");
    current.set("page", "1");
    router.push(`${pathname}?${current.toString()}`);
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateSearchParam(value);
  };

  const actions: TableAction[] = [
    {
      icon: "pi pi-eye",
      tooltip: "View",
      permission: permissionStore.hasPermission("associations.show"),
      handler: handleView,
    },
    {
      icon: "pi pi-pencil",
      tooltip: "Edit",
      permission: permissionStore.hasPermission("associations.edit"),
      handler: handleEdit,
    },
    {
      icon: "pi pi-trash",
      tooltip: "Delete",
      permission: permissionStore.hasPermission("associations.delete"),
      handler: handleDelete,
    },
  ];

  return {
    t,
    params,
    loading: isLoading,
    items,
    totalRecords,
    columns,
    actions,
    searchInputRef,
    onPageChange,
    updateSearchParam,
    resetFilter,
    onSearchChange,
    navigate: router.push,
    permissionStore,
  };
}

//Extra code logic
//For btn press filter
//  const handleSearch = () => {
//   const value = searchInputRef.current?.value || "";
//   setSearchParams((prev) => {
//     if (value) {
//       prev.set("search", value);
//     } else {
//       prev.delete("search");
//     }
//     prev.set("page", "1");
//     return prev;
//   });
// };

//  const onSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//   if (e.key === "Enter") {
//     handleSearch();
//   }
// };
