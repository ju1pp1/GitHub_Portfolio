/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package fi.tuni.prog3.json;

/**
 *
 * @author sdjean
 */
public class ValueNode extends Node {
    
    private Object value;
    
    public ValueNode() {
        this.value = null;
    }
    
    public ValueNode(double value) {
        this.value = value;
    }
    
    public ValueNode(boolean value) {
        this.value = value;
    }
    
    public ValueNode(String value) {
        this.value = value;
    }
    
    public boolean isNumber() {
        return value instanceof Double;
    }
    
    public boolean isBoolean() {
        return value instanceof Boolean;
    }
    
    public boolean isString() {
        return value instanceof String;
    }
    
    public boolean isNull() {
        return value == null;
    }
    
    public double getNumber() {
        return (double) value;
    }
    
    public boolean getBoolean() {
        return (boolean) value;
    }
    
    public String getString() {
        return (String) value;
    }
    
    public Object getNull() {
        return value;
    }
    
    
}
