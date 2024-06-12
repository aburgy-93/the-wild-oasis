import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    // ID's the data we are querying.
    queryKey: ["cabins"],
    // fetches data from API, and returns a promise (getCabins is async and returns a promise)
    queryFn: getCabins,
  });

  return { isLoading, error, cabins };
}
