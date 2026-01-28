export const associationKeys = {
  all: ["associations"] as const,
  lists: () => [...associationKeys.all, "list"] as const,
  list: (params?: any) => [...associationKeys.lists(), params] as const,
  details: () => [...associationKeys.all, "detail"] as const,
  detail: (id: string) => [...associationKeys.details(), id] as const,
  countries: ["countries"] as const,
};
