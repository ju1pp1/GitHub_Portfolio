package com.example.gpstask2

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.example.gpstask2.ui.theme.GPSTask2Theme
import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.location.Location
import android.location.LocationManager
import android.preference.PreferenceManager
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import org.osmdroid.config.Configuration
import org.osmdroid.tileprovider.tilesource.TileSourceFactory
import org.osmdroid.util.GeoPoint
import org.osmdroid.views.MapView
import org.osmdroid.views.overlay.Marker
import org.osmdroid.views.overlay.mylocation.GpsMyLocationProvider
import org.osmdroid.views.overlay.mylocation.MyLocationNewOverlay

class MainActivity : ComponentActivity() {

    private lateinit var locationManager: LocationManager
    private var savedPoints by mutableStateOf(emptyList<Location>())
    private val LOCATION_PERMISSION_REQUEST_CODE = 123
    private lateinit var mMap: MapView
    private lateinit var mMyLocationOverlay: MyLocationNewOverlay
    private var mapScreenKey by mutableStateOf("")

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        locationManager = getSystemService(LOCATION_SERVICE) as LocationManager

        setContent {
            GPSTask2Theme {
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
                            Spacer(modifier = Modifier.height(16.dp))
                            MapScreen(savedPoints = savedPoints)
                        }
                }
            }
        }
        Configuration.getInstance().load(this, getSharedPreferences("osmdroid", MODE_PRIVATE))
        mMap = MapView(applicationContext)
        mMap.setTileSource(TileSourceFactory.MAPNIK)
        mMap.setMultiTouchControls(true)

        mMyLocationOverlay = MyLocationNewOverlay(GpsMyLocationProvider(this), mMap)
        mMyLocationOverlay.enableMyLocation()
        mMyLocationOverlay.enableFollowLocation()
        mMyLocationOverlay.isDrawAccuracyEnabled = true
        mMap.overlays.add(mMyLocationOverlay)
    }

    private fun savePoint() {
        val location = getCurrentLocation()
        if(location != null) {
            savedPoints = savedPoints + location
            mapScreenKey = System.currentTimeMillis().toString()
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

@Composable
fun MapScreen(savedPoints: List<Location>) {
    Surface(modifier = androidx.compose.ui.Modifier.fillMaxSize()) {
        AndroidView(factory = { context ->
            MapView(context).apply {
                setTileSource(TileSourceFactory.MAPNIK)
                setMultiTouchControls(true)

                //Enable location provider
                val locationOverlay = MyLocationNewOverlay(GpsMyLocationProvider(context), this)
                locationOverlay.enableMyLocation()
                locationOverlay.enableFollowLocation()
                locationOverlay.isDrawAccuracyEnabled = true
                overlays.add(locationOverlay)

                //set initial map center and zoom level
                controller.setZoom(15.0)

                locationOverlay.myLocation?.let { controller.setCenter(it) }

                //Add markers for saved points
                savedPoints.forEach { location ->
                    val marker = Marker(this)
                    marker.position = GeoPoint(location.latitude, location.longitude)
                    marker.icon = ContextCompat.getDrawable(context, org.osmdroid.library.R.drawable.marker_default)
                    //marker.position = org.osmdroid.util.GeoPoint(location.latitude, location.longitude)
                    //marker.setAnchor(Marker.ANCHOR_CENTER, Marker.ANCHOR_BOTTOM)
                    marker.title = "Saved point"
                    overlays.add(marker)
                }
            }
        },modifier = Modifier.fillMaxSize(), update = { mapView ->
            //mapView.overlays.clear()
            mapView.invalidate()
            mapView.post {
                savedPoints.forEachIndexed { index, location ->
                    val marker = Marker(mapView)
                    marker.position = GeoPoint(location.latitude, location.longitude)
                    marker.icon = ContextCompat.getDrawable(mapView.context, org.osmdroid.library.R.drawable.marker_default)
                    marker.title = "Marker $index"
                    mapView.overlays.add(marker)
                }
                mapView.invalidate()
            }
        }
        )
    }
}

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    GPSTask2Theme {
        SavedPointsList(emptyList()) // Preview SavedPointsList composable
    }
}