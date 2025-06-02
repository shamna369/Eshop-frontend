import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { toast } from "react-toastify";
import { server } from "../../server";

async function deleteProduct(id) {
  try {
    const res = await axios.delete(`${server}/products/${id}`);
  } catch (err) {
    throw new Error("Error in updating product");
  }
}
export const useDeleteProduct = function () {
  const queryClient = useQueryClient();
  // Mutations
  const {
    mutate: deleteProductMutate,
    isError,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      // Invalidate and refetch
      toast.success("successfully product deleted");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete product");
    },
  });
  return { deleteProductMutate, isError, isSuccess, isPending };
};
