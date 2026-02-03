package com.example.currencycalculatortask

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.tooling.preview.Preview
import com.example.currencycalculatortask.ui.theme.CurrencyCalculatorTaskTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            CurrencyCalculatorTaskTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    CurrencyConverter()
                }
            }
        }
    }
}

@Composable
fun CurrencyConverter() {
    var amount by remember { mutableStateOf("") }
    var conversionRates by remember { mutableStateOf(emptyList<ConversionRate>()) }
    //Satunnaiset / Random
    var selectedCurrencies by remember { mutableStateOf<List<String>>(emptyList()) }
    val context = LocalContext.current

    Column(modifier = Modifier.fillMaxSize()) {
        OutlinedTextField(
            value = amount,
            onValueChange = { amount = it},
            label = { Text("Amount in Euros") },
            keyboardOptions = KeyboardOptions(imeAction = ImeAction.Done),
            keyboardActions = KeyboardActions(onDone = {
                fetchExchangeRates(context) { rates ->
                    conversionRates = rates

                    //Otetaan vain kolme satunnaista valuutta konversiota
                    //Pick only 3 random currency exchanges
                    selectedCurrencies = rates.shuffled().take(3).map { it.currency }
                }
            })
        )
        Button(onClick = {
            fetchExchangeRates(context) { rates ->
                conversionRates = rates
                //Näytetään 3 satunnaista / show 3 random
                selectedCurrencies = rates.shuffled().take(3).map { it.currency }
            }
        }) {
            Text("Calculate")
        }

        for (rate in conversionRates.filter { selectedCurrencies.contains(it.currency) }) {
            val convertedAmount = amount.toDoubleOrNull()?.times(rate.rate) ?: 0.0
            Text("${rate.currency}: $convertedAmount")
        }
        //Koko lista valuuttoja / full list of currencies
        /* for (rate in conversionRates) {
            val convertedAmount = amount.toDoubleOrNull()?.times(rate.rate) ?: 0.0
            Text("${rate.currency}: $convertedAmount")
        } */
    }
}