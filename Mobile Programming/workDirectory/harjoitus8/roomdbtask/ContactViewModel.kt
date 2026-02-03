package com.example.roomdbtask

import android.content.Context
import android.widget.Toast
import androidx.lifecycle.ViewModel
import androidx.lifecycle.asLiveData
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class ContactViewModel : ViewModel() {

    //Implementing real-time data
    private val _contacts = MutableStateFlow<List<Contact>>(emptyList())
    val contacts: StateFlow<List<Contact>> = _contacts

    fun insertContact(contactDao: ContactDao, contact: Contact, context: Context) {
        viewModelScope.launch {
            contactDao.addContact(contact)
            Toast.makeText(context, "Contact added successfully", Toast.LENGTH_SHORT).show()
            getAllContacts(contactDao)
        }
    }

    fun getAllContacts(contactDao: ContactDao) {
        viewModelScope.launch {
            _contacts.value = contactDao.getAllContacts()
        }
    }

/* //Without real-time data.
    fun getAllContacts(contactDao: ContactDao, callback: (List<Contact>) -> Unit) {
        viewModelScope.launch {
            val contacts = contactDao.getAllContacts()
            callback(contacts)
        }
    }
*/
    fun deleteAllContacts(contactDao: ContactDao, context: Context) {
        viewModelScope.launch {
            contactDao.deleteAllContacts()
            Toast.makeText(context, "All contacts deleted successfully", Toast.LENGTH_SHORT).show()
            getAllContacts(contactDao)
        }
    }

}