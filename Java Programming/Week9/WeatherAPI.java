package fi.tuni.prog3.weatherapp;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author sdjean
 */
public class WeatherAPI implements iAPI {
    private static final String API_KEY = "my_api_key_here"; // my_api_key_here
    private static final String GEOCODING_API_URL = "https://api.openweathermap.org/geo/1.0/direct";
    private static final String WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
    private static final String FORECAST_API_URL = "https://api.openweathermap.org/data/2.5/forecast";
    
     /* Etsitään tietyn kaupungin nimen perusteella sijaintikoordinaatit. */
    @Override
    public String lookUpLocation(String loc) {
        try {
            // Käytetään getCoordinates metodia koordinaattien hakuun.
            double[] coordinates = getCoordinates(loc);
            return coordinates[0] + "," + coordinates[1];
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to fetch coordinates for location: " + loc;
        }
    }
    
    /* Hae nykyiset säätiedot leveys- ja pituusasteikon perusteella. */
    @Override
    public WeatherData getCurrentWeather(double lat, double lon) {
        try {
            WeatherData weatherData = getCurrentWeatherData(lat, lon);
            // Muutetaan Kelvinit Celsiuksiksi.
            double temperatureCelsius = kelvinToCelsius(weatherData.getTemperature());
            long roundedTemperature = Math.round(temperatureCelsius);
        return new WeatherData(roundedTemperature,  weatherData.getWeatherMain(), weatherData.getWindSpeed(), weatherData.humidity);
        }
            //return "Temperature: " + roundedTemperature + " °C, Weather main: " + weatherData.getWeatherMain() + ", Wind speed: " + weatherData.getWindSpeed() + " m/s";
        //}
         catch (Exception e) {
            e.printStackTrace();
            return null;
            //return "Failed to fetch current weather data for coordinates: (" + lat + ", " + lon + ")";
        }
    }
    
