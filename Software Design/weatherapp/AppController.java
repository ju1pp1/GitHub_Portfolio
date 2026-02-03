package com.weatherapp;

import javafx.animation.FadeTransition;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import javafx.stage.Stage;
import javafx.util.Duration;
import javafx.scene.chart.LineChart;
import javafx.scene.chart.NumberAxis;
import javafx.scene.chart.XYChart;
import javafx.application.Platform;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import static com.weatherapp.WeatherParameter.*;

public class AppController {

    private static final DateTimeFormatter INPUT_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    private Stage stage;

    private String place;
    private WeatherParameter weatherParameter;
    private String startDateTime;
    private String endDateTime;
    private ObservableList<String> recentPlaces = FXCollections.observableArrayList();

    @FXML Button searchButton;
    @FXML Button clearHistoryButton;
    @FXML DatePicker startDatePicker;
    @FXML DatePicker endDatePicker;
    @FXML TextField searchField;
    @FXML Label banner;
    @FXML Label searchResultLabel;
    @FXML ComboBox<String> comboBox;
    @FXML RadioButton radioButtonToday;
    @FXML RadioButton radioButtonCustom;
    @FXML RadioButton radioButtonLastWeek;
    @FXML RadioButton radioButtonTemp;
    @FXML RadioButton radioButtonWind;
    @FXML RadioButton radioButtonHumid;
    @FXML ToggleGroup measurementGroup;
    @FXML LineChart<Number, Number> weatherChart;

    @FXML
    protected void onRadioButtonClick() {
    }

    @FXML
    protected void onSearchButtonClick() {
        fetchWeather();
    }

    protected void fetchWeather() {
        getPlace();
        getParameterState();
        getDateTimes();
        boolean apiFetchSuccessful = initApis();
        if (!apiFetchSuccessful) {
            return;
        }

        saveSettings();

        if (place != null && !place.isEmpty()){
            searchResultLabel.setText("Currently showing results for " + place);
        } else {
            searchResultLabel.setText("No location selected");
        }
    }

    private void getPlace() {
        place = searchField.getText().trim();
    
        if (place == null || place.isEmpty()) {
            displayBanner("Please select or enter a valid location.");
            place = null;
        } else {
            searchField.setText(place);
        }
    }

    private void getParameterState() {
        if (radioButtonTemp.isSelected()) {
            weatherParameter = TEMPERATURE;
        } else if (radioButtonWind.isSelected()) {
            weatherParameter = WINDSPEED;
        } else if (radioButtonHumid.isSelected()) {
            weatherParameter = HUMIDITY;
        }
    }

    private Toggle getToggleName(WeatherParameter weatherParameter) {
        return switch (weatherParameter) {
            case TEMPERATURE -> radioButtonTemp;
            case WINDSPEED -> radioButtonWind;
            case HUMIDITY -> radioButtonHumid;
        };
    }

    private void getDateTimes() {
        LocalDate selectedDate1 = startDatePicker.getValue();
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE;

        LocalDate selectedDate2 = endDatePicker.getValue();

        if (selectedDate2.isBefore(selectedDate1)) {
            displayBanner("Swapping start date and end date");

            endDateTime = selectedDate1.format(formatter);
            startDateTime = selectedDate2.format(formatter);
            setDates(startDateTime, endDateTime);
        }
        else {
            startDateTime = selectedDate1.format(formatter);
            endDateTime = selectedDate2.format(formatter);
        }
    }

    private void populateChart(List<Double> fmiValues, List<Double> openMeteoValues) {
        System.out.println("Populating chart with data...");
        System.out.println("FMI Values: " + fmiValues);
        System.out.println("Open Meteo Values: " + openMeteoValues);
    
        weatherChart.getData().clear();
        System.out.println("Cleared existing chart data.");
    
        XYChart.Series<Number, Number> fmiSeries = new XYChart.Series<>();
        fmiSeries.setName("FMI");
    
        XYChart.Series<Number, Number> openMeteoSeries = new XYChart.Series<>();
        openMeteoSeries.setName("Open Meteo");
    
        for (int i = 0; i < fmiValues.size(); i++) {
            Double value = fmiValues.get(i);
            if (!value.isNaN()) {
                fmiSeries.getData().add(new XYChart.Data<>(i, value));
                System.out.println("Added to FMI series: (" + i + ", " + value + ")");
            } else {
                System.out.println("Skipped NaN value in FMI series at index: " + i);
            }
        }
    
        for (int i = 0; i < openMeteoValues.size(); i++) {
            Double value = openMeteoValues.get(i);
            if (!value.isNaN()) {
                openMeteoSeries.getData().add(new XYChart.Data<>(i, value));
                System.out.println("Added to Open Meteo series: (" + i + ", " + value + ")");
            } else {
                System.out.println("Skipped NaN value in Open Meteo series at index: " + i);
            }
        }
    
        ObservableList<XYChart.Series<Number, Number>> chartData = FXCollections.observableArrayList();
        chartData.add(fmiSeries);
        chartData.add(openMeteoSeries);
        weatherChart.setData(chartData);
        System.out.println("Chart data populated: " + chartData);
        
        // Update y-axis label based on the selected weather parameter
        NumberAxis yAxis = (NumberAxis) weatherChart.getYAxis();
        switch (weatherParameter) {
            case TEMPERATURE:
                yAxis.setLabel("Temperature (°C)");
                break;
            case WINDSPEED:
                yAxis.setLabel("Wind Speed (m/s)");
                break;
            case HUMIDITY:
                yAxis.setLabel("Humidity (%)");
                break;
        }

        // Remove numerical values from x-axis
        NumberAxis xAxis = (NumberAxis) weatherChart.getXAxis();
        xAxis.setTickLabelFormatter(new NumberAxis.DefaultFormatter(xAxis) {
            @Override
            public String toString(Number object) {
                return "";
            }
        });
    }

