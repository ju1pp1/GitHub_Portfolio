package fi.tuni.prog3.weatherapp;

import com.google.gson.JsonArray;

import fi.tuni.prog3.weatherapp.WeatherAPI.ForecastData;

/**
 * Interface for extracting data from the OpenWeatherMap API.
 */
public interface iAPI {

    /**
     * Returns coordinates for a location.
     * @param loc Name of the location for which coordinates should be fetched.
     * @return String.
     */
    public String lookUpLocation(String loc);
    public double[] getCoordinates(String cityName) throws Exception;
    /**
     * Returns the current weather for the given coordinates.
     * @param lat The latitude of the location.
     * @param lon The longitude of the location.
     * @return String.
     */

    
    
    public WeatherAPI.WeatherData getCurrentWeather(double lat, double lon);

    /**
     * Returns a forecast for the given coordinates.
     * @param lat The latitude of the location.
     * @param lon The longitude of the location.
     * @return WeatherData.
     */
    public JsonArray getForecast(double lat, double lon);
}
