
import java.util.ArrayList;
import java.util.Scanner;

public class MedianTask {
    public static void main(String[] args) {
        System.out.println("Enter numbers:" );
        Scanner myScanner = new Scanner(System.in);
        
        String line = myScanner.nextLine();
        String[] numbers = line.split(" ");
        
        ArrayList<Double> numberArray = new ArrayList<>();
        
        for(int i = 0; i < numbers.length; i++) {
        double x = Double.parseDouble(numbers[i]);
        numberArray.add(x);
        
        }
        
        numberArray.sort(null);
        //Calculate median
        double median;
        
        //Size of array is here
        int size = numberArray.size();
        
        if(size % 2 == 0) {
            median = (numberArray.get(size / 2 - 1) + numberArray.get(size / 2)) / 2.0;
        } else {
            median = numberArray.get(size / 2);
        }
        System.out.print("Median: " + median);
    }
}
