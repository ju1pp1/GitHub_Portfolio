package fi.tuni.prog3.studentregister;

/**
 *
 * @author sdjean
 */
public class Attainment {
    //Kuvaa kurssisuorituksen tallettamalla kurssikoodin, opiskelijanumeron ja arvosanan
    //Julkiset rakentimet/funktiot:
    //Rakennin Attainment(String courseCode, String studentNumber, int grade)
    //Jäsenfunktiot getCourseCode(), getStudentNumber() ja getGrade()
    
    private String courseCode;
    private String studentNumber;
    private int grade;
    
    public Attainment(String courseCode, String studentNumber, int grade) {
        this.courseCode = courseCode;
        this.grade = grade;
        this.studentNumber = studentNumber;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public String getStudentNumber() {
        return studentNumber;
    }

    public int getGrade() {
        return grade;
    }
    
}
