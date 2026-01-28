import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppToast } from "@/hooks/useAppToast";
import { useAssociationDetail } from "../queries/useAssociationDetail";
import { useCountries } from "../queries/useCountries";
import { useAssociationMutations } from "../mutations/useAssociationMutations";
import { AssociationSchema } from "../schema/association.schema";
import {
  AssociationFormInput,
  AssociationPayload,
  AssociationMutationResponse,
} from "../types/association.types";
import { cleanFormData } from "@/utils/cleanForm";
import { fileService } from "@/services/fileService";

export function useAssociationForm(id?: string) {
  const isEditMode = !!id;
  const router = useRouter();
  const { showSuccess, showError } = useAppToast();

  const { data: detailData, isLoading: isLoadingDetail } =
    useAssociationDetail(id);
  const searchParams = useSearchParams();
  const backUrl = `/associations?${searchParams.toString()}`;

  const countries = useCountries();
  const { create, update, isCreating, isUpdating } = useAssociationMutations();

  const [form, setForm] = useState<AssociationFormInput>({
    name: "",
    shortName: "",
    countryId: "",
    description: "",
    logo: "",
    imageFiles: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // -------------------------------
  // Load edit data
  // -------------------------------
  useEffect(() => {
    if (!detailData?.data) return;

    const data = detailData.data;
    setForm({
      name: data.name ?? "",
      shortName: data.shortName ?? "",
      countryId: data.countryId ?? "",
      description: data.description ?? "",
      logo: data.logo ?? "",
      imageFiles: null,
    });
  }, [detailData]);

  // -------------------------------
  // Handlers
  // -------------------------------
  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (file: File | null) => {
    setForm((prev) => ({
      ...prev,
      imageFiles: file,
    }));
  };

  const setFieldValue = (name: keyof AssociationFormInput, value: any) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // -------------------------------
  // Validation
  // -------------------------------
  const validate = () => {
    const parsed = AssociationSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  // -------------------------------
  // Final Submit Logic
  // -------------------------------
  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validate()) return;

    try {
      const file = form.imageFiles as File | null;
      const payload = cleanFormData({
        ...form,
        logo: file ? { filename: file.name, contentType: file.type } : null,
      }) as AssociationPayload;

      const response: AssociationMutationResponse =
        isEditMode && id
          ? await update.mutateAsync({ id, data: payload })
          : await create.mutateAsync(payload);

      const uploadUrl = response.data.uploadUrl;
      if (file && uploadUrl) {
        await fileService.uploadToCloud(uploadUrl, file);
      }

      showSuccess(
        "Success",
        `Association ${isEditMode ? "updated" : "created"} successfully`
      );

      router.push("/associations");
    } catch (err: any) {
      if (err.responseData?.errors) {
        setErrors(err.responseData.errors);
        showError("Validation Error", "Please check the form");
      } else {
        showError("Error", err.message || "Failed to save association");
      }
    }
  };

  const cancel = () => router.push(backUrl);

  return {
    form,
    errors,
    countries,
    isEditMode,
    isLoading: isLoadingDetail || countries.isLoading,
    isCreating,
    isUpdating,
    handleChange,
    setFieldValue,
    handleFileChange,
    handleSubmit,
    cancel,
  };
}
