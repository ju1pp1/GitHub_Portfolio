/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package fi.tuni.prog3.json;

import java.util.Iterator;
import java.util.TreeMap;

/**
 *
 * @author sdjean
 */
public class ObjectNode extends Node implements Iterable<String> {
    private TreeMap<String, Node> elements;
    
    public ObjectNode() {
        this.elements = new TreeMap<>();
    }
    
    @Override
    public Iterator<String> iterator() {
        return elements.keySet().iterator();
    }
    
    public Node get(String key) {
        return elements.get(key);
    }
    
    public void set(String key, Node node) {
        elements.put(key, node);
    }
    
    public int size() {
        return elements.size();
    }
    
}
