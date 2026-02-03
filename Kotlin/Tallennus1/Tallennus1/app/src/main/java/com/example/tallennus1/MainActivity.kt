package com.example.tallennus1

import android.content.Context
import android.content.Intent
import android.content.SharedPreferences
import android.os.Bundle
import android.os.PersistableBundle
import android.preference.PreferenceManager.getDefaultSharedPreferences
import com.google.android.material.snackbar.Snackbar
import androidx.appcompat.app.AppCompatActivity
import android.view.Menu
import android.view.MenuItem
import android.widget.Toast

import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.android.synthetic.main.content_main.*

class MainActivity : AppCompatActivity() {

    var counter = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        setSupportActionBar(toolbar)

        //val sharedPref = getPreferences(Context.MODE_PRIVATE)
        val sharedPref = getDefaultSharedPreferences(applicationContext)

        val highScore = sharedPref.getInt("step", 1)
        editText.setText(highScore.toString())
        counter = sharedPref.getInt("count", 0)

        textView.text = "" + counter

        fab.setOnClickListener { view ->
            counter += editText.text.toString().toInt()
            textView.text = "" + counter
        }
        button.setOnClickListener { view ->
            // TODO:
            counter = 0
            textView.text = "" + counter
        }
            button2.setOnClickListener { view ->
                // TODO:
         val i = Intent(this@MainActivity, Main2Activity::class.java)
        startActivity(i)
            }
    }

    override fun onPause() {
        super.onPause()
        //val sharedPref = getPreferences(Context.MODE_PRIVATE)
        val sharedPref = getDefaultSharedPreferences(applicationContext)

        with(sharedPref.edit()) {
            putInt("step", editText.text.toString().toInt())
            putInt("count", counter)
            commit()
        }
    }

    override fun onResume() {
        super.onResume()
        //val sharedPref = getPreferences(Context.MODE_PRIVATE)
        val sharedPref = getDefaultSharedPreferences(applicationContext)

        counter = sharedPref.getInt("count", 1)
    }

    override fun onSaveInstanceState(outState: Bundle, outPersistentState: PersistableBundle) {
        outState.putInt("count", counter)
        super.onSaveInstanceState(outState, outPersistentState)
    }

    override fun onRestoreInstanceState(savedInstanceState: Bundle){
        counter = savedInstanceState.getInt("count")
        super.onRestoreInstanceState(savedInstanceState)
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
        return when (item.itemId) {
            R.id.action_settings -> {
                Toast.makeText(this, "Toast it!", Toast.LENGTH_LONG).show()
                true
            }
                R.id.action_settings -> {
                    Toast.makeText(this, "You've seen it all!", Toast.LENGTH_LONG).show()
                    true
                }

                else -> super.onOptionsItemSelected(item)
            }
        }
    }
