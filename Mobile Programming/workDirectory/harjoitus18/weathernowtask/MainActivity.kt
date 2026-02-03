package com.example.weathernowtask

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.tooling.preview.Preview
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.weathernowtask.ui.theme.WeatherNowTaskTheme
import com.android.volley.Request
import org.xml.sax.InputSource
import java.io.StringReader
import javax.xml.parsers.DocumentBuilderFactory
import org.w3c.dom.Element

data class Measurement(val time: String, val temperature: Double)

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            WeatherNowTaskTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    WeatherStats()
                }
            }
        }
    }
}

@Composable
fun WeatherStats() {
    var location by remember { mutableStateOf("") }
    var measurements by remember { mutableStateOf<List<Measurement>?>(null) }
    val context = LocalContext.current

    Column(modifier = Modifier.fillMaxSize()) {
        OutlinedTextField(
            value = location,
            onValueChange = { location = it},
            label = { Text("Enter location") },
            keyboardOptions = KeyboardOptions(imeAction = ImeAction.Done),
            keyboardActions = KeyboardActions(onDone = {
                fetchWeatherInfo(location, context) { info ->
                    measurements = info
                }
            })
        )
        Button(onClick = {
            fetchWeatherInfo(location, context) { info ->
                measurements = info
            }
        }) {
            Text("Get weather")
        }

        measurements?.forEach { measurement ->
            Text("Time: ${measurement.time}, Temperature: ${measurement.temperature}")
        }
    }
}

fun fetchWeatherInfo(
    location: String,
    context: android.content.Context,
    onComplete: (List<Measurement>) -> Unit
) {
    val queue = Volley.newRequestQueue(context)
    val url = "https://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=GetFeature&storedquery_id=fmi::observations::weather::timevaluepair&place=$location&parameters=temperature"

    val stringRequest = StringRequest(Request.Method.GET, url,
        { response ->
            val measurements = parseWeatherInfo(response)
            val latestFiveMeasurements = measurements.takeLast(5)
            onComplete(latestFiveMeasurements)
        },
        { error ->
            println("Error fetching data: ${error.message}")
        })
    queue.add(stringRequest)
}

fun parseWeatherInfo(xmlData: String): List<Measurement> {
    val measurements = mutableListOf<Measurement>()

    val docBuilderFactory = DocumentBuilderFactory.newInstance()
    val docBuilder = docBuilderFactory.newDocumentBuilder()
    val inputSource = InputSource(StringReader(xmlData))
    val doc = docBuilder.parse(inputSource)

    val points = doc.getElementsByTagName("wml2:point")
    val totalPoints = points.length

    for (i in 0 until totalPoints) {
        val pointNode = points.item(i)
        if (pointNode.nodeType == Element.ELEMENT_NODE) {
            val element = pointNode as Element
            val time = element.getElementsByTagName("wml2:time").item(0).textContent
            val temperature = element.getElementsByTagName("wml2:value").item(0).textContent.toDouble()
            measurements.add(Measurement(time, temperature))
        }
    }
    return measurements
}