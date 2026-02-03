package com.example.junankokoonpanohaku

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.*
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.android.volley.Response
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {
    private lateinit var recyclerView: RecyclerView
    private lateinit var viewAdapter: RecyclerView.Adapter<*>
    private lateinit var viewManager: RecyclerView.LayoutManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        viewManager = LinearLayoutManager(this)
        recyclerView = findViewById<RecyclerView>(R.id.recycler_view).apply{
            setHasFixedSize(true)
            layoutManager = viewManager

        }

        val url = "https://rata.digitraffic.fi/api/v1/compositions/2017-01-01"
        var lista: ArrayList<kokoonpano2> = ArrayList()
        val jsonObjectRequest = Gsonrequest<Array<kokoonpano2>>(
                url, Array<kokoonpano2>::class.java, null,
                Response.Listener { response ->
                    for (x in 0 until response.size-1) {
                        lista.add(response[x])
                        //TODO: Käytä tätä nyDataset:inä
                        //textView.text = textView.text.toString() + "%s\t\n".format(response.journeySections[x].maximumSpeed)
                    }
                    recyclerView.apply {
                        viewAdapter = MyAdapter(lista)
                        adapter = viewAdapter
                    }
                },
                Response.ErrorListener { error ->
                    textView.text = error.message  // TODO: Handle error
                }
        )
        button.setOnClickListener{ view ->
            MySingleton.getInstance(this).addToRequestQueue(jsonObjectRequest)

        }
    }
}