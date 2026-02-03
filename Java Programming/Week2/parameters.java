
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.TreeSet;

public class ParametersTask {
    
    private static String readCommand(BufferedReader input) throws IOException {
        return input.readLine();
        }
    
    private static void printHeader(int length) {
    StringBuilder header = new StringBuilder("#");
    for(int i = 0; i < length; i++) {
        header.append("#");
    }
    System.out.println(header);
    }
    
    private static void printSeparator(int length) {
    StringBuilder separator = new StringBuilder("-");
    for(int i = 0; i < length; i++) {
        separator.append("-");
    }
    System.out.print(separator);
    }
    
    public static void main(String[] args) throws IOException {
        System.out.println("Parameters:");
        BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
        String line;
        TreeSet<String> inputTree = new TreeSet<>();
        int runningNumber = 0;
        
        while((line = readCommand(input)) != null && !line.isEmpty()) {
        inputTree.add(line);
        }
        
        int maxWordLength = 0;
        for(String inputMax : inputTree) {
            maxWordLength = Math.max(maxWordLength, inputMax.length());
        }
        int totalItems = inputTree.size();
        
        if(totalItems < 100) {
        printHeader(maxWordLength + 8);
        } else {
        printHeader(maxWordLength + 9);
        }
        for(var inputti : inputTree) {
            runningNumber += 1;
            
            if(totalItems < 100) {
                
        System.out.printf("#%3d | %-"+ (maxWordLength + 1) + "s#\n", runningNumber, inputti);
        if(runningNumber < totalItems) {
        System.out.printf("#----+");
        printSeparator(maxWordLength + 1);
        System.out.println("#");
        }
        }
            else {
            System.out.printf("#%4d | %-"+ (maxWordLength + 1) + "s#\n", runningNumber, inputti);
            if(runningNumber < totalItems) {
        System.out.printf("#-----+");
        printSeparator(maxWordLength + 1);
        System.out.println("#");
        }
            }
        /*    
        if(runningNumber < totalItems) {
        System.out.printf("#----+");
        printSeparator(maxWordLength + 2);
        System.out.println("#");
        } */
        }
        if(totalItems < 100) {
        printHeader(maxWordLength + 8);
        } else {
        printHeader(maxWordLength + 9);
        }
    }
}
