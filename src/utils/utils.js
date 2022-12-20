const getUniqueFlightsList = (arr, currentSearchDate) => {
  const withoutDuplicates = arr.reduce(
    (acc, el) => (acc.find(({ fltNo }) => el.fltNo === fltNo) || acc.push(el), acc),
    [],
  );

  const choseCorrectDate = withoutDuplicates.filter(
    curentDate =>
      new Date(curentDate.timeTakeofFact || curentDate.timeStandFact).getDate() ===
      currentSearchDate,
  );
  return choseCorrectDate;
};

export const filterFlightsList = (flightsList, searchText, currentSearchDate) => {
  if (!searchText) return getUniqueFlightsList(flightsList, currentSearchDate);

  const searchFilterList = flightsList.filter(flight => {
    const fltNo = `${flight['carrierID.IATA']}${flight.fltNo}`;
    const airportName = `${flight['airportToID.name_en']} || ${flight['airportFromID.name_en']}`;
    const airlineName = `${flight.airline.en.name}`;

    return (
      fltNo.toLowerCase().includes(searchText.toLowerCase()) ||
      airportName.toLowerCase().includes(searchText.toLowerCase()) ||
      airlineName.toLowerCase().includes(searchText.toLowerCase())
    );
  });
  return getUniqueFlightsList(searchFilterList);
};
