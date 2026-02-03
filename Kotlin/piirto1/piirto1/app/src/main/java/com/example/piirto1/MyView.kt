package com.example.piirto1

import android.content.Context
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.util.AttributeSet
import android.view.View


class MyView(context: Context?, attrs: AttributeSet?) : View(context, attrs) {

    var my_x = 0.0f
    var my_y = 0.0f
    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)
        var paint: Paint = Paint()
        paint.color = Color.BLUE
        canvas.drawOval(my_x, my_y,my_x + 100.0f,my_y + 100.0f, paint)
    }
fun setXY(_x: Float, _y: Float) {
    my_x = _x
    my_y = _y
    invalidate()

}
}