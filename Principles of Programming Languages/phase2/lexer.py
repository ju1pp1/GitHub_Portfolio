import ply.lex as lex
import ply.yacc as yacc
import sys
import fractions

tokens = (
    'LET', 'CONST', 'PROC', 'FUNC', 'ENDPROC', 'ENDFUNC', 'RETURN', 'IS',
    'REPEAT', 'UNTIL', 'IF', 'THEN', 'ELSE', 'ENDIF', 'PRINT', 'DEFAULT',
    'LPAREN', 'RPAREN', 'LSQUARE', 'RSQUARE', 'LCURLY', 'RCURLY',
    'LARROW', 'ASSIGN', 'APOSTROPHE', 'AMPERSAND', 'COMMA', 'COLON',
    'SEMICOLON', 'DOT', 'EQ', 'NOTEQ', 'LT', 'PLUS', 'MINUS', 'MULT', 'DIV',
    'STRING', 'FRACTION_LITERAL', 'INT_LITERAL', 'IDENT', 'FUNC_IDENT', 'PROC_IDENT'
)

reserved = {
    'let': 'LET', 'const': 'CONST', 'proc': 'PROC', 'func': 'FUNC',
    'endProc': 'ENDPROC', 'endFunc': 'ENDFUNC', 'return': 'RETURN', 'is': 'IS',
    'repeat': 'REPEAT', 'until': 'UNTIL', 'if': 'IF', 'then': 'THEN', 'else': 'ELSE',
    'endif': 'ENDIF', 'print': 'PRINT', 'default': 'DEFAULT'
}

t_LPAREN = r'\('
t_RPAREN = r'\)'
t_LSQUARE = r'\['
t_RSQUARE = r'\]'
t_LCURLY = r'\{'
t_RCURLY = r'\}'
t_LARROW = r'<-'
#t_RARROW = r'->'
t_ASSIGN = r':='
t_APOSTROPHE = r"'"
t_AMPERSAND = r'&'
t_COMMA = r','
t_COLON = r':'
t_SEMICOLON = r';'
t_DOT = r'\.'
t_NOTEQ = r'/='
t_LT = r'<'
t_PLUS = r'\+'
t_MINUS = r'-'
t_MULT = r'\*'
t_DIV = r'/'
t_EQ = r'='
t_PRINT = r'print'

#Create lexer obj
def create_lexer():
    return lex.lex()

#String handling
def t_STRING(t):
    r'"[^"]*"'
    t.value = t.value[1:-1]
    return t

#Fraction literal handling
def t_FRACTION_LITERAL(t):
    r'-?[0-9]+_[0-9]+'
    num, denom = map(int, t.value.split('_'))
    if denom == 0:
        #print("Error found! Division by zero in fraction literal")
        print(f"line {t.lineno}: Illegal denumerator")
        print("lexer stopped with SystemExit")
        print("Error found!")
        #t.lexer.skip(1)
        sys.exit(1)
    else:
        t.value = fractions.Fraction(num, denom)
    return t
#Integer literal handling
def t_INT_LITERAL(t):
    r'-?[0-9]+'
    t.value = int(t.value)
    if abs(t.value) >= 1_000_000_000:
        print(f"line {t.lineno}: INT_LITERAL too large")
        print("lexer stopped with SystemExit")
        print("Error found!")
        sys.exit(1)
        #t.lexer.skip(1)
    return t

#Identifier handling
#Might want to try t.type = reserver.get(t.value, 'IDENT') instead of if clause.
def t_IDENT(t):
    r"[a-z_][a-zA-Z0-9_]*(?:'[a-zA-Z0-9_]+)*"
    t.type = reserved.get(t.value, 'IDENT')  # Ensures `let` is classified as `LET`
    return t

def t_FUNC_IDENT(t):
    r'[A-Z][a-z0-9_]+'
    return t
def t_PROC_IDENT(t):
    r'[A-Z]{2}[A-Z0-9_]*'
    return t
#Handling whitespace and comments
t_ignore = ' \t\r'

def t_newline(t):
    r'\n+'
    t.lexer.lineno += len(t.value)
    #t.lexer.lexpos = t.lexpos

def t_COMMENT(t):
    r'---[\s\S]*?---'
    t.lexer.lineno += t.value.count('\n')
    #t.lexer.skip(len(t.value))
    pass
#Error handling
def t_error(t):
    print(f"Illegal character '{t.value[0]}' at line {t.lineno}")
    print("lexer stopped with SystemExit")
    print("Error found!")
    #t.lexer.skip(1)
    sys.exit(1)

#Build the lexer and process input file
def main():
    if len(sys.argv) < 2:
        print("Usage: python3 lexer.py <source_file>")
        return

    with open(sys.argv[1], 'r') as f:
        data = f.read()

    lexer = lex.lex()
    lexer.input(data)
    for token in lexer:
        print(token)
    print("Program ok.")
if __name__ == "__main__":
    main()
