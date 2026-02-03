package com.example.task4_calculate

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.task4_calculate.ui.theme.Task4_CalculateTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            Task4_CalculateTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    Calculating()
                }
            }
        }
    }
}

@Composable
fun Calculating(modifier: Modifier = Modifier) {
    //Sum
    var firstSumNumber by remember {
        mutableStateOf("")
    }
    var secondSumNumber by remember {
        mutableStateOf("")
    }
    var sumResult by remember {
        mutableStateOf("0")
    }
    //Here we sum the numbers
    Column(
        modifier = modifier,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .padding(horizontal = 5.dp)
                    .width(20.dp)
            )
            Column {
                BasicTextField(
                    value = firstSumNumber,
                    onValueChange = { firstSumNumber = it },
                    textStyle = TextStyle(fontSize = 20.sp),
                    modifier = Modifier
                        .padding(horizontal = 10.dp)
                        .width(30.dp),
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number)
                )
                Spacer(
                    modifier = Modifier
                        .width(40.dp)
                        .height(1.dp)
                        .background(Color.Black)
                )
            }

            Text("+", modifier = Modifier.padding(20.dp))

            Box(
                modifier = Modifier
                    .padding(horizontal = 5.dp)
                    .width(0.dp)
            )
            Column {
                BasicTextField(
                    value = secondSumNumber,
                    onValueChange = { secondSumNumber = it },
                    textStyle = TextStyle(fontSize = 20.sp),
                    modifier = Modifier
                        .padding(horizontal = 10.dp)
                        .width(30.dp),
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number)
                )
                Spacer(
                    modifier = Modifier
                        .width(40.dp)
                        .height(1.dp)
                        .background(Color.Black)
                )
            }

            Spacer(modifier = Modifier.height(10.dp))
            Text(
                text = "= $sumResult",
                style = TextStyle(fontSize = 20.sp),
                modifier = Modifier
                    .padding(8.dp)
            )
            Button(
                onClick = {
                    val first = firstSumNumber.toIntOrNull()
                    val second = secondSumNumber.toIntOrNull()
                    if (first != null && second != null) {
                        sumResult = "${add(first, second)}"
                    } else {
                        sumResult = "Invalid input"
                    }
                },
                modifier = Modifier.padding(10.dp)
            ) {
                Text(stringResource(R.string.calculate))
            }
            Spacer(modifier = Modifier.height(16.dp))
        }
    }
}
fun add(firstNumber: Int, secondNumber: Int): Int {
    return firstNumber + secondNumber
}