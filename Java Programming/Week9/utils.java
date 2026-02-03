package fi.tuni.prog3.weatherapp;

import javafx.animation.FadeTransition;
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.stage.Stage;
import javafx.scene.layout.VBox;
import javafx.scene.control.Label;
import javafx.scene.layout.BorderPane;
import javafx.stage.Stage;
import javafx.util.Duration;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

public class utils {

    //Haetaan seuraavien päivien nimet
    public static List<String> getNextSevenDays() {
        List<String> days = new ArrayList<>();
        SimpleDateFormat sdf = new SimpleDateFormat("EEE"); // "EEE" tuottaa lyhyen viikonpäivän, esim. "Sun"
        Calendar calendar = Calendar.getInstance(); // Saadaan nykyinen päivämäärä ja aika
        calendar.add(Calendar.DATE, 1); // Siirrytään huomiseen päivään ennen listauksen aloittamista
        // Lisätään listaan seuraavat seitsemän päivää
        for (int i = 0; i < 7; i++) {
            days.add(sdf.format(calendar.getTime()));
            calendar.add(Calendar.DATE, 1); // Siirrytään seuraavaan päivään
        }

        return days;
    }

    public void main(String[] args) {
        List<String> nextSevenDays = getNextSevenDays();
        for (String day : nextSevenDays) {
            System.out.println(day);
        }
    }

    //Haetaan säätä vastaava sääikonin polku
    public static String getWeatherIcon(String weatherCondition) {
        String iconPath = "";
        if (weatherCondition.equals("Thunderstorm")){
            iconPath = "/icons/storm.png";
        }else if(weatherCondition.equals("Drizzle")){
            iconPath = "/icons/drizzle.png";
        }else if(weatherCondition.equals("Rain")){
            iconPath = "/icons/rainy.png";
        }else if(weatherCondition.equals("Snow")){
            iconPath = "/icons/cold.png";
        }else if(weatherCondition.equals("Clear")){
            iconPath = "/icons/sunny.png";
        }else{
            iconPath = "/icons/cloudy.png";
        }
        return iconPath;
    }

    //Showing an alert text if searched something else than a finnish city name
    public static void showFadeAlert(VBox rootPane, String message){

        Label alertLabel = new Label(message);
        alertLabel.setStyle("-fx-text-fill: white; "+"-fx-font-size: 14px; "+"-fx-font-weight: bold;");
        alertLabel.setOpacity(0);  // Aluksi näkymätön

        FadeTransition fadeIn = new FadeTransition(Duration.seconds(2), alertLabel);
        fadeIn.setFromValue(0);
        fadeIn.setToValue(1);
        fadeIn.setCycleCount(1);

        FadeTransition fadeOut = new FadeTransition(Duration.seconds(2), alertLabel);
        fadeOut.setFromValue(1);
        fadeOut.setToValue(0);
        fadeOut.setCycleCount(1);

        fadeIn.setOnFinished(event -> {
            fadeOut.setDelay(Duration.seconds(2));
            fadeOut.play();
        });

        rootPane.getChildren().add(alertLabel);
        fadeIn.play();
        }

}
