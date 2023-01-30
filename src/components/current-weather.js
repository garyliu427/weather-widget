import React from "react";

const CurrentWeather = ({ data }) => {
  return (
    <div className="flex justify-center w-1/2 m-auto">
      <div className="w-full px-2">
        <div className="relative min-w-0 break-words rounded-lg overflow-hidden shadow-sm mb-4 w-full bg-blue-300">
          <div className="px-6 py-6 relative ">
            <div className="flex justify-between items-center">
              <div className="text-left">
                <h5 className="mb-0 font-bold text-3xl py-5">{data.name}</h5>
                {data.weather ? (
                  <h3 className="font-medium text-xl mb-0">
                    {data.weather[0].main}
                  </h3>
                ) : null}
              </div>

              <div className="text-right">
                {data.main ? (
                  <h1 className="font-bold text-4xl mb-0 pt-5">
                    {data.main.temp.toFixed()}&deg;
                  </h1>
                ) : null}
                <img
                  className=""
                  alt="weather"
                  src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                />
              </div>
            </div>
            <div className="">
              <div className="flex mb-2 w-full">
                {data.main ? (
                  <h3>{data.main.temp_min.toFixed()}&deg;C&nbsp;</h3>
                ) : null}{" "}
                /{" "}
                {data.main ? (
                  <h3>&nbsp;{data.main.temp_max.toFixed()}&deg;C</h3>
                ) : null}
              </div>
              <div className="grid grid-cols-2">
                <div className="w-full sm:w-1/2">
                  <div className="flex mb-2 justify-between items-center">
                    <span>Wind</span>
                    {data.main ? (
                      <span>{data.wind.speed.toFixed()}&nbsp;km/h</span>
                    ) : null}
                  </div>
                </div>
                <div className="w-full sm:w-1/2">
                  <div className="flex mb-2 justify-between items-center">
                    <span>Humidity</span>
                    {data.main ? (
                      <h3>{data.main.humidity.toFixed()}%&nbsp;</h3>
                    ) : null}
                  </div>
                </div>
                <div className="w-full sm:w-1/2">
                  <div className="flex mb-2 justify-between items-center">
                    <span>Pressure</span>
                    {data.main ? (
                      <h3>{data.main.pressure.toFixed()}hPa</h3>
                    ) : null}
                  </div>
                </div>
                <div className="w-full sm:w-1/2">
                  <div className="flex mb-2 justify-between items-center">
                    <span>Visibility</span>
                    {data.main ? (
                      <h3>{data.visibility.toFixed() / 1000}km</h3>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
