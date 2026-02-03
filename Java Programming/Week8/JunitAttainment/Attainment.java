package fi.tuni.prog3.junitattainment;

/**
 *
 * @author sdjean
 */

public class Attainment implements Comparable<Attainment> {
    private String courseCode;
    private String studentNumber;
    private int grade;
    
    public Attainment(String courseCode, String studentNumber, int grade) {
        if(courseCode == null || studentNumber == null || grade < 0 || grade > 5) {
            throw new IllegalArgumentException("Invalid output parameters");
        }
        this.courseCode = courseCode;
        this.studentNumber = studentNumber;
        this.grade = grade;
    }
    
    //Getters
    public String getCourseCode() {
        return courseCode;
    }
    
    public String getStudentNumber() {
        return studentNumber;
    }
    
    public int getGrade() {
        return grade;
    }
    
    //compareTo method implementation
    @Override
    public int compareTo(Attainment other) {
        
        //First compare by student numbers
        int studentNumberComparison = this.studentNumber.compareTo(other.studentNumber);
        if(studentNumberComparison != 0) {
            return studentNumberComparison;
        }
        
        //if student numbers are equal, compare by course codes
        int courseCodeComparison = this.courseCode.compareTo(other.courseCode);
        if(courseCodeComparison != 0) {
            return courseCodeComparison;    
        }
        //Finally compare by grades
        
        int gradeComparison = Integer.compare(this.grade, other.grade);
        if(gradeComparison != 0) {
            return gradeComparison;
        }
        return 0;
    }
    
    //toString method implementation
    @Override
    public String toString() {
        return courseCode + " " + studentNumber + " " + grade;
    }
}
