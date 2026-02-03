package com.example.sensorstask2

import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.lifecycle.lifecycleScope
import com.example.sensorstask2.ui.theme.SensorsTask2Theme
import kotlinx.coroutines.launch

class MainActivity : ComponentActivity(), SensorEventListener {

    //Tilamuuttujat askelten mittaamiseen
    private var isMeasuring by mutableStateOf(false) //Osoittaa, onko mittaus käynnissä
    private var stepCount by mutableStateOf(0L) //Tallentaa nykyisen askelmäärän

    //Muuttujat anturin hallintaan
    private var sensorRegistered = false //Ilmaisee, onko anturin kuuntelija rekisteröity
    private val sensorManager by lazy { // SensorManagerin Lazy alustus
        getSystemService(Context.SENSOR_SERVICE) as SensorManager
    }
    private val sensor: Sensor? by lazy { //Askel laskurin Lazy alustus
        sensorManager.getDefaultSensor(Sensor.TYPE_STEP_COUNTER)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            SensorsTask2Theme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    Column(
                        modifier = Modifier.fillMaxSize(),
                        verticalArrangement = Arrangement.Center,
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        //Näytä nykyinen askelmäärä
                        Text(text = "Step Count: $stepCount", modifier = Modifier.padding(16.dp))

                        //Nappi mittaamisen aloitukseen
                        Button(
                            onClick = { startMeasurement() },
                            enabled = !isMeasuring
                        ) {
                            Text(text = "Start Measurement")
                        }

                        //Mittauksen lopetuspainike
                        Button(
                            onClick = { stopMeasurement() },
                            enabled = isMeasuring
                        ) {
                            Text(text = "Stop Measurement")
                        }
                        //Mittaustuloksen tallennuspainike
                        Button(
                            onClick = { saveResult() },
                            enabled = stepCount > 0
                        ) {
                            Text(text = "Save Result")
                        }
                    }
                }
            }
        }
    }

    override fun onResume() {
        super.onResume()
        //Rekisteröi anturin kuuntelija, jos mitataan eikä ole vielä rekisteröitynyt
        if(isMeasuring && !sensorRegistered) {
            registerSensorListener()
        }
    }

    override fun onPause() {
        super.onPause()
        //Peruuta anturikuuntelijan rekisteröinti, jos se on rekisteröity
        if(sensorRegistered) {
            unregisterSensorListener()
        }
    }

    override fun onSensorChanged(event: SensorEvent?) {
        //Päivitä askelmäärä, kun anturin tiedot muuttuvat
        if (event?.sensor?.type == Sensor.TYPE_STEP_COUNTER) {
            stepCount = event.values[0].toLong()
        }
    }

    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {
        // Tarkkuutta varten luotu, mutta ei käytössä
    }

    private fun startMeasurement() {
        //Aloita mittausprosessi
        isMeasuring = true
        //stepCount = 0
        registerSensorListener()
    }

    private fun stopMeasurement() {
        //Lopeta mittausprosessi
        isMeasuring = false
        unregisterSensorListener()
    }

    private fun registerSensorListener() {
        //Rekisteröi anturin kuuntelija askellaskurianturiin
        sensor?.let {
            sensorManager.registerListener(this, it, SensorManager.SENSOR_DELAY_NORMAL)
            sensorRegistered = true
        }
    }

    private fun unregisterSensorListener() {
        //Peruuta anturikuuntelijan rekisteröinti
        sensorManager.unregisterListener(this)
        sensorRegistered = false
    }

    private fun saveResult() {
        //Tallenna nykyinen askelmäärä tietokantaan
        val db = AppDatabase.getInstance(this)
        val repository = Repository(db.stepsDao())

        lifecycleScope.launch {
            repository.storeSteps(stepCount)
        }
    }
}