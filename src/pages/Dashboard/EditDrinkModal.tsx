import { supabase } from "~/App";

import { convertToNumber, calculateUnits } from "~/utils";

import DrinkForm, { CreateDrink } from "./DrinkForm";
import Modal from "~/components/Modal";
import { Drink } from ".";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useEditDrink() {
  return useMutation(
    async ({
      drinkToEditId,
      drink,
    }: {
      drinkToEditId: string;
      drink: CreateDrink;
    }) => {
      const numericVolume = convertToNumber(drink.volume!);
      const numericAbv = convertToNumber(drink.abv!);

      await supabase
        .from("drinks")
        .update({
          volume: numericVolume,
          abv: numericAbv,
          units: calculateUnits(
            numericVolume,
            numericAbv,
            drink.measurementUnit
          ),
          drink_type: drink.drinkType,
          measurement_unit: drink.measurementUnit,
          created_at: drink.createdAt,
        })
        .eq("id", drinkToEditId);
    }
  ).mutate;
}

const EditDrinkModal = ({
  drinkToEdit,
  onClose,
}: {
  drinkToEdit: Drink | undefined;
  onClose: () => void;
}) => {
  const editDrink = useEditDrink();
  const queryClient = useQueryClient();

  return (
    <Modal
      title="Edit Drink"
      isOpen={!!drinkToEdit}
      onClose={onClose}
      noButtons
    >
      <DrinkForm
        initDrink={drinkToEdit}
        onSubmit={(drink) => {
          editDrink(
            {
              drinkToEditId: drinkToEdit!.id,
              drink,
            },
            {
              onSuccess: () => queryClient.refetchQueries(["drinks"]),
            }
          );
          onClose();
        }}
        onClose={onClose}
      />
    </Modal>
  );
};

export default EditDrinkModal;
