package fi.tuni.prog3.studentregister;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

/**
 *
 * @author sdjean
 */
public class StudentRegister {
    //Opintorekisteri joka ylläpitää tietoa opiskelijoista, kursseista ja kurssisuorituksista
    //Julkiset rakentimet/funktiot:
    //Rakennin StudentRegister() alustetaan tyhjä olio.
    //getStudents() palauttaa ArrayList<Student> listan jossa opintorekisterin  opiskelijat aakkosjärjestyksessä.
    //getCourses() palauttaa ArrayList<Course> listan jossa opintorekisterin kurssit aakkosjärjestyksessä.
    //addStudent(Student student) lisää opiskelijan rekisteriin.
    //addCourse(Course course) lisää kurssin rekisteriin.
    //addAttainment(Attainment att) lisää kurssisuorituksen rekisteriin
    //printStudentAttainments(String studentNumber, String order) tulostaa opiskelijanroa vastaavan opiskelijan kurssisuoritukset, order ilmaisee järjestyksen
    //Jos ei löydy niin tulosta: "Unknown student number: studentNumber"
    //Aluksi tulostetaan: "studentName (studentNumber):" 
    //sen jälkeen "  courseCode courseName: grade" huom kaks välilyöntiä alussa
    //Jos order on "by name", tulostetaan suoritukset kurssien nimien aakkosjärjestyksessä. käytä compareTo funktiota
    //Jos order on "by code", tulostetaan suoritukset kurssikoodien aakkosjärjestyksessä.
    //Muuten suoritukset tulostetaan siinä järjestyksessä kuin ne on lisätty opintorekisteriin: 
    //printStudentAttainments(String studentNumber): tulostaa parametrina saatua opiskelijanumeroa vastaavan opiskelijan kurssisuoritukset näytölle siinä järjestyksessä kuin ne on lisätty opintorekisteriin.
    
    private ArrayList<Student> students;
    private ArrayList<Course> courses;
    private ArrayList<Attainment> attainments;
    
    public StudentRegister() {
        this.attainments = new ArrayList<>();
        this.courses = new ArrayList<>();
        this.students = new ArrayList<>();
    }

    public ArrayList<Student> getStudents() {
        ArrayList<Student> sortedStudents = new ArrayList<>(students);
        Collections.sort(sortedStudents, Comparator.comparing(Student::getName));
        return sortedStudents;
    }

    public ArrayList<Course> getCourses() {
        ArrayList<Course> sortedCourses = new ArrayList<>(courses);
        Collections.sort(sortedCourses, Comparator.comparing(Course::getName));
        return sortedCourses;
    }
    
    public void addStudent(Student student) {
        students.add(student);
        //Helper to see if data is being loaded
        //System.out.println("Added student: " + student.getName() + " " + student.getStudentNumber());
    }
    
    public void addCourse(Course course) {
        courses.add(course);
        //Helper to see if data is being loaded
        //System.out.println("Added course: " + course.getCode() + " " + course.getName() + " " + course.getCredits());
    }
    
    public void addAttainment(Attainment att) {
        attainments.add(att);
        //Helper to see if data is being loaded
        //System.out.println("Added attainment: " + att.getStudentNumber() + " " + att.getCourseCode() + " " + att.getGrade());
    }
    
    public void printStudentAttainments(String studentNumber, String order) {
        boolean studentExists = false;
        for(Student student : students) {
            if(student.getStudentNumber().equals(studentNumber)) {
                studentExists = true;
                System.out.format("%s (%s):\n", student.getName(), student.getStudentNumber());
                
                ArrayList<Attainment> studentAttainments = new ArrayList<>();
                for(Attainment att : attainments) {
                    if (att.getStudentNumber().equals(studentNumber)) {
                        studentAttainments.add(att);
                    }
                }
                
                if(order.equals("by name")) {
                    Collections.sort(studentAttainments, Comparator.comparing(att -> getCourseName(att.getCourseCode())));
                } else if (order.equals("by code")) {
                    Collections.sort(studentAttainments, Comparator.comparing(Attainment::getCourseCode));
                }
                
                for(Attainment att : studentAttainments) {
                    System.out.format("  %s %s: %d\n", att.getCourseCode(), getCourseName(att.getCourseCode()), att.getGrade()); //att.getStudentNumber()
                }
                break;
            }
        }
        
        if(!studentExists) {
            System.out.format("Unknown student number: %s%n", studentNumber);
        }
    }
    
    public void printStudentAttainments(String studentNumber) {
        printStudentAttainments(studentNumber, "default");
    }
    
    //Helper method to get the name of the course based on its code
    private String getCourseName(String courseCode) {
        for(Course course : courses) {
            if(course.getCode().equals(courseCode)) {
                return course.getName();
            }
        }
        return "";
    }
}
