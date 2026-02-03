package com.example.junankokoonpanohaku

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import kotlinx.android.synthetic.main.activity_main.view.*


class MyAdapter(private val myDataset: ArrayList<kokoonpano2>) :    // Muuta String -> joku muu
    RecyclerView.Adapter<MyAdapter.MyViewHolder>() {

    // Provide a reference to the views for each data item
    // Complex data items may need more than one view per item, and
    // you provide access to all the views for a data item in a view holder.
    // Each data item is just a string in this case that is shown in a TextView.
    class MyViewHolder(val v: View) : RecyclerView.ViewHolder(v)  // (muutettu mallikoodista View <- TextView)
    // y.o. rivi määrittelee luokan ja konstruktorin, kts. https://kotlinlang.org/docs/reference/classes.html

    // Create new views (invoked by the layout manager)
    override fun onCreateViewHolder(parent: ViewGroup,
                                    viewType: Int): MyViewHolder {
        // create a new view
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.activity_main, parent, false) //as TextView
        // set the view's size, margins, paddings and layout parameters
        return MyViewHolder(view)
    }

    // Replace the contents of a view (invoked by the layout manager)
    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
        // - get element from your dataset at this position
        // - replace the contents of the view with that element
        holder.v.textView.text = myDataset[position].departureDate// muokkaa tätä
        // TODO: lisää toinen tieto/rivi
    }

    // Return the size of your dataset (invoked by the layout manager)
    override fun getItemCount() = myDataset.size
}

