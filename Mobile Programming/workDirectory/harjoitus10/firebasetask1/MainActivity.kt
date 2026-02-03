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
import androidx.compose.foundation.layout.height
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
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase

class MainActivity : ComponentActivity() {

    //Implementing v2
    private lateinit var auth: FirebaseAuth

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        auth = FirebaseAuth.getInstance()
        setContent {
            FirebaseTask1Theme {
                // A surface container using the 'background' color from the theme
                Surface(color = MaterialTheme.colorScheme.background) {
                    MyApp(auth)
                }
            }
        }
    }
}

@Composable
fun MyApp(auth: FirebaseAuth) {
    /*
    var firstName by remember { mutableStateOf("") }
    var lastName by remember { mutableStateOf("") }
    var phoneNumber by remember { mutableStateOf("") }
    var address by remember { mutableStateOf("") }
    var databaseContent by remember { mutableStateOf("Database content will appear here") }
*/
    var firstName by remember { mutableStateOf("") }
    var lastName by remember { mutableStateOf("") }
    var phoneNumber by remember { mutableStateOf("") }
    var address by remember { mutableStateOf("") }

    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var loggedInUserId by remember { mutableStateOf("") }
    var databaseContent by remember { mutableStateOf("Database content will appear here") }

    Column(
        modifier = Modifier
            .padding(8.dp)
            .fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier.padding(bottom = 8.dp)
        )
    {
        TextField(
            value = firstName,
            onValueChange = { firstName = it },
            label = { Text("First Name") },
            modifier = Modifier.padding(1.dp)
        )
        TextField(
            value = lastName,
            onValueChange = { lastName = it },
            label = { Text("Last Name") },
            modifier = Modifier.padding(1.dp)
        )
        TextField(
            value = phoneNumber,
            onValueChange = { phoneNumber = it },
            label = { Text("Phone Number") },
            modifier = Modifier.padding(1.dp)
        )
        TextField(
            value = address,
            onValueChange = { address = it },
            label = { Text("Address") },
            modifier = Modifier.padding(1.dp)
        )
        Row(modifier = Modifier.padding(vertical = 8.dp)) {
            Button(onClick = { saveData(firstName, lastName, phoneNumber, address) }) {
                Text("Save Data")
            }
            Spacer(modifier = Modifier.width(16.dp))
            Button(onClick = { retrieveData { data -> databaseContent = data.toString() } }) {
                Text("Retrieve Data")
            }
        }
        Spacer(modifier = Modifier.width(16.dp))
        Text(text = databaseContent, modifier = Modifier.padding(8.dp))
    }
        Spacer(modifier = Modifier.width(16.dp))
        Column(
            modifier = Modifier
                .padding(16.dp)
                .fillMaxSize(),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
        TextField(
            value = email,
            onValueChange = { email = it },
            label = { Text("Email") },
            modifier = Modifier.padding(8.dp)
        )
        TextField(
            value = password,
            onValueChange = { password = it },
            label = { Text("Password") },
            modifier = Modifier.padding(8.dp)
        )
        Button(onClick = {
            auth.signInWithEmailAndPassword(email, password)
                .addOnCompleteListener { task ->
                    if (task.isSuccessful) {
                        val user = auth.currentUser
                        loggedInUserId = user?.uid ?: ""
                        retrieveUserData(loggedInUserId) { userData ->
                            userData.firstOrNull()?.let { user ->
                                firstName = user["firstName"] as? String ?: ""
                                // Can similarly retrieve other user-specific data
                            }
                        }
                    } else {
                        // Handle login failure
                    }
                }
        }) {
            Text("Log In")
    }
        Spacer(modifier = Modifier.height(8.dp))
        //Text(text = databaseContent, modifier = Modifier.padding(8.dp))
        Text(text = "First Name: $firstName", modifier = Modifier.padding(8.dp))
}
    // Fetch and display user-specific data once logged in
    /*if (loggedInUserId.isNotEmpty()) {
        retrieveUserData(loggedInUserId) { data ->
            databaseContent = data.toString()
        }
    }*/
}}

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

fun retrieveUserData(userId: String, callback: (List<Map<String, Any>>) -> Unit) {
    val db = Firebase.firestore
    db.collection("users")
        .whereEqualTo("userId", userId)
        .get()
        .addOnSuccessListener { result ->
            val data = result.documents.map { it.data ?: emptyMap() }
            callback(data)
        }
        .addOnFailureListener { exception ->
            println("Error getting documents: $exception")
            callback(emptyList())
        }
}
/*
fun retrieveUserData(userId: String, callback: (List<String>) -> Unit) {
    val db = Firebase.firestore
    db.collection("users")
        .whereEqualTo("userId", userId)
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
} */