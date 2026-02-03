package fi.tuni.prog3.weatherapp;

/**
 * Interface with methods to write to a file and validate city names.
 */
public interface iReadAndWriteToFile {

    /**
     * Write data as JSON into the given file.
     * @param fileName name of the file to write to.
     * @return true if the write was successful, otherwise false.
     * @throws Exception if the method e.g., cannot write to a file.
     */
    public boolean writeToFile(String fileName) throws Exception;

    /**
     * Checks if the city name is on the valid cities list.
     * @param cityName the name of the city to validate.
     * @return true if the city name is valid, otherwise false.
     * @throws Exception if there is an error in checking the city.
     */
    public boolean isValidCity(String cityName) throws Exception;

    /**
     * Retrieves the name of the last searched city from the file.
     * @return the name of the last searched city if available.
     * @throws Exception if the file cannot be read or the city name is not available.
     */
    public String getLastSearchedCity() throws Exception;
}
