import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";


function App() {

  const [city, setCity] = useState('');
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [weatherForecast, setWeatherForecast] = useState(null);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  }

  const searchForecastWeather = () => {

    setIsLoading(true);
    if (!city) return;
    fetch(`http://api.weatherapi.com/v1/current.json?key=37cce82af5f441e7a5c71337211511&q=${city}&lang=pt`)
      .then((response) => {
        if (response.status === 200) {
          setCity('')
          setIsNotFound(false)
          return response.json();
        } else if (response.status >= 400 && response.status < 500) {
          // setIsLoading(false)
          setIsNotFound(true);

        }
      })
      .then((data) => {
        setIsLoading(false)
        setWeatherForecast(data);
        // console.log(data);
      })
      .catch((err) => {
        throw new Error(err);
      })

    toast('Loading...', {
      "duration": 5000,
    });

  }


  return (
    <div>
      {isLoading ? <Toaster /> : null}
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <a href="locahost" className="navbar-brand">City Weather</a>
      </nav>

      <main className="container" id="search">
        <div className="jumbotron">
          <h1>Verifique agora a previsão do tempo na sua cidade</h1>
          <label className="label-control">Digite a sua cidade no campo abaixo e em seguida clique em porcurar.</label>
          <input type="text" className="form-control" value={city} onChange={handleCityChange} />

          <div className="mb-4 ">
            <div className="col-sm-6">
            </div>
          </div>

          <button className="btn btn-lg btn-primary" onClick={searchForecastWeather}>Pesquisar</button>
          {
            isNotFound ? (
              <h3 className="lead mt-4 red">Cidade não encontrada</h3>
            ) : weatherForecast ? (
              <div className="mt-4 d-flex align-items-center">
                <div className="col-sm-1">
                  <img src={weatherForecast.current.condition.icon} alt={weatherForecast.current.condition.text} />
                </div>
                <div>
                  <h3>
                    Hoje o dia está: {weatherForecast.current.condition.text} em {weatherForecast.location.name}, {weatherForecast.location.region}, {weatherForecast.location.country}
                  </h3>
                  <p className="lead">
                    Temperatura: {weatherForecast.current.temp_c} ºC
                  </p>
                </div>
              </div>

            ) : null
          }

        </div>
      </main>
    </div>
  );
}



export default App;
