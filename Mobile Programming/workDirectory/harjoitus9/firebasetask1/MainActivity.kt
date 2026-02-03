package com.example.firebasetask1

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.appcompat.app.AppCompatActivity
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.firebasetask1.ui.theme.FirebaseTask1Theme
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            FirebaseTask1Theme {
                // A surface container using the 'background' color from the theme
                Surface(color = MaterialTheme.colorScheme.background) {
                    MyApp()
                }
            }
        }
    }
}

@Composable
fun MyApp() {
    var firstName by remember { mutableStateOf("") }
    var lastName by remember { mutableStateOf("") }
    var phoneNumber by remember { mutableStateOf("") }
    var address by remember { mutableStateOf("") }
    var databaseContent by remember { mutableStateOf("Database content will appear here") }

    Column(
        modifier = Modifier
            .padding(16.dp)
            .fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        TextField(
            value = firstName,
            onValueChange = { firstName = it },
            label = { Text("First Name") },
            modifier = Modifier.padding(8.dp)
        )
        TextField(
            value = lastName,
            onValueChange = { lastName = it },
            label = { Text("Last Name") },
            modifier = Modifier.padding(8.dp)
        )
        TextField(
            value = phoneNumber,
            onValueChange = { phoneNumber = it },
            label = { Text("Phone Number") },
            modifier = Modifier.padding(8.dp)
        )
        TextField(
            value = address,
            onValueChange = { address = it },
            label = { Text("Address") },
            modifier = Modifier.padding(8.dp)
        )
        Row(modifier = Modifier.padding(vertical = 8.dp)) {
            Button(onClick = { saveData(firstName, lastName, phoneNumber, address) }) {
                Text("Save Data")
            }
            Spacer(modifier = Modifier.width(8.dp))
            Button(onClick = { retrieveData { data -> databaseContent = data.toString() } }) {
                Text("Retrieve Data")
            }
        }
        Text(text = databaseContent, modifier = Modifier.padding(8.dp))
    }
}

fun saveData(firstName: String, lastName: String, phoneNumber: String, address: String) {
    val db = Firebase.firestore
    val userData = hashMapOf(
        "firstName" to firstName,
        "lastName" to lastName,
        "phoneNumber" to phoneNumber,
        "address" to address
    )
    db.collection("contacts")
        .add(userData)
        .addOnSuccessListener { documentReference ->
            println("DocumentSnapshot added with ID: ${documentReference.id}")
        }
        .addOnFailureListener { e ->
            println("Error adding document: $e")
        }
}

fun retrieveData(callback: (List<String>) -> Unit) {
    val db = Firebase.firestore
    db.collection("contacts")
        .get()
        .addOnSuccessListener { result ->
            val data = mutableListOf<String>()
            for (document in result) {
                data.add(document.data.toString())
            }
            callback(data)
        }
        .addOnFailureListener { exception ->
            println("Error getting documents: $exception")
            callback(emptyList())
        }
}