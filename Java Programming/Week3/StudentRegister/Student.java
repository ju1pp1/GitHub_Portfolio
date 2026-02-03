package fi.tuni.prog3.studentregister;

/**
 *
 * @author sdjean
 */
public class Student {
    //Tallettaa opiskelijan nimen ja opiskelijanumeron
    //Julkiset rakentimet/jäsenfunktiot:
    //Rakennin Student(String name, String studentNumber)
    //getName() ja getStudentNumber() palauttaa nimen ja opiskelijanron Stringeinä
    
    private String name;
    private String studentNumber;
    
    public Student(String name, String studentNumber) {
        this.name = name;
        this.studentNumber = studentNumber;
    }

    public String getName() {
        return name;
    }

    public String getStudentNumber() {
        return studentNumber;
    }
    
}
