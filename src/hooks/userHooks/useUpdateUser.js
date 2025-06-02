import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postUserUpdatedData } from "../../services/userApiService";

export const useUpdateUser = function () {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // Mutations
  const {
    mutate: updateUserMutate,
    isError,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: postUserUpdatedData,
    onSuccess: () => {
      // Invalidate and refetch

      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/login", { replace: true });
    },
  });
  return { updateUserMutate, isError, isSuccess, isPending };
};
