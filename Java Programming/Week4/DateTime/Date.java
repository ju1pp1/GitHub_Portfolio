package fi.tuni.prog3.datetime;

/**
 *
 * @author sdjean
 */
public class Date {
    private int year;
    private int month;
    private int day;
    
    public Date(int year, int month, int day) throws DateException {
        if(!isValidDate(year, month, day)) {
            throw new DateException("Illegal date " + day + "." + month + "." + year);
        }
        this.day = day;
        this.month = month;
        this.year = year;
    }

    public int getYear() {
        return year;
    }

    public int getMonth() {
        return month;
    }

    public int getDay() {
        return day;
    }
    
    @Override
    public String toString() {
        return String.format("%02d.%02d.%04d", day, month, year);
    }
    
    private boolean isValidDate(int year, int month, int day) {
        if(month < 1 || month > 12 || day < 1 || year < 1) {
            return false;
        } else {
            
            int maxDays = daysInMonth(year, month);
            return day <= maxDays;
            //return true;    
        }
        // Add logic to check if the date is valid (e.g., considering leap years)
        // You can refer to existing Java code or libraries for this validation
        
    }
    
    private int daysInMonth(int year, int month) {
        if(month == 2) {
            return (isLeapYear(year)) ? 29 : 28;
        } else if(month == 4 || month == 6 || month == 9 || month == 11) {
            return 30;
        } else {
            return 31;
        }
    }
    private boolean isLeapYear(int year) {
        return (year % 4 == 0 || (year % 100 != 0 || year % 400 == 0));
    }
}
