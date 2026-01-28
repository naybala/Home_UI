/* ================================
 * Base / Shared Types
 * ================================ */

export interface AssociationBase {
  id?: string;
  name: string;
  shortName: string;
  countryId: string;
  logo?: string;
  description?: string;
}

/** Common API response envelope */
export interface AssociationApiBase {
  success: boolean;
  code: number;
  message: string;
}

/* ================================
 * Domain Types
 * ================================ */

/** Item returned from list/index endpoint */
export interface AssociationIndex
  extends Pick<AssociationBase, "id" | "name" | "logo"> {
  canEdit: boolean;
}

/** Full association detail */
export interface Association extends AssociationBase {
  id: string; // required in detail
  countryName: string;
  createdAt: string;
}

/* ================================
 * Form & Payload Types
 * ================================ */

/** Used only inside UI forms */
export interface AssociationFormInput
  extends Pick<
    AssociationBase,
    "name" | "shortName" | "countryId" | "description"
  > {
  logo?: string;
  imageFiles?: File | null;
}

/** Payload sent to API (no File objects) */
export type AssociationPayload = Pick<
  AssociationBase,
  "name" | "shortName" | "countryId" | "logo" | "description"
>;

/* ================================
 * Query Params
 * ================================ */

export interface AssociationListParams {
  page?: number;
  limit?: number;
  search?: string;
  token?: string;
}

/* ================================
 * API Response Types
 * ================================ */

export interface AssociationIndexResponse extends AssociationApiBase {
  data: {
    data: AssociationIndex[];
    total?: number;
  };
}

export interface AssociationDetailResponse extends AssociationApiBase {
  data: Association;
}

export interface AssociationMutationResponse extends AssociationApiBase {
  data: {
    uploadUrl: string | null;
  };
}
