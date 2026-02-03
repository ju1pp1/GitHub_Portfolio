import fi.tuni.prog3.comparison.Attainment;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;

public class ComparisonTest {
  // Quick hack by Jorma L. to avoid a non-standard toString override in Attainment.
  private static void print(String header, ArrayList<Attainment> attainments) {
     System.out.println(header);
     String asLines = attainments.toString().replace(",", "\n,");
     asLines = asLines.replace("]", "\n]");
     System.out.println(asLines);
  }     
  
  public static void main(String[] args) throws IOException {
    String attainmentFN = args[0];
    ArrayList<Attainment> attainments = new ArrayList<>();
    try(var file = new BufferedReader(new FileReader(attainmentFN))) {
      String line;
      while((line = file.readLine()) != null) {
        String[] studentCourseGrade = line.split(" ", 3);
        attainments.add(new Attainment(studentCourseGrade[1],
                studentCourseGrade[0], Integer.parseInt(studentCourseGrade[2])));
      }
    }
    print("Original order:", attainments);
    Collections.sort(attainments);
    print("Sorted in default order:", attainments);
    attainments.sort(Attainment.CODE_GRADE_CMP);
    print("Sorted using CODE_GRADE_CMP:", attainments);
    attainments.sort(Attainment.CODE_STUDENT_CMP);
    print("Sorted using CODE_STUDENT_CMP:", attainments);
  }

}
