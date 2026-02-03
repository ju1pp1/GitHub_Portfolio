package com.example.currencycalculatortask

import android.util.Log
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import org.w3c.dom.Node
import org.xml.sax.InputSource
import java.io.StringReader
import javax.xml.parsers.DocumentBuilderFactory
import org.w3c.dom.Element
import com.android.volley.Request

data class ConversionRate(val currency: String, val rate: Double)

fun fetchExchangeRates(context: android.content.Context, onComplete: (List<ConversionRate>) -> Unit) {
    val queue = Volley.newRequestQueue(context)
    val url = "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml"
    
    val stringRequest = StringRequest(Request.Method.GET, url,
        { response ->
            val rates = parseExchangeRates(response)
            onComplete(rates)
            
        },
        { error ->
            Log.e("Volley", "Error fetching data: ${error.message}")
        })
    queue.add(stringRequest)
}

fun parseExchangeRates(xmlData: String): List<ConversionRate> {
    val rates = mutableListOf<ConversionRate>()

    val docBuilderFactory = DocumentBuilderFactory.newInstance()
    val docBuilder = docBuilderFactory.newDocumentBuilder()
    val inputSource = InputSource(StringReader(xmlData))
    val doc = docBuilder.parse(inputSource)

    val nodeList = doc.getElementsByTagName("Cube")
    for (i in 0 until nodeList.length) {
        val node = nodeList.item(i)
        if(node.nodeType == Node.ELEMENT_NODE) {
            val element = node as Element
            val currency = element.getAttribute("currency")
            val rateString = element.getAttribute("rate")
            if(rateString.isNotEmpty()) {
                val rate = rateString.toDouble()
                rates.add(ConversionRate(currency, rate))
            } else {
                Log.e("Parsing", "Rate attribute is empty for currency $currency")
            }
        }
    }
    return rates
}
