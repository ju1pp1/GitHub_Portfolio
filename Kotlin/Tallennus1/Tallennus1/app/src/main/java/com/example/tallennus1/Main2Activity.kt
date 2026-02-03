package com.example.tallennus1

import android.content.Context
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.preference.PreferenceManager
import android.preference.PreferenceManager.getDefaultSharedPreferences
import kotlinx.android.synthetic.main.activity_main2.*
import kotlinx.android.synthetic.main.content_main.*

class Main2Activity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main2)

        //val sharedPref = getPreferences(Context.MODE_PRIVATE)
        val sharedPref = getDefaultSharedPreferences(this)

        val highScore = sharedPref.getInt("step", 1)
        var counter = sharedPref.getInt("count", 0)

        textView2.text = highScore.toString() + " step = " + counter
    }
}
