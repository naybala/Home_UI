"use client";

import { Button } from "primereact/button";
import { BaseTable } from "@/components/common/BaseTable";
import { InputText } from "primereact/inputtext";
import { Paginator } from "primereact/paginator";
import { useAssociationTable } from "../hooks/useAssociationTable";

export default function AssociationTable() {
  const {
    t,
    params,
    loading,
    items,
    totalRecords,
    columns,
    actions,
    searchInputRef,
    onPageChange,
    resetFilter,
    onSearchChange,
    navigate,
    permissionStore,
  } = useAssociationTable();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <p className="text-4xl font-bold text-gray-800 dark:text-gray-100">
          {t("sidebar.associations")}
        </p>

        {permissionStore.hasPermission("associations.store") && (
          <Button
            label="Add Association"
            icon="pi pi-plus"
            onClick={() => navigate("/associations/create")}
            aria-label="Add Association"
          />
        )}
      </div>

      <div className="mb-4">
        <div className="w-full md:w-[450px] flex gap-2">
          <div className="flex-1">
            <InputText
              ref={searchInputRef}
              placeholder="Search..."
              className="w-full"
              defaultValue={params.search}
              onChange={onSearchChange}
              aria-label="Search"
            />
          </div>
          <Button
            label="Reset"
            icon="pi pi-refresh"
            onClick={resetFilter}
            outlined
            severity="secondary"
            aria-label="Reset"
          />
          {/* <Button
            label="Search"
            icon="pi pi-search"
            onClick={() =>
              updateSearchParam(searchInputRef.current?.value || "")
            }
            aria-label="Search"
          /> */}
        </div>
      </div>

      <BaseTable
        items={items}
        columns={columns}
        loading={loading}
        actions={actions}
        isHeaderStart={true}
        isTextStart={true}
        isBorder={true}
        isActionStart={false}
      />

      <div className="mt-4 bg-white dark:bg-gray-800 rounded shadow-md border dark:border-gray-700">
        <Paginator
          first={(params.page - 1) * params.limit}
          rows={params.limit}
          totalRecords={totalRecords}
          rowsPerPageOptions={[5, 10, 25, 50]}
          onPageChange={onPageChange}
          template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          className="p-paginator-sm dark:bg-gray-800 dark:text-gray-100"
          aria-label="Pagination"
        />
      </div>
    </div>
  );
}
