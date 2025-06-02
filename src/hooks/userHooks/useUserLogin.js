import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
async function loginUser() {}
export const useUserLogin = function () {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // Mutations
  const {
    mutate: LoginUserMutate,
    isError,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
    },
  });
  return { LoginUserMutate, isError, isSuccess, isPending };
};
