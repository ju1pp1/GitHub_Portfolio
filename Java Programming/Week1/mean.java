import java.util.Scanner;

public class MeanTask {
    
    public static void main(String[] args) {
        //System.out.print("Hello world");
        System.out.println("Enter numbers:");
        
        Scanner myScanner = new Scanner(System.in);
        
        String line = myScanner.nextLine();
        String[] numbers = line.split(" ");
        double sum = 0;
        
        for(int i = 0; i < numbers.length; i++) {
            
            //System.out.println(i + ": " + numbers[i]);
            double x = Double.parseDouble(numbers[i]);
            sum += x;
            
        }
        //System.out.println(sum);
        double mean = sum / numbers.length;
        System.out.println("Mean: " + mean);
        
    }
}
