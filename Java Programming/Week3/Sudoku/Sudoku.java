
package fi.tuni.prog3.sudoku;

public class Sudoku {
    private char[][] grid;
    
    public Sudoku() {
        grid = new char[9][9];
        for(int i = 0; i < 9; i++) {
            for(int j = 0; j < 9; j++){
                grid[i][j] = ' ';
            }
        }
    }
    
    public void set(int i, int j, char c) {
        if(!isValidIndex(i, j)) {
            System.out.println("Trying to access illegal cell (" + i + ", " + j + ")!");
            return;
        }
        
        if(!isValidCharacter(c)) {
            System.out.println("Trying to set illegal character " + c + " to (" + i + ", " + j + ")!");
            return;
        }
        grid[i][j] = c;
    }
    
    public boolean check() {
        return checkRows() && checkColumns() && checkSubBlocks();
    }
    
    private boolean checkRows() {
        for(int i = 0; i < 9; i++) {
            if(!checkRow(i)) {
                return false;
            }
        }
        return true;
    }
    
    private boolean checkColumns() {
        for(int j = 0; j < 9; j++) {
            if(!checkColumn(j)) {
                return false;
            }
        }
        return true;
    }
    
    private boolean checkSubBlocks() {
        for(int i = 0; i < 9; i += 3) {
            for(int j = 0; j < 9; j += 3) {
                if(!checkSubBlock(i, j)) {
                    return false;
                }
            }
        }
        return true;
    }
    
    private boolean checkRow(int i) {
        return checkGroup(grid[i], "Row " + i + " has multiple");
    }
    
    private boolean checkColumn(int j) {
        char[] column = new char[9];
        for(int i = 0; i < 9; i++) {
            column[i] = grid[i][j];
        }
        return checkGroup(column, "Column " + j + " has multiple");
    }
    
    private boolean checkSubBlock(int startRow, int startColumn) {
        char[] subBlock = new char[9];
        int index = 0;
        for(int i = startRow; i < startRow + 3;i++) {
            for (int j = startColumn; j < startColumn + 3; j++) {
                subBlock[index++] = grid[i][j];
            }
        }
        return checkGroup(subBlock, "Block at (" + startRow + ", " + startColumn + ") has multiple");
    }
    
    private boolean checkGroup(char[] group, String messagePrefix) {
        int[] count = new int[10];
        for(char c : group) {
            if(c != ' ') {
                count[c - '0']++;
                if(count[c - '0'] > 1) {
                    int recurringDigit = c - '0';
                    System.out.println(messagePrefix + " " + recurringDigit + "'s!");
                    return false;
                }
            }
        }
        return true;
    }
    
    public void print() {
        for(int i = 0; i < 9; i++) {
            if(i == 0 || i % 3 == 0) {
                System.out.println("#".repeat(37));
            }
            if (i >= 1 && i % 1 == 0 && i != 3 && i != 6) {
                System.out.println("#" + "---+".repeat(2) + "---#" + "---+".repeat(2) + "---#" + "---+".repeat(2) + "---#"); //-----------#
            }
            for(int j = 0; j < 9;j++) {
                if(j == 0) {
                    System.out.print("# ");
                }
                /*if (j % 3 == 0) {
                    System.out.print("| ");
                }*/
                System.out.print(grid[i][j]);
                if(j < 8) {
                    if(j % 3 == 2) {
                        System.out.print(" # ");
                    } else {
                     System.out.print(" | ");   
                    }
                }
            }
            System.out.println(" #");
        }
        System.out.println("#".repeat(37));
        //System.out.println("+" + "-----------+".repeat(2) + "-----------+");
    }
    
    private boolean isValidIndex(int i, int j) {
        return i >= 0 && i < 9 && j >= 0 && j < 9;
    }
    
    private boolean isValidCharacter(char c) {
        return c == ' ' || (c >= '1' && c <= '9');
    }
    
    
}
