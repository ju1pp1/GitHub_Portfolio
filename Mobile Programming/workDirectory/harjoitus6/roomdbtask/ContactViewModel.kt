package com.example.roomdbtask

import android.content.Context
import android.widget.Toast
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.launch

class ContactViewModel : ViewModel() {

    fun insertContact(contactDao: ContactDao, contact: Contact, context: Context) {
        viewModelScope.launch {
            contactDao.addContact(contact)
            Toast.makeText(context, "Contact added successfully", Toast.LENGTH_SHORT).show()
        }
    }

    fun getAllContacts(contactDao: ContactDao, callback: (List<Contact>) -> Unit) {
        viewModelScope.launch {
            val contacts = contactDao.getAllContacts()
            callback(contacts)
        }
    }

    fun deleteAllContacts(contactDao: ContactDao, context: Context) {
        viewModelScope.launch {
            contactDao.deleteAllContacts()
            Toast.makeText(context, "All contacts deleted successfully", Toast.LENGTH_SHORT).show()
        }
    }

}