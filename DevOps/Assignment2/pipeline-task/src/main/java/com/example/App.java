package com.example;

import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpExchange;
import org.json.JSONArray;
import org.json.JSONObject;
import java.io.*;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

public class App 
{
    public static void main( String[] args ) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress(8199), 0);
        server.createContext("/", App::handle);
        server.setExecutor(null);
        server.start();
        System.out.println("Listening on 8199");
    }
    
    private static void handle(HttpExchange ex) throws IOException {
        if(!"POST".equalsIgnoreCase(ex.getRequestMethod())) {
            ex.sendResponseHeaders(405, -1);
            return;
        }
        String body;
        try (InputStream is = ex.getRequestBody()) {
            body = new BufferedReader(new InputStreamReader(is, StandardCharsets.UTF_8))
                .lines().collect(Collectors.joining("\n"));
        }
        try {
            JSONObject obj = new JSONObject(body);
            JSONArray arr = obj.getJSONArray("numbers");
            double sum = 0;
            for(int i = 0; i < arr.length(); i++) sum += arr.getDouble(i);
            int avg = (int)Math.floor(sum / arr.length());
            byte[] out = String.valueOf(avg).getBytes(StandardCharsets.UTF_8);
            ex.getResponseHeaders().add("Content-Type", "text/plain");
            ex.sendResponseHeaders(200, out.length);
            try(OutputStream os = ex.getResponseBody()) { os.write(out); }
        } catch (Exception e) {
            ex.sendResponseHeaders(400, -1);
        }
    }
}
