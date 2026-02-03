package fi.tuni.prog3.weatherapp;

import com.google.gson.JsonArray;

import javafx.application.Application;
import javafx.application.Platform;
import javafx.event.ActionEvent;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.geometry.Rectangle2D;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.StackPane;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;
import javafx.scene.chart.LineChart;
import javafx.scene.chart.XYChart;
import javafx.scene.chart.NumberAxis;
import javafx.scene.chart.CategoryAxis;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;

/**
 * JavaFX Weather Application.
 */
public class WeatherApp extends Application {

    // global variables

    BorderPane root = new BorderPane();

    ImageView imageView = new ImageView();

    private XYChart.Series<String, Number> series;
    private LineChart<String, Number> lc;
   
    private NumberAxis yAxis;

    private Label tempLabel = new Label("0°C");
    private Label humidityLabel = new Label("Humidity: 0%");
    private Label windLabel = new Label("Wind: 0m/s");
    private Label cityLabel = new Label("");

    VBox centerVBox = new VBox(10);

    TextField locationTextField = new TextField();

    VBox topVBox = new VBox();

    // Haetaan iAPI rajapinnasta WeatherAPI.
    private iAPI weatherAPI;

    private ArrayList<String> nextSevenDays = new ArrayList<String>();

    // LISÄTTY: iReadAndWriteToFile rajapinnasta haetaan JsonFileManager.
    private iReadAndWriteToFile jsonfileManager;

    @Override
    public void start(Stage stage) {

        //Haetaan seuraavat päivät ja tallennetaan muuttujaan
        for (String day : utils.getNextSevenDays()) {
            nextSevenDays.add(day);
        }

        //Alustetaan forecast-graph
        final CategoryAxis xAxis = new CategoryAxis();
        xAxis.setLabel("Day");
        xAxis.getCategories().addAll(nextSevenDays.get(0), nextSevenDays.get(1),
                nextSevenDays.get(2));
        yAxis = new NumberAxis("Temp", 0, 0, 0);
        lc = new LineChart<>(xAxis, yAxis);
        lc.setTitle("Forecast");
        lc.setStyle("-fx-background-color: lightgray; ");
        lc.setCreateSymbols(false);
        lc.setLegendVisible(false);
        lc.setAnimated(false);
        series = new XYChart.Series<>();
        lc.getData().add(series);
        

        // Haetaan WeatherAPI käytettäväksi.
        weatherAPI = new WeatherAPI();
        // Haetaan jsonfileMManager käytettäväksi.
        jsonfileManager = new JsonFileManager();
        ((JsonFileManager) jsonfileManager).ensureFileExists();
        // TÄSSÄ TARKISTETAAN, ETTÄ ONKO JSON FILESSÄ EDELLISTÄ HAKUA
        // TARVITSEE IMPLEMENTOIDA TIETOJEN HAKU JA PRINTTAUS
        try {
            String lastCity = jsonfileManager.getLastSearchedCity();
            if (lastCity != null && !lastCity.isEmpty() && jsonfileManager.isValidCity(lastCity)) {
                locationTextField.setText(lastCity);
                fetchWeather();
            }
        } catch (Exception e) {
            // Ei tehdä mitään, jos ei löydy dataa tai kaupunki ei ole validi
        }


        //Taustakuvan asetus
        Image image = new Image(getClass().getResourceAsStream("/icons/bg.jpg")); // Korvaa 'taustakuva.jpg' polulla kuvaan
        ImageView imageView = new ImageView(image);
        imageView.setFitHeight(900);
        imageView.setPreserveRatio(true);
        root.getChildren().add(imageView);

        // Creating a new BorderPane.
        topVBox.getStyleClass().add("vbox");

        root.setPadding(new Insets(10, 10, 10, 10));

        // Adding HBox to the center of the BorderPane.
        root.setCenter(getCenterVBox());

        Scene scene = new Scene(root, 500, 900);
        scene.getStylesheets().add(getClass().getResource("/style.css").toExternalForm());
        stage.setScene(scene);
        stage.setTitle("WeatherApp");

        stage.show();
    }

