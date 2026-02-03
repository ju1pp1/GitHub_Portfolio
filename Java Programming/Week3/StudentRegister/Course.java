package fi.tuni.prog3.studentregister;

/**
 *
 * @author sdjean
 */
public class Course {
    //Tallettaa kurssin koodin, nimen ja laajuuden
    //Julkiset rakentimet/jäsenfunktiot:
    //Rakennin Course(String code, String name, int credits)
    //Jäsenfunktiot getCode(), getName(), getCredits()
    private String code;
    private String name;
    private int credits;
    
    public Course(String code, String name, int credits) {
        this.code = code;
        this.credits = credits;
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

    public int getCredits() {
        return credits;
    }
    
}
