import ply.yacc as yacc
from lexer import tokens, create_lexer
from syntax_common import debug_syntax, treeprint, debug_parsetree
import sys

class ASTNode:
    def __init__(self, typestr, value=None, children=None, lineno=None):
        self.nodetype = typestr
        self.value = value
        self.lineno = lineno
        self.children = children if children is not None else []

# Method to add a child node
    def add_child(self, child):
        """Adds a child node to the 'children' list."""
        self.children.append(child)

    def __repr__(self):
        """String representation for debugging."""
        value_str = str(self.value) if self.value is not None else "None"
        children_len = len(self.children) if isinstance(self.children, list) else 0
        return f"ASTNode({self.nodetype}, {value_str}, children={children_len})"

def p_program(p):
    '''program : optional_definitions statement_list'''
    p[0] = ASTNode("Program")
    p[0].child_optional_definitions = p[1]
    p[0].child_statement_list = p[2]
    #debug_parsetree(p)

def p_optional_definitions(p):
    '''optional_definitions : definitions
                            | empty'''
    if len(p) == 2:
        p[0] = ASTNode("OptionalDefinitions")
        p[0].child_definitions = p[1]  # If definitions exist
    else:
        p[0] = ASTNode("OptionalDefinitions", [], None)  # Empty case
    #debug_parsetree(p)

def p_definitions(p):
    '''definitions : definitions function_definition
                   | definitions procedure_definition
                   | definitions variable_definition
                   | function_definition
                   | procedure_definition
                   | variable_definition'''
    p[0] = ASTNode("Definitions", children=p[1:])
    #debug_parsetree(p)

def p_variable_definition(p):
    '''variable_definition : LET IDENT EQ rvalue
                           | CONST IDENT EQ expression'''
    debug_parsetree(p)

def p_function_definition(p):
    '''function_definition : FUNC FUNC_IDENT LCURLY formals RCURLY RETURN IDENT optional_var_defs IS match_block ENDFUNC'''
    debug_parsetree(p)

def p_optional_var_defs(p):
    '''optional_var_defs : variable_definition optional_var_defs
                         | empty'''
    debug_parsetree(p)

def p_match_block(p):
    '''match_block : match_items default_match'''
    debug_parsetree(p)

def p_match_items(p):
    '''match_items : match_items match_item
                   | match_item
                   | empty'''
    debug_parsetree(p)

def p_match_item(p):
    '''match_item : expression LARROW rvalue
                  | expression LARROW rvalue COMMA'''
    debug_parsetree(p)

def p_default_match(p):
    '''default_match : DEFAULT LARROW rvalue
                     | LARROW rvalue'''
    debug_parsetree(p)

def p_procedure_definition(p):
    '''procedure_definition : PROC PROC_IDENT LSQUARE formals RSQUARE optional_var_defs IS statement_list ENDPROC'''
    debug_parsetree(p)

def p_formals(p):
    '''formals : formal_arg_list
               | empty'''
    debug_parsetree(p)

def p_formal_arg_list(p):
    '''formal_arg_list : formal_arg
                       | formal_arg SEMICOLON formal_arg_list'''
    debug_parsetree(p)

def p_formal_arg(p):
    '''formal_arg : IDENT COLON IDENT'''
    debug_parsetree(p)

def p_statement_list(p):
    '''statement_list : statement
                      | statement_list statement'''
    if len(p) == 2:
        p[0] = ASTNode("StatementList")
        p[0].children_statement_list = [p[1]]  # Single statement
    else:
        p[0] = ASTNode("StatementList")
        p[0].children_statement_list = p[1].children_statement_list + [p[2]]
    #debug_parsetree(p)

def p_statement(p):
    '''statement : procedure_call
                 | assignment
                 | print_statement
                 | if_statement
                 | repeat_statement
                 | RETURN expression'''
    debug_parsetree(p)

def p_procedure_call(p):
    '''procedure_call : PROC_IDENT LPAREN arguments RPAREN
                      | PROC_IDENT LPAREN RPAREN'''
    p[0] = ASTNode("ProcedureCall")
    p[0].child_procedure_name = p[1]  # The PROC_IDENT
    if len(p) == 4:
        p[0].children_arguments = []  # Empty arguments
    else:
        p[0].children_arguments = p[3]
    #debug_parsetree(p)

def p_arguments(p):
    '''arguments : expression
                 | expression COMMA arguments'''
    if len(p) == 2:
        p[0] = ASTNode("Arguments", [p[1]])  # Valid argument
    elif len(p) == 4:
        if len(p[3].children) == 0:  # Disallow empty arguments after a comma
            p[0] = ASTNode("Arguments", [p[1]])  # Treat trailing comma gracefully
        else:
            p[0] = ASTNode("Arguments", [p[1]] + p[3].children)  # Valid argument list
    else:
        p[0] = ASTNode("Arguments", [])
    #debug_parsetree(p)

