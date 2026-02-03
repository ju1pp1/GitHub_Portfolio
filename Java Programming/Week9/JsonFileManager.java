package fi.tuni.prog3.weatherapp;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.io.*;
import java.nio.file.*;
import java.util.Arrays;
import java.util.List;

public class JsonFileManager implements iReadAndWriteToFile {

    private static final String FILE_NAME = "WeatherData.json";
    private static final List<String> citiesInFinland = Arrays.asList(
        "Helsinki", "helsinki", "Espoo", "espoo", "Tampere", "tampere", "Vantaa", "vantaa", 
        "Oulu", "oulu", "Turku", "turku", "Jyväskylä", "jyväskylä", "Lahti", "lahti",
        "Kuopio", "kuopio", "Pori", "pori", "Joensuu", "joensuu", "Lappeenranta", "lappeenranta", 
        "Vaasa", "vaasa", "Kotka", "kotka", "Kouvola", "kouvola", "Rovaniemi", "rovaniemi", 
        "Seinäjoki", "seinäjoki", "Mikkeli", "mikkeli", "Hyvinkää", "hyvinkää", 
        "Porvoo", "porvoo", "Kajaani", "kajaani", "Rauma", "rauma", "Lohja", "lohja",
        "Kokkola", "kokkola", "Kerava", "kerava", "Salo", "salo", "Kirkkonummi", "kirkkonummi",
        "Imatra", "imatra", "Nokia", "nokia", "Savonlinna", "savonlinna", "Riihimäki", "riihimäki",
        "Vihti", "vihti", "Raasepori", "raasepori"
    );
    
    
    // Päivittää Json Fileen uusimman haetun kaupungin
    @Override
    public boolean writeToFile(String cityName) throws Exception {
        JsonObject cityObject = new JsonObject();
        cityObject.addProperty("lastSearchedCity", cityName);

        try (Writer writer = new FileWriter(FILE_NAME)) {
            new Gson().toJson(cityObject, writer);
            return true;
        } catch (IOException e) {
            throw new Exception("Error writing to file.", e);
        }
    }
    
    // Tarkistaa, että Json filen kaupunki on oikeellinen
    @Override
    public boolean isValidCity(String cityName) {
        return citiesInFinland.contains(cityName);
    }
    
    // Hakee JsonFilestä kaupungin, joka viimekäytön jälkeen oli viimeisenä haussa
    @Override
    public String getLastSearchedCity() throws Exception {
        try (BufferedReader reader = new BufferedReader(new FileReader(FILE_NAME))) {
            JsonObject jsonObject = new Gson().fromJson(reader, JsonObject.class);
            return jsonObject.get("lastSearchedCity").getAsString();
        } catch (IOException e) {
            throw new Exception("Failed to read last searched city from file.", e);
        }
    }

     // Tarkistetaan, että onko Json Fileä olemassa, jos ei ole niin luo uuden
    public void ensureFileExists() {
        Path path = Paths.get(FILE_NAME);
        if (!Files.exists(path)) {
            try {
                Files.createFile(path);
            } catch (IOException e) {
                System.out.println("Failed to create file: " + e.getMessage());
            }
        }
    }
}
