package com.example.roomdbtask

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView

class ContactAdapter(private val contacts: List<Contact>) : RecyclerView.Adapter<ContactAdapter.ContactViewHolder>() {

    class ContactViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val textName: TextView = itemView.findViewById(R.id.textName)
        val textPhoneNumber: TextView = itemView.findViewById(R.id.textPhoneNumber)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ContactViewHolder {
        val itemView = LayoutInflater.from(parent.context).inflate(R.layout.item_contact, parent, false)
        return ContactViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: ContactViewHolder, position: Int) {
        val currentContact = contacts[position]
        holder.textName.text = "${currentContact.firstName} ${currentContact.lastName} ${currentContact.phoneNumber} ${currentContact.address}"
        holder.textPhoneNumber.text = currentContact.phoneNumber
    }

    override fun getItemCount(): Int {
        return contacts.size
    }

}