package com.example.gpstask

import android.content.pm.PackageManager
import android.location.Location
import android.location.LocationManager
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.example.gpstask.ui.theme.GPSTaskTheme
import android.Manifest

class MainActivity : ComponentActivity() {
    private lateinit var locationManager: LocationManager
    private var savedPoints by mutableStateOf(emptyList<Location>())
    private val LOCATION_PERMISSION_REQUEST_CODE = 123

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        locationManager = getSystemService(LOCATION_SERVICE) as LocationManager

        setContent {
            GPSTaskTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Spacer(modifier = Modifier.height(16.dp))
                        Button(onClick = { savePoint() }) {
                            Text("Save point")
                        }
                        Spacer(modifier = Modifier.height(16.dp))
                        SavedPointsList(savedPoints)
                    }

                }
            }
        }
    }

    private fun savePoint() {
        val location = getCurrentLocation()
        if(location != null) {
            savedPoints = savedPoints + location
        }
    }

    private fun getCurrentLocation(): Location? {
        //Check permissions and request if needed

        if(ContextCompat.checkSelfPermission(
            this,
            Manifest.permission.ACCESS_FINE_LOCATION
        ) != PackageManager.PERMISSION_GRANTED
            ) {
            ActivityCompat.requestPermissions(
                this,
                arrayOf(Manifest.permission.ACCESS_FINE_LOCATION),
                LOCATION_PERMISSION_REQUEST_CODE
            )
            return null
        }

        // Check if GPS is enabled
        val gpsEnabled = locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER)
        if(!gpsEnabled) {
            //Handle case where GPS is not enabled
            return null
        }
        return locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER)
    }
}

@Composable
fun SavedPointsList(savedPoints: List<Location>) {
    Column {
        Text("Saved points")
        savedPoints.forEach { location ->
            Text("Latitude: ${location.latitude}, Longitude: ${location.longitude}")
        }
    }
}

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    GPSTaskTheme {
        SavedPointsList(emptyList()) // Preview SavedPointsList composable
    }
}