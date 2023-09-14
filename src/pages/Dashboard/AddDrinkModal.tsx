import { calculateUnits, convertToNumber } from "~/utils";
import Modal from "~/components/Modal";
import DrinkForm, { CreateDrink } from "./DrinkForm";
import { supabase } from "~/App";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useAddDrink() {
  return useMutation(async (drink: CreateDrink) => {
    const numericVolume = convertToNumber(drink.volume);
    const numericAbv = convertToNumber(drink.abv);

    await supabase.from("drinks").insert({
      volume: numericVolume,
      abv: numericAbv,
      units: calculateUnits(numericVolume, numericAbv, drink.measurementUnit),
      drink_type: drink.drinkType,
      measurement_unit: drink.measurementUnit,
      created_at: drink.createdAt,
    });
  }).mutate;
}

const AddDrinkModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const queryClient = useQueryClient();
  const addDrink = useAddDrink();

  return (
    <Modal title="Add Drink" isOpen={isOpen} onClose={onClose} noButtons>
      <DrinkForm
        onSubmit={(drink) => {
          addDrink(drink, {
            onSuccess: () => queryClient.refetchQueries(["drinks"]),
          });
          onClose();
        }}
        onClose={onClose}
      />
    </Modal>
  );
};

export default AddDrinkModal;