    private boolean initApis() {
        FMIApi fmiApi = new FMIApi(place, weatherParameter, startDateTime, endDateTime);

        String apiUrl = fmiApi.buildUrl();
        String message = "Generated API URL: " + apiUrl;
        System.out.println(message);
        OpenMeteoAPI openMeteoAPI = new OpenMeteoAPI(place, weatherParameter, startDateTime, endDateTime);
        String OM_apiUrl = openMeteoAPI.buildUrl();
        message = "Generated Open-Meteo API URL: " + OM_apiUrl;
        System.out.println(message);
        message = "Fetching weather data for " + place + " between dates " + startDateTime + " and " + endDateTime;
        System.out.println(message);

        fmiApi.fetchTemperatureData();
        openMeteoAPI.fetchWeatherData();

        List<Double> fmiValues = fmiApi.getWeatherValues();
        List<Double> openMeteoValues = openMeteoAPI.getWeatherValues();

        // Check if the fetched data is empty, inform user which api failed
        if (fmiValues.isEmpty() && openMeteoValues.isEmpty()) {
            Platform.runLater(() -> displayBanner("Failed to fetch data from both APIs."));
            return false;
        } else if (fmiValues.isEmpty()) {
            Platform.runLater(() -> displayBanner("Failed to fetch data from FMI API."));
            return false;
        } else if (openMeteoValues.isEmpty()) {
            Platform.runLater(() -> displayBanner("Failed to fetch data from Open-Meteo API."));
            return false;
        }

        populateChart(fmiValues, openMeteoValues);

        return true;
    }

    private void saveSettings() {
        Settings newSettings = new Settings(place, weatherParameter, startDateTime, endDateTime);
        List<Settings> settingsList = new ArrayList<>();

        try {
            File file = new File("weather_settings.json");
            if (file.exists()) {
                settingsList = Settings.loadFromJson("weather_settings.json");
            }
        } catch (IOException e) {
            System.out.println("Error loading existing settings, continuing with a new list.");
        }

        // Remove existing settings for the same place (case-insensitive)
        settingsList.removeIf(existingSettings -> existingSettings.getPlace().equalsIgnoreCase(newSettings.getPlace()));
        // Add new settings to the end of the list
        settingsList.add(newSettings);

        // Save updated settings list to JSON file
        Settings.saveToJson("weather_settings.json", settingsList);

        loadPlacesIntoComboBox(false);

        comboBox.setValue(newSettings.getPlace());
    }

    @FXML
    public void initialize() {
        radioButtonTemp.setToggleGroup(measurementGroup);
        radioButtonWind.setToggleGroup(measurementGroup);
        radioButtonHumid.setToggleGroup(measurementGroup);

        searchField.textProperty().addListener((observable, oldValue, newValue) -> validateInputs());
        startDatePicker.valueProperty().addListener((observable, oldValue, newValue) -> validateInputs());
        endDatePicker.valueProperty().addListener((observable, oldValue, newValue) -> validateInputs());
        measurementGroup.selectedToggleProperty().addListener((observable, oldValue, newValue) -> validateInputs());

        loadPlacesIntoComboBox(true);

        comboBox.valueProperty().addListener((observable, oldValue, newValue) -> {
            if (newValue != null && !newValue.trim().isEmpty()) {
                searchField.setText(newValue);
                loadSettingsForPlace(newValue);
            }
        });
    
        validateInputs();
    }

    private void loadPlacesIntoComboBox(boolean showMessage) {
        File file = new File("weather_settings.json");
        if (!file.exists()) {
            return;
        }

        try {
            List<Settings> allSettings = Settings.loadFromJson("weather_settings.json");
            List<String> places = new ArrayList<>();
            for (Settings settings : allSettings) {
                places.add(settings.getPlace());
            }
            places.sort(String::compareToIgnoreCase);
            comboBox.setItems(FXCollections.observableArrayList(places));
    
            // Load the last viewed location
            if (!allSettings.isEmpty()) {
                Settings lastViewedSettings = allSettings.get(allSettings.size() - 1);
                loadSettingsForPlace(lastViewedSettings.getPlace());
                if (showMessage) displayBanner("Loaded last viewed location: " + lastViewedSettings.getPlace());
            }
        } catch (IOException e) {
            System.out.println("Error loading places from JSON file.");
            e.printStackTrace();
        }
    }

