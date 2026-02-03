package com.weatherapp;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import org.w3c.dom.NodeList;
import org.w3c.dom.Document;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class FMIApi {
    private static final String BASE_URL = "https://opendata.fmi.fi/wfs/fin";
    private String place;
    private WeatherParameter weatherParameter;
    private String startDateTime;
    private String endDateTime;
    private List<Double> weatherValues; 
    private static final DateTimeFormatter INPUT_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    
    public FMIApi(String place, WeatherParameter weatherParameter, String startDateTime, String endDateTime) {
        this.place = place;
        this.weatherParameter = weatherParameter;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.weatherValues = new ArrayList<>();
    }

    public String buildUrl() {
        return BASE_URL 
            + "?service=WFS&version=2.0.0&request=getFeature"
            + "&storedquery_id=fmi::observations::weather::timevaluepair"
            + "&place=" + place
            + "&parameters=" + weatherParameter.getParameter()
            + "&timestep=60"
            + "&starttime=" + startDateTime
            + "&endtime=" + getCorrectDays();
    }

    public String getCorrectDays() {
        LocalDate parsedEnd = LocalDate.parse(endDateTime, INPUT_FORMATTER);
        parsedEnd = parsedEnd.plusDays(1);
        System.out.println(parsedEnd.format(INPUT_FORMATTER));
        return parsedEnd.format(INPUT_FORMATTER);
    }
    public void fetchTemperatureData() {
        try {
            String apiUrl = buildUrl();
            URL url = new URL(apiUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            
            if (connection.getResponseCode() == 200) {
                InputStream responseStream = connection.getInputStream();
                parseXML(responseStream);
            } else {
                System.out.println("Failed to connect to the API, Response Code: " + connection.getResponseCode());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

        private void parseXML(InputStream responseStream) {
        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document doc = builder.parse(responseStream);
            doc.getDocumentElement().normalize();

            NodeList valueNodes = doc.getElementsByTagName("wml2:value");

            for (int i = 0; i < valueNodes.getLength(); i++) {
                String valueStr = valueNodes.item(i).getTextContent();
                double temperatureValue = Double.parseDouble(valueStr);
                weatherValues.add(temperatureValue);
            }
            if(weatherValues.size() > 1)
                weatherValues.remove(weatherValues.size() - 1);
            System.out.println("Extracted from FMI Values: " + weatherValues + " " + weatherValues.size());

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<Double> getWeatherValues() {
        return weatherValues;
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