    public static void main(String[] args) {
        launch();
    }

    

    private VBox getCenterVBox() {

        // Lisätty UI elementtejä (TextField ja nappeja)
        Label locationLabel = new Label("Enter finnish city name:");
        locationLabel.setStyle("-fx-text-fill: white; "+"-fx-font-size: 14px; "+"-fx-font-weight: bold;");

        Button fetchButton = new Button("Fetch Weather");

        // Tapahtumakäsittelijä nykyisen sään hakemiseen.
        fetchButton.setOnAction(event -> {
            fetchWeather();
        });

        // Adding two VBox to the HBox.
        centerVBox.getChildren().addAll(getTopVBox(), getBottomHBox(), locationLabel, locationTextField, fetchButton);

        return centerVBox;
    }

    // Näyttää temperature arvon
    public VBox tempBox() {
        VBox subVBox = new VBox();
        subVBox.setPrefHeight(5);
        subVBox.setPrefHeight(10);
        tempLabel.setId("headerLabel");
        tempLabel.setStyle("-fx-font-size: 48px;");
        subVBox.getChildren().add(imageView);
        subVBox.getChildren().add(tempLabel);
        subVBox.setAlignment(Pos.CENTER);
        subVBox.setMargin(tempLabel, new Insets(10.0d));
        subVBox.setMargin(imageView, new Insets(10.0d));
        return subVBox;
    }

    // Näyttää additionaaliset sääarvot
    private HBox infoBox() {
        HBox info = new HBox();
        info.setPrefHeight(4);
        info.setPrefWidth(10);

        info.getChildren().add(humidityLabel);
        info.getChildren().add(windLabel);
        humidityLabel.setId("headerLabel");
        windLabel.setId("headerLabel");
        humidityLabel.setStyle("-fx-font-size: 14px;");
        windLabel.setStyle("-fx-font-size: 14px;");
        info.setAlignment(Pos.CENTER);
        info.setMargin(humidityLabel, new Insets(20.0d));
        info.setMargin(windLabel, new Insets(20.0d));
        return info;
    }

    // Creating a container for top elements
    public VBox getTopVBox() {

        topVBox.setPrefHeight(330);

        var temp = tempBox();
        var info = infoBox();

        cityLabel.setId("headerLabel");
        cityLabel.setStyle("-fx-font-size: 24px;");

        topVBox.getChildren().add(cityLabel);
        topVBox.getChildren().add(temp);
        topVBox.getChildren().add(info);
        topVBox.setMargin(temp, new Insets(10.0d));
        topVBox.setMargin(cityLabel, new Insets(10.0d));
        topVBox.setStyle("-fx-background-color: rgba(255, 255, 255, 0.5); " +
              "-fx-border-radius: 10px; " +
              "-fx-background-radius: 10px; " +
              "-fx-padding: 10px;");
        return topVBox;
    }


    // Creating a container for the forecast graph
    private HBox getBottomHBox() {
        HBox forecastBox = new HBox();
        forecastBox.setPrefHeight(200);
        //forecastBox.setStyle("-fx-background-color: #b1c2d4;");
        forecastBox.setStyle("-fx-background-color: rgba(255, 255, 255, 0.5); " +
              "-fx-border-radius: 10px; " +
              "-fx-background-radius: 10px; " +
              "-fx-padding: 10px;");
        forecastBox.getChildren().add(lc);
        return forecastBox;
    }
    
