package com.weatherapp;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class OpenMeteoAPI {
    private static final String GEOCODING_URL = "http://geocoding-api.open-meteo.com/v1/search?name=";
    private static final String BASE_URL = "http://api.open-meteo.com/v1/forecast";

    private String place;
    private WeatherParameter weatherParameter;
    private String startDateTime;
    private String endDateTime;

    private double latitude;
    private double longitude;
    private List<Double> weatherValues;

    // Constructor for OpenMeteoAPI
    public OpenMeteoAPI(String place, WeatherParameter weatherParameter, String startDateTime, String endDateTime) {
        this.place = place;
        this.weatherParameter = weatherParameter;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.weatherValues = new ArrayList<>();
    }

    // Fetches weather data from the Open-Meteo API using Geocoding API
    public void fetchWeatherData() {
        try {
            fetchCoordinates();
            String apiUrl = buildUrl();
            URL url = new URL(apiUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            if(connection.getResponseCode() == 200) {
                InputStream responseStream = connection.getInputStream();
                parseWeatherJSON(responseStream);
            } else {
                System.out.println("Failed to fetch weather data.");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Fetch lat and long coordinates for the given place using Geocoding API
    public void fetchCoordinates() {
        try {
            String apiUrl = GEOCODING_URL + place;
            URL url = new URL(apiUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            if(connection.getResponseCode() == 200) {
                InputStream responseStream = connection.getInputStream();
                parseGeocodingJSON(responseStream);
            } else {
                System.out.println("Failed to fetch coordinates, Response Code: " + connection.getResponseCode());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Parses the JSON response from the geocoding API to extract lat and long values
    // responseStream contains Geocoding APIs response
    private void parseGeocodingJSON(InputStream responseStream) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(responseStream);
            JsonNode results = root.get("results");

            if(results != null && results.size() > 0) {
                JsonNode firstResult = results.get(0);
                latitude = firstResult.get("latitude").asDouble();
                longitude = firstResult.get("longitude").asDouble();
            } else {
                System.out.println("No results found for the place " + place);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String buildUrl() {
        String parameterKey = getParameterKey(weatherParameter);
        return BASE_URL
            + "?latitude=" + latitude
            + "&longitude=" + longitude
            + "&hourly=" + parameterKey
            + "&start_date=" + startDateTime.substring(0, 10)
            + "&end_date=" + endDateTime.substring(0, 10);
    }

    // Maps the WeatherParameter enum to the correct parameter key required by Open-Meteo API
    private String getParameterKey(WeatherParameter parameter) {
        switch (parameter) {
            case TEMPERATURE:
            return "temperature_2m";
            case WINDSPEED:
            return "wind_speed_10m";
            case HUMIDITY:
            return "relative_humidity_2m";
            default:
            return "";
        }
    }

    // Parses JSON response from the weather API to extract requested weather parameter values
    private void parseWeatherJSON(InputStream responseStream) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(responseStream);
            JsonNode hourly = root.get("hourly");
            String parameterKey = getParameterKey(weatherParameter);

            if(hourly != null && hourly.has(parameterKey)) {
                JsonNode valuesNode = hourly.get(parameterKey);
                for(JsonNode valueNode : valuesNode) {
                    double value = valueNode.asDouble();
                    weatherValues.add(value);
                }
                System.out.println("Extracted from Open-Meteo " + weatherParameter + " Values: " + weatherValues + " " + weatherValues.size());
            } else {
                System.out.println("No data available for selected parameter.");
            }
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    // List of extracted weather parameter values
    public List<Double> getWeatherValues() {
        return weatherValues;
    }

}
