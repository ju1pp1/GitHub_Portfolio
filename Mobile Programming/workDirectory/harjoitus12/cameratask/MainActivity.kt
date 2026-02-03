package com.example.cameratask

import android.Manifest
import android.content.pm.PackageManager
import android.graphics.BitmapFactory
import android.graphics.Camera
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.camera.core.ImageCapture
import androidx.camera.core.ImageCapture.OutputFileResults
import androidx.camera.core.ImageCaptureException
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.camera.view.PreviewView
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.asImageBitmap
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.example.cameratask.ui.theme.CameraTaskTheme
import java.io.File
import java.text.SimpleDateFormat
import java.util.Locale
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors

class MainActivity : ComponentActivity() {
    private lateinit var cameraExecutor: ExecutorService
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        cameraExecutor = Executors.newSingleThreadExecutor()
        setContent {
            CameraTaskTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    CameraPreview()
                }
            }
        }
    }
    override fun onDestroy() {
        super.onDestroy()
        cameraExecutor.shutdown()
    }
}

@Composable
fun CameraPreview() {

    val context = LocalContext.current
    val previewView = PreviewView(context)
    val imageCapture = remember { ImageCapture.Builder().build() }
    val imageFile = remember { mutableStateOf<File?>(null) }

    // Request camera permissions
    val permission = ContextCompat.checkSelfPermission(context, Manifest.permission.CAMERA)
    if (permission != PackageManager.PERMISSION_GRANTED) {
        ActivityCompat.requestPermissions(
            context as MainActivity,
            arrayOf(Manifest.permission.CAMERA),
            1
        )
    }

    // Start camera
    val cameraProviderFuture = ProcessCameraProvider.getInstance(context)
    cameraProviderFuture.addListener({
        val cameraProvider = cameraProviderFuture.get()
        val preview = androidx.camera.core.Preview.Builder().build().also {
            it.setSurfaceProvider(previewView.surfaceProvider)
        }
        val cameraSelector = androidx.camera.core.CameraSelector.DEFAULT_BACK_CAMERA
        try {
            cameraProvider.unbindAll()
            cameraProvider.bindToLifecycle(context as MainActivity, cameraSelector, preview, imageCapture)
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }, ContextCompat.getMainExecutor(context))

    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // First section
        Box(
            modifier = Modifier.fillMaxWidth()
                .aspectRatio(3f / 3.4f)
        ) {
            AndroidView({ previewView }, Modifier.fillMaxSize())
        }

        // Take picture button
        Button(
            onClick = {
                val imageFileName = SimpleDateFormat("yyyyMMdd_HHmmss", Locale.getDefault()).format(System.currentTimeMillis())
                val outputDirectory = context.filesDir
                val photoFile = File(outputDirectory, "${imageFileName}.jpg")

                val outputOptions = ImageCapture.OutputFileOptions.Builder(photoFile).build()

                imageCapture.takePicture(
                    outputOptions,
                    ContextCompat.getMainExecutor(context),
                    object : ImageCapture.OnImageSavedCallback {
                        override fun onImageSaved(outputFileResults: OutputFileResults) {
                            imageFile.value = photoFile
                        }
                        override fun onError(exception: ImageCaptureException) {
                            exception.printStackTrace()
                        }
                    }
                )

            },
            modifier = Modifier.padding(16.dp)
        ) {
            Text(text = "Take Picture")
        }
        imageFile.value?.let { file ->

        // Second section
        Box(
            modifier = Modifier.weight(1f)
        ) {
            ImageFromFile(file)
        }
        }
    }
}

@Composable
fun ImageFromFile(file: File) {
    //Load bitmap
    val bitmap = BitmapFactory.decodeFile(file.absolutePath)

    //Convert bitmap to ImageBitmap
    val imageBitmap = bitmap.asImageBitmap()

    //Display image
    Image(bitmap = imageBitmap, contentDescription = "Captured image")
}

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    CameraTaskTheme {
        CameraPreview()
    }
}