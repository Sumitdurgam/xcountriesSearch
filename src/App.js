import "./App.css";
import { useEffect, useState } from "react";
// import CardItem from "./CardItem";

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCountries, setFilterCountries] = useState([]);
 const [error, setError] = useState("");

  useEffect(() => {

    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setCountriesData(data);
        setFilterCountries(data);

      } catch (error) {
        setError('Error fetching countries', error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const result = countriesData.filter(country => 
      country.name.common.toLowerCase().includes(search.toLocaleLowerCase())
    );
    setFilterCountries(result);
  }, [search, countriesData]);


  return (
    <div>
      <div className="searchCountries">
      <input 
        type="text"
        placeholder="Search for a Countries.."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      /> 
      </div>
         
       <div className="countryGrid">
        {filterCountries.map((country, index) => (
          <div key={index} className="countryCard">
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              className="flagImage"
            />
            <p>{country.name.common}</p>
          </div>
        ))}
        {error && <p className="errorMessage">{error}</p>}
      </div>
    </div>

  )

};

export default App;