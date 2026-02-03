package com.example.kokoonpanohaku

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import com.android.volley.Response
import kotlinx.android.synthetic.main.content_main.*
import kotlinx.android.synthetic.main.activity_main.*


class MainActivity : AppCompatActivity() {


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        //TODO:
        val url = "https://rata.digitraffic.fi/api/v1/compositions/2017-01-01/1"
        var lista: ArrayList<Int> = ArrayList()
        val jsonObjectRequest = GsonRequest<kokoonpano>(
            url, kokoonpano::class.java, null,
            Response.Listener { response ->
                for (x in 0 until response.journeySections.size - 1) {
                    lista.add(response.journeySections[x].maximumSpeed)
                    //TODO: Käytä tätä nyDataset:inä
                    textView.text =
                        textView.text.toString() + "%s\t\n".format(response.journeySections[x].maximumSpeed)
                }
            },
            Response.ErrorListener { error ->
                textView.text = error.message  // TODO: Handle error
            }
        )
    }
}
/*
    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        // Inflate the menu; this adds items to the action bar if it is present.
        menuInflater.inflate(R.menu.menu_main, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        return when(item.itemId) {
            R.id.action_settings -> true
            else -> super.onOptionsItemSelected(item)
        }
    }
} */