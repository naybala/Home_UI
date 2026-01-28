"use client";

import { useRouter, usePathname, useParams } from "next/navigation";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { classNames } from "primereact/utils";
import { useAssociationForm } from "../hooks/useAssociationForm";
import SingleImageUploader from "@/components/common/SingleImageUploader";
import PersistenceLoader from "@/components/common/PersistenceLoader";
import FilterSelect from "@/components/common/FilterSelect";

export default function AssociationForm() {
  const pathname = usePathname();
  const params = useParams();
  const id = params?.id as string;
  const isViewMode = pathname?.includes("/view/");

  const {
    form,
    cancel,
    handleChange,
    setFieldValue,
    handleFileChange,
    handleSubmit,
    errors,
    isEditMode,
    countries,
    isLoading,
    isCreating,
    isUpdating,
  } = useAssociationForm(id);

  const isPending = isCreating || isUpdating;

  return (
    <div className="p-4 w-full">
      <PersistenceLoader visible={isPending} />
      <Card
        className="shadow-xl border-t-4 border-t-brand-primary"
        title={
          isViewMode
            ? "View Association"
            : isEditMode
            ? "Edit Association"
            : "Create Association"
        }
      >
        {isLoading ? (
          <div className="flex justify-center p-8">
            <i className="pi pi-spin pi-spinner text-4xl text-brand-primary"></i>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-bold">
                  Name
                </label>
                <InputText
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={isViewMode}
                  className={classNames("w-full transition-all", {
                    "p-invalid": errors.name,
                  })}
                />
                {errors.name && (
                  <small className="p-error">{errors.name}</small>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="shortName" className="font-bold">
                  Short Name
                </label>
                <InputText
                  id="shortName"
                  name="shortName"
                  value={form.shortName}
                  onChange={handleChange}
                  disabled={isViewMode}
                  className={classNames("w-full transition-all", {
                    "p-invalid": errors.shortName,
                  })}
                />
                {errors.shortName && (
                  <small className="p-error">{errors.shortName}</small>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <label htmlFor="countryId" className="font-bold">
                Country
              </label>
              <FilterSelect
                id="countryId"
                value={form.countryId}
                options={(countries.data as any)?.data || []}
                optionLabel="name"
                optionValue="code"
                showFlag
                imgKey="flag"
                placeholder="Select Country"
                disabled={isViewMode}
                error={errors.countryId}
                onChange={(value) => setFieldValue("countryId", value)}
              />

              {errors.countryId && (
                <small className="p-error">{errors.countryId}</small>
              )}
            </div>

            <div className="mt-4">
              <SingleImageUploader
                label="Association Logo"
                value={form.imageFiles as File}
                initialUrl={form.logo as string}
                onChange={handleFileChange}
                shape="square"
                width="120px"
                height="120px"
                error={errors.logo}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="font-bold">
                Description
              </label>
              <InputTextarea
                id="description"
                name="description"
                value={form.description || ""}
                onChange={handleChange}
                disabled={isViewMode}
                rows={5}
                className="w-full"
              />
              {errors.description && (
                <small className="p-error">{errors.description}</small>
              )}
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button
                type="button"
                label="Cancel"
                icon="pi pi-times"
                outlined
                onClick={cancel}
              />
              {!isViewMode && (
                <Button
                  type="submit"
                  label={isEditMode ? "Update" : "Create"}
                  icon="pi pi-check"
                  loading={isPending}
                />
              )}
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}
