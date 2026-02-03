package com.example.myrestclient

import android.os.Bundle
import com.google.android.material.snackbar.Snackbar
import androidx.appcompat.app.AppCompatActivity
import android.view.Menu
import android.view.MenuItem
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.JsonObjectRequest

import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.android.synthetic.main.content_main.*

class MainActivity : AppCompatActivity() {


    //TODO:

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        setSupportActionBar(toolbar)


        //TODO:
        val url = "https://rata.digitraffic.fi/api/v1/metadata/train-types"
        var lista : ArrayList<TrainTypes> = ArrayList()
        val jsonObjectRequest = GsonRequest<Array<TrainTypes>>(
            url, Array<TrainTypes>::class.java, null,
            Response.Listener { response ->
                for(x in 0 .. response.size-1) {
                    lista.add(response[x]) //TODO: Käytä tätä nyDataset:inä
                    textView.text = textView.text.toString() + "%s\t%s\n".format(response[x].name, response[x].trainCategory.name)
                }
            },
            Response.ErrorListener { error ->
              textView.text = error.message  // TODO: Handle error
            }
        )
        fab.setOnClickListener { view ->
        MySingleton.getInstance(this).addToRequestQueue(jsonObjectRequest)

            //Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
              //      .setAction("Action", null).show()
        }
    }

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
}
