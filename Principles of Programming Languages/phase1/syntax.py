import ply.yacc as yacc
from lexer import tokens, create_lexer
#from syntax_common import debug_syntax
import sys

def p_program(p):
    '''program : PRINT printitem'''
    #debug_syntax(p)

def p_printitem(p):
    '''printitem : STRING
                | expression'''
    #debug_syntax(p)

def p_expression(p):
    '''expression : simple_expr
                    | expression EQ simple_expr
                    | expression NOTEQ simple_expr
                    | expression LT simple_expr'''
    #debug_syntax(p)

def p_simple_expr(p):
    '''simple_expr : term
                | simple_expr PLUS term
                | simple_expr MINUS term'''
    #debug_syntax(p)

def p_term(p):
    '''term : factor
            | term MULT factor
            | term DIV factor'''
    #debug_syntax(p)

def p_factor(p):
    '''factor : MINUS atom
            | PLUS atom
            | atom'''
    #debug_syntax(p)

def p_atom(p):
    '''atom : IDENT
    | INT_LITERAL
    | FRACTION_LITERAL
    | LPAREN expression RPAREN'''
    #debug_syntax(p)

def p_error(p):
    if p:
        print("Error found! Syntax error.")
    else:
        print("Error found! Unexpected input.")
    sys.exit(1)

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 syntax.py <source_file>")
        return

    with open(sys.argv[1], 'r') as f:
        data = f.read()

    lexer = create_lexer()
    parser = yacc.yacc()
    result = parser.parse(data, lexer=lexer)
#, lexer=lexer
    if result is None:
        print("Program ok.")
    #else:
        #print("Error found!")
if __name__ == "__main__":
    main()
