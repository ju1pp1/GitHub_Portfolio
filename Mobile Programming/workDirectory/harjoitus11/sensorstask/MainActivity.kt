package com.example.sensorstask

import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.example.sensorstask.ui.theme.SensorsTaskTheme

class MainActivity : ComponentActivity(), SensorEventListener {
    private lateinit var sensorManager: SensorManager
    private var lightSensor: Sensor? = null
    private var proximitySensor: Sensor? = null
    private var accelerometerSensor: Sensor? = null
    private var magneticFieldSensor: Sensor? = null

    private var lightValue: Float = 0f
    private var proximityValue: Float = 0f
    private var accelerometerValues: FloatArray? = null
    private var magneticFieldValues: FloatArray? = null
    private var orientationValues: FloatArray = FloatArray(3)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        sensorManager = getSystemService(Context.SENSOR_SERVICE) as SensorManager
        lightSensor = sensorManager.getDefaultSensor(Sensor.TYPE_LIGHT)
        proximitySensor = sensorManager.getDefaultSensor(Sensor.TYPE_PROXIMITY)

        accelerometerSensor = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)
        magneticFieldSensor = sensorManager.getDefaultSensor(Sensor.TYPE_MAGNETIC_FIELD)

        setContent {
            SensorsTaskTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    SensorReadings(lightValue, proximityValue, orientationValues)
                }
            }
        }
    }

    override fun onResume() {
        super.onResume()
        lightSensor?.also { light ->
            sensorManager.registerListener(this, light, SensorManager.SENSOR_DELAY_NORMAL)
        }
        proximitySensor?.also { proximity ->
            sensorManager.registerListener(this, proximity, SensorManager.SENSOR_DELAY_NORMAL)
        }

        accelerometerSensor?.also { accelerometer ->
            sensorManager.registerListener(this, accelerometer, SensorManager.SENSOR_DELAY_NORMAL)
        }
        magneticFieldSensor?.also { magneticField ->
            sensorManager.registerListener(this, magneticField, SensorManager.SENSOR_DELAY_NORMAL)
        }
    }

    override fun onPause() {
        super.onPause()
        sensorManager.unregisterListener(this)
    }

    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {}

    override fun onSensorChanged(event: SensorEvent?) {
        event?.let {
            when (it.sensor.type) {
                Sensor.TYPE_LIGHT -> lightValue = it.values[0]
                Sensor.TYPE_PROXIMITY -> proximityValue = it.values[0]
                Sensor.TYPE_ACCELEROMETER -> {
                    accelerometerValues = floatArrayOf(it.values[0], it.values[1], it.values[2])
                }
                
                Sensor.TYPE_MAGNETIC_FIELD -> {
                    magneticFieldValues = floatArrayOf(it.values[0], it.values[1], it.values[2])
                }
            }
            if(accelerometerValues != null && magneticFieldValues != null) {
                val rotationMatrix = FloatArray(9)
                val success = SensorManager.getRotationMatrix(rotationMatrix, null, accelerometerValues, magneticFieldValues)
                if(success) {
                    val orientation = FloatArray(3)
                    SensorManager.getOrientation(rotationMatrix, orientation)

                    val newOrientationValues = FloatArray(3)
                    newOrientationValues[0] = Math.toDegrees(orientation[0].toDouble()).toFloat() //azimuth
                    newOrientationValues[1] = Math.toDegrees(orientation[1].toDouble()).toFloat() //pitch
                    newOrientationValues[2] = Math.toDegrees(orientation[2].toDouble()).toFloat() //roll

                    orientationValues = newOrientationValues
                }
            }

            }
        }
    }


@Composable
fun SensorReadings(lightValue: Float, proximityValue: Float, orientationValues: FloatArray) {
    Column(
        modifier = Modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        SensorReading("Light Sensor: ", lightValue)
        SensorReading("Proximity Sensor: ", proximityValue)

        val formattedOrientation = buildString {
            append("%.2f".format(orientationValues[0]))
            append(" %.2f".format(orientationValues[1]))
            append(" %.2f".format(orientationValues[2]))
        }
        //SensorReading("Azimuth: ", orientationValues[0])
        //SensorReading("Pitch: ", orientationValues[1])
        //SensorReading("Roll: ", orientationValues[2])
        SensorReading("Orientation: ", formattedOrientation)

    }
}

@Composable
fun SensorReading(sensorName: String, sensorValue: Any) {
    Text("$sensorName: $sensorValue")
}

/*
@Preview
@Composable
fun DefaultPreview() {
    SensorsTaskTheme {
        Surface {
            SensorReadings(10f, 5f, floatArrayOf(0f, 0f, 0f))
        }
    }
}
*/