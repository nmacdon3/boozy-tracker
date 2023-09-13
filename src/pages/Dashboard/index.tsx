import AddDrinkButton from "./AddDrinkButton";
import ProgressBar from "./ProgressBar";
import Table from "./Table";
import ThisWeek from "./ThisWeek";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "~/App";

export type DrinkType = "pint" | "can" | "glass" | "shot";
export type MeasurementUnit = "ml" | "oz" | "shot";

export interface Drink {
  id: string;
  units: number;
  volume: number;
  abv: number;
  drink_type: DrinkType;
  measurement_unit: MeasurementUnit;
  created_at: string;
}

function useGetDrinks() {
  const dateToQuery = new Date();
  dateToQuery.setDate(dateToQuery.getDate() - new Date().getDay());
  dateToQuery.setHours(0, 0, 0, 0);

  return useQuery(["drinks"], async () => {
    const { data } = await supabase
      .from("drinks")
      .select()
      .gte("created_at", dateToQuery.toISOString())
      .returns<Drink[]>();
    return data;
  });
}

const Dashboard = () => {
  const { data: drinks } = useGetDrinks();

  const totalUnits = drinks?.reduce((acc, drink) => acc + drink.units, 0) ?? 0;

  const unitsLeft = 14 - totalUnits;
  const beersLeft = Math.floor(unitsLeft / 2);

  if (!drinks) {
    return <p>No drinks found.</p>;
  }

  return (
    <>
      <ThisWeek drinks={drinks} />
      <div className="flex flex-col items-center justify-center lg:px-64 px-4 gap-6 h-screen static">
        <div className="text-stone-400 ">{`This week, you've had`}</div>
        <h1 className="text-6xl font-bold">{totalUnits.toFixed(1)} Units</h1>
        <ProgressBar value={totalUnits} />
        <div className="text-stone-400 flex items-center mb-20">
          Out of 14 {totalUnits > 14 && <> &#129325;</>}
        </div>
        <AddDrinkButton />
        <div className="text-stone-400 flex items-center">
          {totalUnits <= 14 ? (
            <>
              {`You've got about`}{" "}
              <b className="text-stone-200 mx-2">{beersLeft} beers</b>left!
            </>
          ) : (
            <>
              {`You're about`}{" "}
              <b className="text-stone-200 mx-2">{-beersLeft} beers</b>over the
              recommended amount.
            </>
          )}
        </div>
      </div>

      <div className="lg:px-20 px-4 mb-40">
        <h2>History</h2>
        <Table drinks={drinks} />
      </div>
    </>
  );
};

export default Dashboard;
