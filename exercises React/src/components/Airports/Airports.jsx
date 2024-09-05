import { useContext, useEffect, useState } from "react";
import "./Airports.css";
import axios from "axios";
import { AirportsContext } from "../../context/airportsContext";
import { LinearProgress } from "@mui/material";
import { Link } from "react-router-dom";

const Airports = () => {
  const { airportsList, setAirportsList } = useContext(AirportsContext);
  const [airportsLoadingStatus, setAirportsLoadingStatus] = useState("initial");

  const loadAirportsListFromApi = async () => {
    try {
      setAirportsList([]);
      setAirportsLoadingStatus("loading");
      const airportsFromApi = await axios.get(
        "http://localhost:4000/airports/delayed-list"
      );
      setAirportsLoadingStatus("loaded");
      setAirportsList(airportsFromApi.data);
    } catch {
      setAirportsLoadingStatus("error");
      console.log("Wystąpił błąd podczas pobierania listy lotnisk");
    }
  };
  console.log(airportsLoadingStatus);

  useEffect(() => {
    loadAirportsListFromApi();
  }, []);

  return (
    <div className={"Airports"}>
      <button onClick={loadAirportsListFromApi}>
        Załaduj listę lotnisk lotnisk
      </button>
      {airportsLoadingStatus === "loading" ? (
        <p>
          <LinearProgress />
        </p>
      ) : (
        <ul>
          {airportsList.map((airport) => (
            <Link
              key={airport.id}
              to={`/dashboard/airport-details/${airport.id}`}
            >
              <li key={airport.id}>{airport.name}</li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Airports;
