package fi.tuni.prog3.sevenzipsearch;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import org.apache.commons.compress.archivers.sevenz.SevenZArchiveEntry;
import org.apache.commons.compress.archivers.sevenz.SevenZFile;

public class SevenZipSearch {
    
    public static void main(String[] args) {
        try(BufferedReader reader = new BufferedReader(new InputStreamReader(System.in))) {
            System.out.println("File:");
            String filePath = reader.readLine().trim();
            System.out.println("Query:");
            String query = reader.readLine().trim();
            
            System.out.println();
            
            try(SevenZFile sevenZFile = new SevenZFile(new File(filePath))) {
                SevenZArchiveEntry entry;
                while((entry = sevenZFile.getNextEntry()) != null) {
                    if(!entry.isDirectory() && entry.getName().toLowerCase().endsWith(".txt")) {
                        System.out.println(entry.getName());
                        searchInTextFile(sevenZFile.getInputStream(entry), query);
                        System.out.println();
                    }
                }
            }
        } catch(IOException e) {
            e.printStackTrace();
        }
    }
    
    private static void searchInTextFile(InputStream inputStream, String query) throws IOException {
        try(BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))) {
            String line;
            int lineNumber = 1;
            while((line = reader.readLine()) != null) {
                if(line.toLowerCase().contains(query.toLowerCase())) {
                    line = line.replaceAll("(?i)" + query, query.toUpperCase());
                    System.out.println(lineNumber + ": " + line);
                }
                lineNumber++;
            }
        }
    }
}
