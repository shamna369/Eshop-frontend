/*eslint-disable react/prop-types */
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { useUpdateDeliveryStatus } from "../../hooks/adminHooks/useUpdateDeliveryStatus";

function DeliveryUpdate({ id }) {
  const { updateStatusMutate, isError, isSuccess, isPending } =
    useUpdateDeliveryStatus();
  return (
    <div>
      <button
        onClick={() => updateStatusMutate(id)}
        className="text-blue-800 cursor-pointer"
      >
        <MdEdit size={14} title="update" />
      </button>
      {isPending && (
        <div
          className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-green-500 motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        ></div>
      )}
    </div>
  );
}

export default DeliveryUpdate;
