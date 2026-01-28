import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AssociationsAPI } from "../api/associations.api";
import { associationKeys } from "../queries/association.keys";
import {
  AssociationPayload,
  AssociationMutationResponse,
  AssociationIndexResponse,
  AssociationIndex,
} from "../types/association.types";

export function useAssociationMutations() {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: (data: AssociationPayload) => AssociationsAPI.create(data),
    onMutate: async (newAssoc) => {
      await queryClient.cancelQueries({ queryKey: associationKeys.lists() });
      const previousAssocs = queryClient.getQueriesData({
        queryKey: associationKeys.lists(),
      });

      queryClient.setQueriesData(
        { queryKey: associationKeys.lists() },
        (old: AssociationIndexResponse | undefined) => {
          if (!old || !old.data) return old;

          const optimisticItem: AssociationIndex = {
            id: "temp-id-" + Date.now(),
            name: newAssoc.name,
            logo: newAssoc.logo || "",
            canEdit: true,
          };

          return {
            ...old,
            data: {
              associations: [optimisticItem, ...old.data.data],
            },
          };
        }
      );

      return { previousAssocs };
    },

    onSuccess: () => {
      // Simply invalidate to refetch fresh data from server
      queryClient.invalidateQueries({ queryKey: associationKeys.lists() });
    },

    onError: (_err, _newAssoc, context) => {
      if (context?.previousAssocs) {
        context.previousAssocs.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: associationKeys.all });
    },
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: AssociationPayload }) =>
      AssociationsAPI.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: associationKeys.details() });
      await queryClient.cancelQueries({ queryKey: associationKeys.lists() });

      const previousAssocs = queryClient.getQueriesData({
        queryKey: associationKeys.lists(),
      });
      const previousAssoc = queryClient.getQueryData(
        associationKeys.detail(id)
      );

      // Update lists
      queryClient.setQueriesData(
        { queryKey: associationKeys.lists() },
        (old: AssociationIndexResponse | undefined) => {
          if (!old || !old.data) return old;
          return {
            ...old,
            data: {
              associations: old.data.data.map((item) =>
                item.id === id
                  ? {
                      ...item,
                      name: data.name,
                      logo: data.logo || item.logo,
                    }
                  : item
              ),
            },
          };
        }
      );

      // Update detail
      queryClient.setQueryData(associationKeys.detail(id), (old: any) => {
        if (!old || !old.data) return old;
        return {
          ...old,
          data: { ...old.data, ...data },
        };
      });

      return { previousAssocs, previousAssoc };
    },

    onSuccess: (_, { id }) => {
      // Invalidate to refetch fresh data
      queryClient.invalidateQueries({ queryKey: associationKeys.lists() });
      queryClient.invalidateQueries({ queryKey: associationKeys.detail(id) });
    },

    onError: (_err, { id }, context) => {
      if (context?.previousAssocs) {
        context.previousAssocs.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
      if (context?.previousAssoc) {
        queryClient.setQueryData(
          associationKeys.detail(id),
          context.previousAssoc
        );
      }
    },

    onSettled: (_, __, { id }) => {
      queryClient.invalidateQueries({ queryKey: associationKeys.all });
      queryClient.invalidateQueries({ queryKey: associationKeys.detail(id) });
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => AssociationsAPI.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: associationKeys.lists() });
      const previousAssocs = queryClient.getQueriesData({
        queryKey: associationKeys.lists(),
      });

      queryClient.setQueriesData(
        { queryKey: associationKeys.lists() },
        (old: AssociationIndexResponse | undefined) => {
          if (!old || !old.data) return old;
          return {
            ...old,
            data: {
              associations: old.data.data.filter((item) => item.id !== id),
            },
          };
        }
      );

      return { previousAssocs };
    },

    onSuccess: () => {
      // Invalidate to refetch fresh data
      queryClient.invalidateQueries({ queryKey: associationKeys.lists() });
    },

    onError: (_err, _id, context) => {
      if (context?.previousAssocs) {
        context.previousAssocs.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: associationKeys.all });
    },
  });

  return {
    create,
    update,
    remove,
    isCreating: create.isPending,
    isUpdating: update.isPending,
    isRemoving: remove.isPending,
  };
}