    private void loadSettingsForPlace(String place) {
        try {
            List<Settings> allSettings = Settings.loadFromJson("weather_settings.json");
            for (Settings settings : allSettings) {
                if (settings.getPlace().equals(place)) {
                    this.place = settings.getPlace();
                    this.weatherParameter = settings.getWeatherParameter();
                    this.startDateTime = settings.getStartDateTime();
                    this.endDateTime = settings.getEndDateTime();
    
                    searchField.setText(this.place);
                    setDates(this.startDateTime, this.endDateTime);
                    measurementGroup.selectToggle(getToggleName(this.weatherParameter));
    
                    displayBanner("Loaded settings for: " + this.place);
                    break;
                }
            }
        } catch (IOException e) {
            System.out.println("Error loading settings for place: " + place);
            e.printStackTrace();
        }
    }

    public void validateInputs() {
        boolean isSearchFieldEmpty = searchField.getText() == null || searchField.getText().trim().isEmpty();
        boolean isStartDatePickerEmpty = startDatePicker.getValue() == null;
        boolean isEndDatePickerEmpty = endDatePicker.getValue() == null;
        boolean isMeasurementGroupEmpty = measurementGroup.getSelectedToggle() == null;

        // make a boolean for searchbutton to be disabled if the start and end date time are more than 7 days apart
        boolean isDateRangeTooLong = false;
        if (startDatePicker.getValue() != null && endDatePicker.getValue() != null) {
            LocalDate startDate = startDatePicker.getValue();
            LocalDate endDate = endDatePicker.getValue();
            isDateRangeTooLong = startDate.plusDays(6).isBefore(endDate);
        }
        
        if (isDateRangeTooLong) {
            displayBanner("Due to FMI API limitations, the date range must be under 7 days.");
        }
        
        searchButton.setDisable(isSearchFieldEmpty || isStartDatePickerEmpty || isEndDatePickerEmpty || isMeasurementGroupEmpty || isDateRangeTooLong);
    }

    public void onClearHistoryClicked(ActionEvent actionEvent) {
        try {
            Path settingsFile = Paths.get("weather_settings.json");
            Files.delete(settingsFile);
            System.out.println("File deleted successfully.");
            recentPlaces.clear();
            comboBox.setItems(recentPlaces);
            clearHistoryButton.setDisable(true);

            displayBanner("History deleted");

        } catch (IOException e) {
            System.out.println("Failed to delete the file: " + e.getMessage());
            displayBanner("Failed to delete the history file");
        }
    }

    public void displayBanner(String message) {
        Platform.runLater(() -> {
            banner.setVisible(true);

            banner.setText(message);

            FadeTransition fadeIn = new FadeTransition(Duration.seconds(0.5), banner);
            fadeIn.setFromValue(0);
            fadeIn.setToValue(1);

            // Fade out effect after a delay
            FadeTransition fadeOut = new FadeTransition(Duration.seconds(0.5), banner);
            fadeOut.setFromValue(1);
            fadeOut.setToValue(0);

            // Set up the timeline for the fade out
            fadeOut.setDelay(Duration.seconds(4)); // Delay before starting fade out

            fadeIn.play(); // Play fade-in effect
            fadeIn.setOnFinished(event -> fadeOut.play()); // Start fade-out after fade-in finishes

            // Hide the banner after fade-out completes
            fadeOut.setOnFinished(event -> banner.setVisible(false));
        });
    }

    public void setStageAndScene(Stage stage) {
        this.stage = stage;
    }

    public void setDates(String startDate, String endDate) {
        startDatePicker.setValue(LocalDate.parse(startDate));
        endDatePicker.setValue(LocalDate.parse(endDate));
    }

    public void onTodayButtonClicked(ActionEvent actionEvent) {
        startDatePicker.setDisable(true);
        endDatePicker.setDisable(true);
        LocalDate today = LocalDate.now();
        String formattedDate = today.format(INPUT_FORMATTER);
        startDateTime = formattedDate;
        endDateTime = formattedDate;
        setDates(startDateTime, endDateTime);
    }

    public void onLastWeekButtonClicked(ActionEvent actionEvent) {
        startDatePicker.setDisable(true);
        endDatePicker.setDisable(true);
        LocalDate today = LocalDate.now();
        LocalDate weekAgo = today.minusDays(6);
        String formattedStart = weekAgo.format(INPUT_FORMATTER);
        String formattedEnd = today.format(INPUT_FORMATTER);
        startDateTime = formattedStart;
        endDateTime = formattedEnd;
        setDates(startDateTime, endDateTime);
    }

    public void onCustomButtonClicked(ActionEvent actionEvent) {
        startDatePicker.setDisable(false);
        endDatePicker.setDisable(false);
    }
}