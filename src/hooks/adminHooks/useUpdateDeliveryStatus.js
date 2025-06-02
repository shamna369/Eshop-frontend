import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { toast } from "react-toastify";
import { server } from "../../server";

async function updateDeliveryStatus(id) {
  try {
    const res = await axios.patch(`${server}/order/update-delivery-status`, {
      id,
    });
  } catch (err) {
    // console.log(err);
    throw new Error("Error in updating order");
  }
}
export const useUpdateDeliveryStatus = function () {
  const queryClient = useQueryClient();
  // Mutations
  const {
    mutate: updateStatusMutate,
    isError,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: (id) => updateDeliveryStatus(id),
    onSuccess: () => {
      // Invalidate and refetch
      toast.success("successfully delivery updated");
      queryClient.invalidateQueries({ queryKey: ["allorders"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update order status");
    },
  });
  return { updateStatusMutate, isError, isSuccess, isPending };
};
