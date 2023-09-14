import Modal from "~/components/Modal";
import { supabase } from "~/App";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useDeleteDrink() {
  return useMutation(async (drinkId: string | undefined) => {
    await supabase.from("drinks").delete().eq("id", drinkId);
  }).mutate;
}

const DeleteDrinkModal = ({
  drinkToDeleteId,
  onClose,
}: {
  drinkToDeleteId: string | undefined;
  onClose: () => void;
}) => {
  const queryClient = useQueryClient();
  const deleteDrink = useDeleteDrink();

  return (
    <Modal
      title="Are You Sure?"
      isOpen={!!drinkToDeleteId}
      onClose={onClose}
      onConfirm={() => {
        deleteDrink(drinkToDeleteId, {
          onSuccess: () => queryClient.refetchQueries(["drinks"]),
        });
        onClose();
      }}
    >
      You're about to remove this drink from your record. Are you sure you want
      to do this?
    </Modal>
  );
};

export default DeleteDrinkModal;