    // Tapahtumakäsittelijä ennustettavan sään hakemiseen.
    private void fetchForecast() {
        String location = locationTextField.getText();
        
        try {
            String locationInfo = weatherAPI.lookUpLocation(location);
            String[] coordinates = locationInfo.split(",");
            double latitude = Double.parseDouble(coordinates[0]);
            double longitude = Double.parseDouble(coordinates[1]);
            JsonArray forecast = weatherAPI.getForecast(latitude, longitude);

            double temp1 = forecast.get(0).getAsJsonObject().get("temp").getAsDouble();
            double temp2 = forecast.get(1).getAsJsonObject().get("temp").getAsDouble();
            double temp3 = forecast.get(2).getAsJsonObject().get("temp").getAsDouble();

            double maxTemp = 1.0;
            double minTemp = 0.0;

            // logic to find max and min values for y-axis
            if (temp1 > temp2) {
                maxTemp = temp1;
            } else if (temp3 > temp1) {
                maxTemp = temp3;
            } else {
                maxTemp = temp2;
            }

            if (temp1 < temp2) {
                minTemp = temp1;
            } else if (temp3 < temp1) {
                minTemp = temp3;
            } else {
                minTemp = temp2;
            }

            long roundedMax = Math.round(maxTemp);
            long roundedMin = Math.round(minTemp);
            roundedMax += 5;
            roundedMin -= 5;

            yAxis.setLowerBound(roundedMin);
            yAxis.setUpperBound(roundedMax);
            //yAxis.setTickUnit((roundedMax - roundedMin) / 10);
            yAxis.setTickUnit(Math.abs((roundedMax - roundedMin)) / 10);

            series.getData().clear();  // Tyhjennä vanha data
            
            series.getData().add(new XYChart.Data<>(nextSevenDays.get(0), temp1));
            series.getData().add(new XYChart.Data<>(nextSevenDays.get(1), temp2));
            series.getData().add(new XYChart.Data<>(nextSevenDays.get(2), temp3));

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // logiikka tämän hetkisen sääsijainnin hakemiseen, myös kutsuu ennustetta
    // lopuksi.
    private void fetchWeather() {
        String location = locationTextField.getText();
        try {
            // TARKISTETAAN ONKO KIRJOITETTU KAUPUNKI OIKEIN JA JOS ON
            // NIIN TALLENNETAAN SE JSON FILEEN VIIMEISIMMÄKSI HAETUKSI
            // KAUPUNGIKSI
            if (jsonfileManager.isValidCity(location)) {
                jsonfileManager.writeToFile(location);
                // Hae sijainnin koordinaatit.
                String locationInfo = weatherAPI.lookUpLocation(location);
                String[] coordinates = locationInfo.split(",");
                // double[] coordinates = weatherAPI.getCoordinates(location);
                double latitude = Double.parseDouble(coordinates[0]);
                double longitude = Double.parseDouble(coordinates[1]);

                // Hae säätiedot koordinaattien perusteella.
                WeatherAPI.WeatherData currentWeather = weatherAPI.getCurrentWeather(latitude, longitude);

                String tempString = String.format("%.1f°C", currentWeather.getTemperature());
                String windString = String.format("Wind: %.1fm/s", currentWeather.getWindSpeed());
                String humString = String.format("Humidity: %d%%", currentWeather.getHumidity());

                tempLabel.setText(tempString);
                windLabel.setText(windString);
                humidityLabel.setText(humString);
                cityLabel.setText(location);
                imageView.setImage(
                        new Image(getClass().getResourceAsStream(utils.getWeatherIcon(currentWeather.getWeatherMain())),
                                200.0d, 200.0d, true, true));

                fetchForecast();

            }

            // JOS KAUPUNKIA EI LÖYDY TULOSTAA VIRHEILMOITUKSEN, ja näyttää alertin
            else {
                System.out.println("Error: Haettua kaupunkia ei löydy!");
                utils.showFadeAlert(centerVBox, "Please search from Finnish city names.");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //Should this be implemented?
    public Button getQuitButton() {
        // Creating a button.
        Button button = new Button("quit");

        // Adding an event to the button to terminate the application.

        button.setOnAction((ActionEvent event) -> {
            Platform.exit();
        });

        return button;
    }
}
