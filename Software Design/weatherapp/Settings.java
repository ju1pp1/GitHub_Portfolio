package com.weatherapp;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Settings {

    private String place;
    private WeatherParameter weatherParameter;

    private String startDateTime;
    private String endDateTime;

    public Settings(String place, WeatherParameter weatherParameter, String startDateTime, String endDateTime) {
        this.place = place;
        this.weatherParameter = weatherParameter;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
    }

    public Settings() {
    }

    public static void saveToJson(String filename, List<Settings> settingsList) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            mapper.writeValue(new File(filename), settingsList);
            System.out.println("Settings saved to " + filename);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static List<Settings> loadFromJson(String filename) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(new File(filename), new TypeReference<List<Settings>>() {});
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public WeatherParameter getWeatherParameter() {
        return weatherParameter;
    }

    public void setWeatherParameter(WeatherParameter weatherParameter) {
        this.weatherParameter = weatherParameter;
    }

    public String getStartDateTime() {
        return startDateTime;
    }

    public void setStartDateTime(String startDateTime) {
        this.startDateTime = startDateTime;
    }

    public String getEndDateTime() {
        return endDateTime;
    }

    public void setEndDateTime(String endDateTime) {
        this.endDateTime = endDateTime;
    }
}