def p_assignment(p):
    '''assignment : lvalue ASSIGN rvalue'''
    p[0] = ASTNode("Assignment", [p[1], p[3]])
    #debug_parsetree(p)

def p_lvalue(p):
    '''lvalue : IDENT
              | IDENT DOT IDENT'''
    debug_parsetree(p)

def p_rvalue(p):
    '''rvalue : expression
              | if_expression
              | expression AMPERSAND expression'''
    debug_parsetree(p)

def p_print_statement(p):
    '''print_statement : PRINT print_item print_item_list'''
    p[0] = ASTNode("Print", [p[2], p[3]])
    #debug_parsetree(p)

def p_print_item(p):
    '''print_item : STRING
                  | expression'''
    p[0] = ASTNode("PrintItem", [], p[1])
    #debug_parsetree(p)

def p_print_item_list(p):
    '''print_item_list : AMPERSAND print_item print_item_list
                       | empty'''
    if len(p) == 4:
        p[0] = p[3]
        p[0].children.insert(0, p[2])
    else:
        p[0] = ASTNode("PrintItems", [])  # Empty list
    #debug_parsetree(p)

def p_if_statement(p):
    '''if_statement : IF expression THEN statement_list optional_else ENDIF'''
    p[0] = ASTNode("IfStatement")
    p[0].child_expression = p[2]  # expression
    p[0].child_statement_list = p[4]  # statement_list
    if p[5]:  # If there is an ELSE block
        p[0].child_optional_else = p[5]  # optional_else (Else statement list)
    #debug_parsetree(p)

def p_optional_else(p):
    '''optional_else : ELSE statement_list
                     | empty'''
    if len(p) == 3:
        p[0] = ASTNode("OptionalElse")
        p[0].child_statement_list = p[2]  # statement_list (else block)
    else:
        p[0] = ASTNode("Empty", [])  # Empty else
    #debug_syntax(p)
    #debug_parsetree(p)

def p_repeat_statement(p):
    '''repeat_statement : REPEAT statement_list UNTIL expression'''
    p[0] = ASTNode("Repeat", [p[2], p[4]])
    #debug_parsetree(p)

def p_expression(p):
    '''expression : simple_expr
                  | expression EQ simple_expr
                  | expression NOTEQ simple_expr
                  | expression LT simple_expr'''
    if len(p) == 2:
        p[0] = p[1]  # Pass simple expression
    else:
        p[0] = ASTNode("Comparison", [p[1], p[3]], p[2])
    #debug_parsetree(p)

def p_simple_expr(p):
    '''simple_expr : term
                   | simple_expr PLUS term
                   | simple_expr MINUS term'''
    if len(p) == 2:
        p[0] = p[1]
    else:
        p[0] = ASTNode("SimpleExpr", [p[1], p[3]], p[2])
    #debug_parsetree(p)

def p_term(p):
    '''term : factor
            | term MULT factor
            | term DIV factor'''
    if len(p) == 2:
        p[0] = p[1]
    else:
        p[0] = ASTNode("Term", [p[1], p[3]], p[2])
    #debug_parsetree(p)

def p_factor(p):
    '''factor : MINUS atom
              | PLUS atom
              | atom'''
    if len(p) == 2:
        p[0] = p[1]
    else:
        p[0] = ASTNode("Factor", [p[2]], p[1])
    #debug_parsetree(p)

def p_atom(p):
    '''atom : IDENT
            | IDENT APOSTROPHE IDENT
            | INT_LITERAL
            | FRACTION_LITERAL
            | function_call
            | LPAREN expression RPAREN'''
    if len(p) == 4:
        p[0] = p[2]
    else:
        p[0] = ASTNode("Atom", [], str(p[1]))
    #debug_parsetree(p)

def p_function_call(p):
    '''function_call : FUNC_IDENT LPAREN arguments RPAREN
                     | FUNC_IDENT LPAREN RPAREN'''
    p[0] = ASTNode("FunctionCall", [], p[1])  # FUNC_IDENT
    if len(p) == 4:  # No arguments
        p[0].children_arguments = []  # Empty argument list
    else:
        p[0].children_arguments = p[3]
    #debug_parsetree(p)

def p_if_expression(p):
    '''if_expression : IF expression THEN expression ELSE expression ENDIF'''
    p[0] = ASTNode("IfExpr")
    p[0].child_expression_if = p[2]  # expression after IF
    p[0].child_expression_then = p[4]  # expression after THEN
    p[0].child_expression_else = p[6]  # expression after ELSE
    #debug_parsetree(p)

def p_empty(p):
    '''empty :'''
    #pass  # No debug_syntax() since empty rules don’t generate output
    #p[0] = None  # Explicitly set to None
    p[0] = ASTNode("Empty", [])
    #debug_parsetree(p)

def p_error(p):
    if p:
        print(f"Error found! Syntax error (token: '{p.value}') at line {p.lineno}")
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
    if result:
        treeprint(result, "unicode")
        print("Program ok.")
    #else:
        #print("Error found!")
if __name__ == "__main__":
    main()