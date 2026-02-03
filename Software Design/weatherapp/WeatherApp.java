package com.weatherapp;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

import java.io.IOException;

public class WeatherApp extends Application {

    @Override
    public void start(Stage stage) throws IOException {

        FXMLLoader weatherLoader = new FXMLLoader(getClass().getResource("weather-view.fxml"));
        VBox root1 = weatherLoader.load();
        Scene mainScene = new Scene(root1, 1200, 800);

        // Get the controller instances
        AppController appController = weatherLoader.getController();

        // Set the stage and scenes in the controller
        appController.setStageAndScene(stage);

        stage.setTitle("Weather App");
        stage.setScene(mainScene);
        stage.show();
    }

    public static void main(String[] args) {
        launch();
    }
}