package fi.tuni.prog3.junitattainment;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 *
 * @author sdjean
 */
public class AttainmentTest {
    
    public AttainmentTest() {
    }

    @Test
    public void testConstructorAndGetters() {
        Attainment attainment = new Attainment("CS101", "S123456", 3);
        assertEquals("CS101", attainment.getCourseCode());
        assertEquals("S123456", attainment.getStudentNumber());
        assertEquals(3, attainment.getGrade());
    }
    
    @Test
    public void testConstructorWithInvalidParameters() {
        assertThrows(IllegalArgumentException.class, () -> {
            new Attainment(null, "S123456", 3);
        });

        assertThrows(IllegalArgumentException.class, () -> {
            new Attainment("CS101", null, 3);
        });

        assertThrows(IllegalArgumentException.class, () -> {
            new Attainment("CS101", "S123456", -1);
        });

        assertThrows(IllegalArgumentException.class, () -> {
            new Attainment("CS101", "S123456", 6);
        });
    }
    
    @Test
    public void testToString() {
        Attainment attainment = new Attainment("CS101", "S123456", 3);
        assertEquals("CS101 S123456 3", attainment.toString());
    }
    
    @Test
    public void testCompareTo() {
        Attainment attainment1 = new Attainment("CS101", "S123456", 3);
        Attainment attainment2 = new Attainment("CS101", "S123457", 3);
        Attainment attainment3 = new Attainment("CS101", "S123457", 3);

        assertTrue(attainment1.compareTo(attainment2) < 0);
        assertTrue(attainment2.compareTo(attainment1) > 0);
        assertEquals(0, attainment2.compareTo(attainment3));
    }
    
}
