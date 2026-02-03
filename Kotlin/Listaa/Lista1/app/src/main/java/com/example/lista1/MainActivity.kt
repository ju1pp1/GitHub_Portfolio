package com.example.lista1

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView

class MainActivity : AppCompatActivity() {

    private lateinit var recyclerView: RecyclerView
    private lateinit var viewAdapter: RecyclerView.Adapter<*>
    private lateinit var viewManager: RecyclerView.LayoutManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)


        val lista : ArrayList<Person> = arrayListOf(Person("eka", 1), Person("toka", 5))
        val p3 = Person("kolmas", 33)
        lista.add(p3)

        viewManager = LinearLayoutManager(this)
        viewAdapter = MyAdapter(lista)

        recyclerView.adapter = viewAdapter
        recyclerView.layoutManager = viewManager
    }
}
