package com.example.roomdbtask

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.Query

@Dao
interface ContactDao {

    @Insert
    suspend fun addContact(contact: Contact)

    @Query("DELETE FROM contacts")
    suspend fun deleteAllContacts()

    @Query("SELECT * FROM contacts ORDER BY firstName ASC")
    suspend fun getAllContacts(): List<Contact>
}