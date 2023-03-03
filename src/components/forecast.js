import React from "react";

const Forecast = ({ data }) => {
  return (
    <>
      <div></div>
      <div className="justify-center text-center text-3xl">Forecast</div>
      <div className="md:flex md:justify-center md:w-1/2 md:m-auto">
        <div className="md:flex">
          {data.list.slice(0, 5).map((item, idx) => (
            <div key={idx}>
              <div>
                <div>
                  <div className="daily-item">
                    <img
                      src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                      className="icon-small"
                      alt="weather"
                    />
                    <h1 className="text-xl mb-0 pt-5 pr-5">
                      {new Date(item.dt * 1000).toLocaleString("en-AU", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </h1>

                          <h1 className="font-bold text-2xl mb-0 pt-5 ">
                      {item.main.temp.toFixed()}&deg;
                    </h1>
                    <label className="min-max">
                      {Math.round(item.main.temp_max)}°C /
                      {Math.round(item.main.temp_min)}°C
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Forecast;
