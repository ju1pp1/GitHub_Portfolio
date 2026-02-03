package com.weatherapp;

public enum WeatherParameter {
    TEMPERATURE("temperature"),
    WINDSPEED("windspeedms"),
    HUMIDITY("humidity");
    
    private final String parameter;
    
    WeatherParameter(String parameter) {
        this.parameter = parameter;
    }
    
    public String getParameter() {
        return parameter;
    }
}