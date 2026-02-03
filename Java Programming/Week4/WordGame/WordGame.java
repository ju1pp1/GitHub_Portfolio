package fi.tuni.prog3.wordgame;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

public class WordGame {
    private ArrayList<String> words;
    private boolean gameActive;
    private String selectedWord;
    private int mistakeLimit;
    private int mistakes;
    private boolean[] revealedChars;

    public WordGame(String wordFilename) throws IOException {
        
        words = new ArrayList<>();
        try (var fileReader = new BufferedReader(new FileReader(wordFilename))) {
            String line;
            while ((line = fileReader.readLine()) != null) {
                words.add(line.trim());
            }
        }
        initializeGame();
    }
    
    private void initializeGame() {
        gameActive = false;
        mistakes = 0;
        mistakeLimit = 0;
        revealedChars = null;
        
        selectedWord = null;
    }
    
    public class WordGameState {
        private String word;
        private int mistakes;
        private int mistakeLimit;
        private int missingChars;

        private WordGameState(String word, int mistakes, int mistakeLimit, int missingChars) {
            this.word = word;
            this.mistakes = mistakes;
            this.mistakeLimit = mistakeLimit;
            this.missingChars = missingChars;
        }
        
        public String getWord() {
            return word;
        }

        public int getMistakes() {
            return mistakes;
        }

        public int getMistakeLimit() {
            return mistakeLimit;
        }

        public int getMissingChars() {
            return missingChars;
        }
    }
        private void validateGameIsActive() throws GameStateException {
        if (!gameActive) {
            throw new GameStateException("There is currently no active word game!");
        }
    }
        public void initGame(int wordIndex, int mistakeLimit) {
            selectedWord = words.get(wordIndex % words.size());
            this.mistakeLimit = mistakeLimit;
            mistakes = 0;
            revealedChars = new boolean[selectedWord.length()];
            gameActive = true;
}
        
        public boolean isGameActive() {
        return gameActive;
    }

    public WordGameState getGameState() throws GameStateException {
        validateGameIsActive();
        return new WordGameState(getRevealedWord(), mistakes, mistakeLimit, getMissingChars());
    }

     private String getRevealedWord() {
        StringBuilder revealedWord = new StringBuilder();
        
        for (int i = 0; i < selectedWord.length(); i++) {
            char c;
             if (revealedChars != null && revealedChars[i]) {
            c = selectedWord.charAt(i);
        } else {
            c = '_';
        }
             revealedWord.append(c);
        }
        return revealedWord.toString();
    }
     
     private int getMissingChars() {
        int count = 0;
        for (boolean revealedChar : revealedChars) {
            if (!revealedChar) {
                count++;
            }
        }
        return count;
    }
     
    public WordGameState guess(char c) throws GameStateException {
        validateGameIsActive();
        c = Character.toLowerCase(c);

        
        boolean charFound = false;
        for (int i = 0; i < selectedWord.length(); i++) {
            if (Character.toLowerCase(selectedWord.charAt(i)) == c && !revealedChars[i]) {
                charFound = true;
                revealedChars[i] = true;
            }
        }

        if (!charFound) {
            mistakes++;
        }
        int missingChars = calculateMissingChars();
        
        if (missingChars == 0) {
            gameActive = false;
        } else if (mistakes > mistakeLimit) {
            gameActive = false;
            revealCorrectWord();
        }

        return new WordGameState(getRevealedWord(), mistakes, mistakeLimit, missingChars);
    }

    
    
    public WordGameState guess(String word) throws GameStateException {
        validateGameIsActive();
        word = word.toLowerCase();

        boolean wordGuessed = selectedWord.equalsIgnoreCase(word);

        if (!wordGuessed) {
            mistakes++;
        }

        if (wordGuessed) {
            for (int i = 0; i < revealedChars.length; i++) {
                revealedChars[i] = true;
            }
        }

        int missingChars = calculateMissingChars();
        
         if (missingChars == 0) {
            gameActive = false;
        } else if (mistakes > mistakeLimit) {
            gameActive = false;
            revealCorrectWord();
        }

        return new WordGameState(getRevealedWord(), mistakes, mistakeLimit, missingChars);
    }
    private void revealCorrectWord() {
        revealedChars = new boolean[selectedWord.length()];
        for (int i = 0; i < selectedWord.length(); i++) {
            revealedChars[i] = true;
        }
    }
    
    private int calculateMissingChars() {
    int count = 0;
    for (boolean revealedChar : revealedChars) {
        if (!revealedChar) {
            count++;
        }
    }
    return count;
}
}