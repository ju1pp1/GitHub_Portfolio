package fi.tuni.prog3.json;

import java.util.ArrayList;
import java.util.Iterator;



public class ArrayNode extends Node implements Iterable<Node> {
    private ArrayList<Node> elements;
    
    public ArrayNode() {
        this.elements = new ArrayList<>();
    }
    
    @Override
    public Iterator<Node> iterator() {
        return elements.iterator();
    }
    
    public void add(Node node) {
        elements.add(node);
    }
    
    public int size() {
        return elements.size();
    }
    
}
