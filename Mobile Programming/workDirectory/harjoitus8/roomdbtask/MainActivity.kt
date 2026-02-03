package com.example.roomdbtask

import android.content.Context
import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.room.Room
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.roomdbtask.ui.theme.RoomDBTaskTheme

class MainActivity : ComponentActivity() {

    private lateinit var database: ContactsDatabase
    private val contactViewModel by viewModels<ContactViewModel>()



    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        //Implementing real-time data
        database = ContactsDatabase.getDatabase(applicationContext)
        contactViewModel.getAllContacts(database.contactDao())

        /*
         //This was without real-time data
              database = Room.databaseBuilder(
                  applicationContext,
                  ContactsDatabase::class.java,
                  "contacts_database"
              ).build()
        */

        setContent {
            RoomDBTaskTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    PhoneBookScreen(database, contactViewModel)
                }
            }
        }
    }
}

@Composable
fun PhoneBookScreen(database: ContactsDatabase, contactViewModel: ContactViewModel) {
    var firstName by remember { mutableStateOf("") }
    var lastName by remember { mutableStateOf("") }
    var phoneNumber by remember { mutableStateOf("") }
    var address by remember { mutableStateOf("") }
    //Implementing
    var showDeleteDialog by remember { mutableStateOf(false) }

    val contactDao = database.contactDao()
    /* Implementing
    var allContacts by remember {
        mutableStateOf(emptyList<Contact>())
    }*/
    val allContacts by contactViewModel.contacts.collectAsState()

    LaunchedEffect(Unit) {
        contactViewModel.getAllContacts(contactDao)
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        TextField(
            value = firstName,
            onValueChange = { firstName = it},
            label = { Text("Name")}
        )
        TextField(
            value = lastName,
            onValueChange = { lastName = it},
            label = { Text("Last name")}
        )
        TextField(
            value = phoneNumber,
            onValueChange = { phoneNumber = it},
            label = { Text("Phone number")}
        )
        TextField(
            value = address,
            onValueChange = { address = it},
            label = { Text("Address")}
        )

        val context = LocalContext.current
        //val contactDao = database.contactDao()

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Button(onClick = {
                //Add button logic
                val newContact = Contact(
                    firstName = firstName,
                    lastName = lastName,
                    phoneNumber = phoneNumber,
                    address = address
                )
                contactViewModel.insertContact(contactDao, newContact, context)
                //Clear fields after adding
                firstName = ""
                lastName = ""
                phoneNumber = ""
                address = ""
            }) {
                Text("Add")
            }
            Button(onClick = {
                //Delete button logic
                //contactViewModel.deleteAllContacts(contactDao, context)
                showDeleteDialog = true
            }) {
                Text("Delete")
            }

        }
        ContactList(contacts = allContacts)

        if(showDeleteDialog) {
            AlertDialog(
                onDismissRequest = {
                showDeleteDialog = false
            },
                title = {
                    Text(text = "Are you sure?")
                },
                confirmButton = {
                    Button(onClick = {
                        contactViewModel.deleteAllContacts(contactDao, context)
                        showDeleteDialog = false
                    }
                    ) {
                     Text(text = "Confirm")
                    }
                },
                dismissButton = {
                    Button(
                        onClick = {
                            showDeleteDialog = false
                        }
                    ) {
                        Text(text = "Cancel")
                    }
                }
            )
        }
    }
}
@Composable
fun ContactList(contacts: List<Contact>) {
    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(8.dp)
    ) {
        items(contacts) { contact ->
            ContactItem(contact = contact)
        }
    }
}
@Composable
fun ContactItem(contact: Contact) {
    Column(
        modifier = Modifier
            .padding(8.dp)
            .fillMaxWidth()
    ) {
        Text(
            text = "${contact.firstName} ${contact.lastName}",
            fontWeight = FontWeight.Bold,
            fontSize = 18.sp
        )
        Text(
            text = contact.phoneNumber,
            fontSize = 16.sp
        )
        Text(
            text =  contact.address,
            fontSize = 16.sp
        )
    }
}