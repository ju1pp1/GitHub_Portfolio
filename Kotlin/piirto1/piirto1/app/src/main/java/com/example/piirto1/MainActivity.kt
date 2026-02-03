package com.example.piirto1

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        //var myView : MyView = MyView(this, null)
        //setContentView(myView)
        setContentView(R.layout.activity_main)
        myView.setOnTouchListener ( View.OnTouchListener { v, event ->
            textView.text = event.x.toString() + ", " + event.y.toString()
            myView.setXY(event.x, event.y)
            return@OnTouchListener true
    })
    }
}