    /* Hae ennusteet leveys- ja pituusasteikon perusteella.
       Asetettu hakemaan kolmen seuraavan päivän ajalta klo 12:00:00. */
    @Override
    public JsonArray getForecast(double lat, double lon) {
        try {
        // Luodaan URL-osoite API pyynnölle.
        String urlString = String.format("%s?lat=%f&lon=%f&cnt=30&appid=%s", FORECAST_API_URL, lat, lon, API_KEY);
        URL url = new URL(urlString);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");

        // Luetaan pyynnön vastaus
        BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        StringBuilder response = new StringBuilder();
        String line;

        while ((line = reader.readLine()) != null) {
            response.append(line);
        }
        reader.close();

        // Jäsennä JSON vastaus.
        JsonObject jsonResponse = JsonParser.parseString(response.toString()).getAsJsonObject();
        JsonArray forecastList = jsonResponse.getAsJsonArray("list");

        // Määritetään päivämäärän muoto ja kalenteri.
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd.MM HH:mm:ss"); // Define the date format
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());

        JsonArray forecasts = new JsonArray();

        int count = 0;
        
        // Luetaan ennustetietojen läpi.
        for (JsonElement forecastElement : forecastList) {

            JsonObject editedForecastObject = new JsonObject();
            
            JsonObject forecastObject = forecastElement.getAsJsonObject();

            long unixTimestamp = forecastObject.get("dt").getAsLong();
            Date date = new Date(unixTimestamp * 1000L);
            if(calendar.get(Calendar.DAY_OF_MONTH) == date.getDate()) {
                continue;
            }
            if(date.getHours() != 12) {
                continue;
            }
            
            JsonObject temperatureObject = forecastObject.getAsJsonObject("main");
            double temperatureKelvin = temperatureObject.get("temp").getAsDouble();
            double temperatureCelsius = kelvinToCelsius(temperatureKelvin);
            long roundedTemperature = Math.round(temperatureCelsius);

            editedForecastObject.addProperty("date", dateFormat.format(date));
            editedForecastObject.addProperty("temp", roundedTemperature);
            editedForecastObject.addProperty("weather", forecastObject.getAsJsonArray("weather").get(0).getAsJsonObject().get("main").getAsString());
            editedForecastObject.addProperty("wind", forecastObject.getAsJsonObject("wind").get("speed").getAsDouble());

            forecasts.add(editedForecastObject);

            count++;
            
            if(count >= 7) {
                break;
            }
            calendar.add(Calendar.DAY_OF_MONTH, 1);
            
        }


        return forecasts;

    } catch (Exception e) {
        e.printStackTrace();
        return null;
        
        //return "Failed to fetch forecast data for coordinates: (" + lat + ", " + lon + ")";
    }
    }
    
    // Muutetaan Kelvinit Celsiukseksi metodi.
    public static double kelvinToCelsius(double temperatureKelvin) {
        return temperatureKelvin - 273.15;
    }
    
    /* Hae koordinaatit kaupungin nimen perusteella. */
    @Override
    public double[] getCoordinates(String cityName) throws Exception {
        String urlString = String.format("%s?q=%s&limit=1&appid=%s", GEOCODING_API_URL, cityName, API_KEY);
        URL url = new URL(urlString);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");
        
        BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        StringBuilder response = new StringBuilder();
        String line;
        
        while ((line = reader.readLine()) != null) {
            response.append(line);
        }
        reader.close();
        
        JsonArray jsonArray = JsonParser.parseString(response.toString()).getAsJsonArray();
        JsonObject jsonObject = jsonArray.get(0).getAsJsonObject();
        double latitude = jsonObject.get("lat").getAsDouble();
        double longitude = jsonObject.get("lon").getAsDouble();
        
        return new double[] { latitude, longitude };
    }
    
    /* Hae säätietoja leveys- ja pituusasteikon perusteella. */
    private WeatherData getCurrentWeatherData(double latitude, double longitude) throws Exception {
        String urlString = String.format("%s?lat=%f&lon=%f&appid=%s", WEATHER_API_URL, latitude, longitude, API_KEY);
        
        URL url = new URL(urlString);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");
        
        BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        StringBuilder response = new StringBuilder();
        String line;
        
        while ((line = reader.readLine()) != null) {
            response.append(line);
        }
        reader.close();
        
        JsonObject jsonResponse = JsonParser.parseString(response.toString()).getAsJsonObject();
        
        // Ota talteen lämpötila, weather main ja tuulen nopeus.
        double temperature = jsonResponse.getAsJsonObject("main").get("temp").getAsDouble();
        String weatherMain = jsonResponse.getAsJsonArray("weather").get(0).getAsJsonObject().get("main").getAsString();
        double windSpeed = jsonResponse.getAsJsonObject("wind").get("speed").getAsDouble();
        int humidity = jsonResponse.getAsJsonObject("main").get("humidity").getAsInt();
        
        return new WeatherData(temperature, weatherMain, windSpeed, humidity);
    }
    
    /* Sisäinen luokka edustamaan säätietoja. */
    public static class WeatherData {
        private double temperature;
        private String weatherMain;
        private double windSpeed;
        private int humidity;
        
        public WeatherData(double temperature, String weatherMain, double windSpeed, int humidity) {
            this.temperature = temperature;
            this.weatherMain = weatherMain;
            this.windSpeed = windSpeed;
            this.humidity = humidity;
        }
        
        public double getTemperature() {
            return temperature;
        }

        public String getWeatherMain() {
            return weatherMain;
        }

        public double getWindSpeed() {
            return windSpeed;
        }
        public int getHumidity() {
            return humidity;
        }
    }

    public static class ForecastData {
        private List<WeatherData> weatherDataList;

        public ForecastData() {
            this.weatherDataList = new ArrayList<>();
        }

        // Method to get the list of WeatherData
        public List<WeatherData> getWeatherDataList() {
            return weatherDataList;
        }
    }
    
}
