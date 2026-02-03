package com.example.fancyquestionnaire

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.selection.selectable
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.RadioButton
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
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.fancyquestionnaire.ui.theme.FancyQuestionnaireTheme
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            val navController = rememberNavController()
            FancyQuestionnaireTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    NavHost(navController = navController, startDestination = "authentication") {
                        composable("authentication") {
                            AuthenticationScreen(navController)
                        }
                        composable("questionnaire") {
                            val navController = rememberNavController()
                            val userEmail = FirebaseAuth.getInstance().currentUser?.email ?: ""
                            MyApp(userEmail)
                        }
                    }
                    //AuthenticationScreen()
                }
            }
        }
    }
}

/** AuthenticationScreen
 * Tämän composable funktion avulla käyttäjät voivat kirjautua sisään tai rekisteröidä tilin.
 * navController otettu käyttöön sivujen välillä navigoimiseen.
 */

@Composable
fun AuthenticationScreen(navController: NavController) {
    // Tilamuuttujat käyttäjän syötteen ja todennustilan seuraamiseksi.
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var name by remember { mutableStateOf("") }
    var isSignInMode by remember { mutableStateOf(true) }

    var signInErrorMessage by remember { mutableStateOf("")}
    var signUpErrorMessage by remember { mutableStateOf("")}

    Column(
        modifier = Modifier
            .padding(16.dp)
            .fillMaxSize(),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // Kirjautumis- tai rekisteröintiosion renderöinti nykyisen kirjautumis-tilan perusteella.
        if(isSignInMode) {
            // Sisäänkirjautuminen.
            SignInRegisterSection(
                email = email,
                password = password,
                onEmailChange = { email = it },
                onPasswordChange = { password = it },
                onSubmit = { /* Perform sign in operation */},
                buttonText = "Sign in",
                switchText = "Don't have an account? Sign up",
                onSwitchClick = { isSignInMode = false },
                isSignInMode = true,
                navController = navController,
                onSignIn = { email, password ->
                    // Tarkista käyttäjän syöte ja suoritetaan kirjautumistoiminto.
                    if(email.isNotEmpty() && password.isNotEmpty()) {
                        checkCredentials(email, password, navController) { error ->
                            signInErrorMessage = error
                        }
                    } else {
                        signInErrorMessage = "Please enter email and password"
                    }
                },
                errorMessage = signInErrorMessage
            )
        } else {
            // Rekisteröinti
            SignInRegisterSection(
                name = name,
                email = email,
                password = password,
                onNameChange = { name = it },
                onEmailChange = { email = it },
                onPasswordChange = { password = it },
                onSubmit = { /* Perform registration operation */ },
                buttonText = "Register",
                switchText = "Already have an account? Sign in",
                onSwitchClick = { isSignInMode = true },
                isSignInMode = false,
                navController = navController,
                onSignIn = { email, password ->
                    // Tarkista käyttäjän syöte ja suoritetaan rekisteröinti.
                    if(email.isNotEmpty() && password.isNotEmpty() && name.isNotEmpty()) {
                        createUser(name, email, password,
                            onSuccess = {
                                signUpErrorMessage = ""
                                navController.navigate("questionnaire")
                            },
                            onFailure = { errorMessage ->
                                signUpErrorMessage = errorMessage
                            }
                        )
                    } else {
                        signUpErrorMessage = "Please fill in all fields"
                    }
                },
                errorMessage = signUpErrorMessage
            )
        }
    }
}

/** checkCredentials
 * Toiminto tarkistaa käyttäjän tunnistetiedot sisäänkirjautumis yrityksellä.
 * Jos kirjautuminen onnistuu, siirrytään kyselylomakkeelle.
 * Jos epäonnistuu, suoritetaan onError virheilmoitus.
 */

fun checkCredentials(email: String, password: String, navController: NavController, onError: (String) -> Unit) {
    val auth = FirebaseAuth.getInstance()
    auth.signInWithEmailAndPassword(email, password)
        .addOnCompleteListener { task ->
            if(task.isSuccessful) {
                // Navigoidaan MyApp:n questionnaire sivulle onnistuneen sisäänkirjautumisen jälkeen.
                navController.navigate("questionnaire")
            } else {
                onError("Invalid email or password. Please try again.")
            }
        }
}

/** SignInRegisterSection
 * Kirjautumis- ja rekisteröintiosion piirto.
 * Näyttää nimen, sähköpostiosoitteen, salasanan syöttökentät sekä lähetys- ja navigointipainikkeet.
 * Käsittelee vahvistus- kirjautumis- tai rekisteröintitoiminnot virheilmoituket mukaanlukien.
 */

@Composable
fun SignInRegisterSection(
    name: String = "",
    email: String,
    password: String,
    onNameChange: (String) -> Unit = {},
    onEmailChange: (String) -> Unit,
    onPasswordChange: (String) -> Unit,
    onSubmit: () -> Unit,
    buttonText: String,
    switchText: String,
    onSwitchClick: () -> Unit,
    isSignInMode: Boolean,
    navController: NavController,
    onSignIn: (String, String) -> Unit,
    errorMessage: String,
) {

    // Kirjautumisen ja sen syötekenttien virhemuuttujat.
    var signUpResult by remember { mutableStateOf<SignUpResult?>(null) }
    var nameError by remember { mutableStateOf(false)}
    var emailError by remember { mutableStateOf(false)}
    var passwordError by remember { mutableStateOf(false)}

    Column(
        modifier = Modifier.fillMaxWidth(),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // Nimen syötekentän renderöinti, riippuen ollaanko kirjautumistilassa.
        if(!isSignInMode) {
            TextField(
                value = name,
                onValueChange = {
                    onNameChange(it)
                    nameError = it.isEmpty()
                },
                label = { Text("Name") },
                modifier = Modifier.fillMaxWidth()
            )
            // Virheviesti, jos nimikenttä on tyhjä.
            if(nameError) {
                Text(
                    text = "Name is required",
                    color = Color.Red
                )
            }
            Spacer(modifier = Modifier.height(16.dp))
        }

        TextField(
            value = email,
            onValueChange = onEmailChange,
            label = { Text("Email") },
            modifier = Modifier.fillMaxWidth()
        )
        Spacer(modifier = Modifier.height(16.dp))
        TextField(
            value = password,
            onValueChange = onPasswordChange,
            label = { Text("Password") },
            modifier = Modifier.fillMaxWidth(),
            keyboardOptions = KeyboardOptions.Default.copy(
                imeAction = ImeAction.Done
            )
        )
        Spacer(modifier = Modifier.height(16.dp))

        //Kirjautumistulos viesti, jos on saatavilla.
        signUpResult?.let { result ->
            Text(
                text = result.message,
                color = if(result.success) Color.Green else Color.Red
            )
        }

        // Lähetyspainikkeen renderöinti.
        Button(onClick = {
            // Kirjautumiseen tai rekisteröintiin liittyvät toiminnot.
            if(name.isNotEmpty() && email.isNotEmpty() && password.isNotEmpty()) {
                if(name.isEmpty()) {
                    nameError = true
                    signUpResult = SignUpResult(success = false, message = "Name is required.")
                    return@Button
                }
                // Kutsutaan createUser funktiota rekisteröitymiseen.
                createUser(name, email, password,
                    onSuccess = {
                        // Navigoidaan questionnaire -sivulle, jos rekisteröinti onnistuu.
                        signUpResult = SignUpResult(success = true, message = "Sign-up successful")
                        navController.navigate("questionnaire")
                    },
                    onFailure = { errorMessage ->
                        signUpResult = SignUpResult(success = false, message = errorMessage)
                    }
                )
            } else {
                nameError = name.isEmpty()
            }
            // Kutsutaan onSignIn funktiota sisäänkirjautumiseen.
            onSignIn(email, password)
        }) {
            Text(buttonText)
        }
        // Renderöidään nappi vaihtamaan sisäänkirjautumis- ja rekisteröintitilan välillä.
        Button(onClick = onSwitchClick) {
            Text(switchText)
        }

        Spacer(modifier = Modifier.height(16.dp))
        if (errorMessage.isNotEmpty()) {
            Text(
                text = errorMessage,
                color = Color.Red,
            )
        }
    }
}

// Tietoluokka säilömään kirjautumistoiminnon tulosta.
data class SignUpResult(val success: Boolean, val message: String)

/** createUser
 * Luo uuden käyttäjätilin annetulla nimellä, sähköpostilla ja salasanalla.
 */

fun createUser(name: String, email: String, password: String, onSuccess: () -> Unit, onFailure: (String) -> Unit) {
    val auth = FirebaseAuth.getInstance()
    val firestore = FirebaseFirestore.getInstance()

    // Tarkistetaan onko käyttäjä jo olemassa.
    firestore.collection("users")
        .whereEqualTo("email", email)
        .get()
        .addOnSuccessListener { querySnapshot ->
            if (!querySnapshot.isEmpty) {
                onFailure("User with this email already exists.")
            } else {
                // Luo käyttäjätili annetulla sähköpostilla ja salasanalla.
                auth.createUserWithEmailAndPassword(email, password)
                    .addOnSuccessListener { authResult ->
                        val uid = authResult.user?.uid
                        if (uid != null) {
                            // Luodaan käyttäjä dokumentti Firestoreen.
                            val user = hashMapOf(
                                "name" to name,
                                "email" to email,
                                "password" to password
                            )
                            firestore.collection("users")
                                .document(uid)
                                .set(user)
                                .addOnSuccessListener {
                                    onSuccess()
                                }
                                .addOnFailureListener { exception ->
                                    onFailure(exception.message ?: "Error creating user record.")
                                }
                        } else {
                            onFailure("Error creating user account.")
                        }
                    }
                    .addOnFailureListener { exception ->
                        onFailure(exception.message ?: "Error creating user account.")
                    }
            }
        }
        .addOnFailureListener { exception ->
            onFailure(exception.message ?: "Error checking user existence.")
        }
}

/** MyApp
 * Funktio, joka toteuttaa pääikkunan sovellukseen.
 */

@Composable
fun MyApp(userEmail: String) {
    // Sivun seuraamista varten luotu arvo.
    var currentPage by remember { mutableStateOf(1) }

    // Valittujen vastausten seuraamista varten luotu arvo.
    var selectedAnswers by remember { mutableStateOf(List(5) { "" }) } //Track the selected answer

    // Kysymykset säilövä arvo.
    val questions = listOf(
        "Which part of the world do you prefer to visit?",
        "Which landscape do you like the most?",
        "When you go on a trip, what do you prefer to do?",
        "Which cuisine do you prefer?",
        "What kind of weather climate do you like?"
    )

    val answers = listOf(
        listOf("Europe", "America", "Asia", "Africa", "Russia"),
        listOf("Mountains", "Forest", "Highland", "Coast", "Valley"),
        listOf("Go hiking", "Get to know the culture", "Travel between cities", "Relax at pool & beach", "Party all night long"),
        listOf("Asian cuisine", "African cuisine", "European cuisine", "Latin American cuisine", "North American cuisine"),
        listOf("Mediterranean climate", "Tropical climate", "Continental climate", "Highland climate", "Desert climate")
    )

    val questionsWithAnswers = listOf(
        "Which part of the world do you prefer to visit?" to listOf("Europe", "America", "Asia", "Africa", "Russia"),
        "Which landscape do you like the most?" to listOf("Mountains", "Forest", "Highland", "Coast", "Valley"),
        "When you go on a trip, what do you prefer to do?" to listOf("Go hiking", "Get to know the culture", "Travel between cities", "Relax at pool & beach", "Party all night long"),
        "Which cuisine do you prefer?" to listOf("Asian cuisine", "African cuisine", "European cuisine", "Latin American cuisine", "North American cuisine"),
        "What kind of weather climate do you like?" to listOf("Mediterranean climate", "Tropical climate", "Continental climate", "Highland climate", "Desert climate")
    )

    // Seurataan tällä arvolla onko kysely lähetetty.
    var isQuestionnaireSubmitted by remember { mutableStateOf(false)}

    // Seurataan vastausten tallennusta.
    var fetchedResults by remember { mutableStateOf<Map<String, Float>?>(null) } //emptyMap()

    // Haetut vastaustulokset Firebase:sta.
    var answersSaved by remember { mutableStateOf(false) }
    Column(
        modifier = Modifier
            .padding(8.dp)
            .fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        // Esitetään sen hetkisen sivun kysymys ja valintapainikkeet.
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier.padding(bottom = 8.dp)
        ) {
            Text(text = questions[currentPage - 1])
            Spacer(modifier = Modifier.height(16.dp))
            Column(
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                answers[currentPage - 1].forEachIndexed { index, answer ->
                    Row(verticalAlignment = Alignment.CenterVertically,
                        modifier = Modifier.selectable(
                            selected = (selectedAnswers[currentPage - 1] == answer),
                            onClick = {
                                selectedAnswers = selectedAnswers.toMutableList().apply {
                                    this[currentPage - 1] = answer
                                }
                            }
                        )) {
                        RadioButton(
                            selected = (selectedAnswers[currentPage - 1] == answer),
                            onClick = {
                                selectedAnswers = selectedAnswers.toMutableList().apply {
                                    this[currentPage - 1] = answer
                                }
                            }
                        )
                        Text(text = answer, modifier = Modifier.padding(start = 8.dp))
                    }
                }
            }
            Spacer(modifier = Modifier.height(16.dp))
            Button(onClick = {
                if (!isQuestionnaireSubmitted && selectedAnswers.none { it.isEmpty() }) {
                    isQuestionnaireSubmitted = true
                    incrementScores(selectedAnswers)
                    submitAnswers(userEmail, selectedAnswers) {
                        answersSaved = true
                    }
                } },
                enabled = selectedAnswers.none { it.isEmpty() } && !isQuestionnaireSubmitted,
                colors = ButtonDefaults.buttonColors(
                    contentColor = if(selectedAnswers.none { it.isEmpty() } && !isQuestionnaireSubmitted) MaterialTheme.colorScheme.onPrimary else Color.Gray
                )) {
                Text("Confirm")
            }
            if(answersSaved) {
                Text(
                    text = "Saved successfully",
                    color = Color.Green,
                    modifier = Modifier.padding(top = 8.dp)
                )
            }
            Button(onClick = { /* Fetch data from Firebase and display percentages */
                if(isQuestionnaireSubmitted) {
                    calculateTotalScores { totalScores ->
                        fetchedResults = totalScores
                    }
                }
            },
                enabled = isQuestionnaireSubmitted,
            ) {
                Text("Get Results")
            }
        }

        //Sivujen navigointipainikkeet.
        Row(
            horizontalArrangement = Arrangement.SpaceEvenly,
            modifier = Modifier.fillMaxWidth()
        ) {
            Button(onClick = { if (currentPage > 1) {
                currentPage--
            } },
                enabled = currentPage > 1,
                colors = ButtonDefaults.buttonColors(
                    contentColor = if (currentPage > 1) MaterialTheme.colorScheme.onPrimary else Color.Gray
                )
                ) {
                Text("Previous page")
            }
            Button(onClick = { if (currentPage < 5) {
                currentPage++
            } },
                enabled = currentPage < 5,
                colors = ButtonDefaults.buttonColors(
                    contentColor = if (currentPage < 5) MaterialTheme.colorScheme.onPrimary else Color.Gray
                )
                ) {
                Text("Next page")
            }
        }
        // Näytetään haetut tulokset, jos on saatavilla.
        fetchedResults?.let { results ->
            ResultsSection(questionsWithAnswers, results)
        }

    }
}

/** ResultsSection
 * Funktio esittämään kyselyn tulokset.
 */

@Composable
fun ResultsSection(questionsWithAnswers: List<Pair<String, List<String>>>, results: Map<String, Float>) {
    Column(
        modifier = Modifier.padding(8.dp)
    ) {
        Text(
            text = "Results:",
            style = MaterialTheme.typography.titleMedium,
            modifier = Modifier.padding(bottom = 4.dp)
        )
        Spacer(modifier = Modifier.height(8.dp))
        // Scrollattava laatikko tulosten selaamiseen.
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .fillMaxHeight()
                .verticalScroll(rememberScrollState())
        ) {
            Column {
                // Läpiluetaan jokainen kysymys ja niiden tulokset.
                questionsWithAnswers.forEach { (question, answers) ->
                    Text(
                        text = question,
                        style = MaterialTheme.typography.titleMedium,
                        modifier = Modifier.padding(bottom = 4.dp)
                    )
                    // Annetaan jokaisen vastauksen perässä prosentuaalinen lukumäärä.
                    answers.forEach { answer ->
                        Text(
                            text = "$answer: ${results[answer]?.toInt()}%",
                            style = MaterialTheme.typography.bodyMedium,
                            modifier = Modifier.padding(bottom = 4.dp)
                        )
                    }
                }
            }
        }
    }
}

/** incrementScores
 * Funktio pisteiden lisäämiseen valittujen vastausten perusteella.
 */

fun incrementScores(answers: List<String>) {
    val db = Firebase.firestore

    // Läpiluetaan valitut vastaukset.
    answers.forEach { answer ->
        // Viitataan scores-dokumenttiin Firebasessa.
        val scoreRef = db.collection("scores").document(answer)

        // Nostetaan tietokannassa olevan vastauksen pistemäärää.
        db.runTransaction { transaction ->
            val currentScore = transaction.get(scoreRef).getLong("score") ?: 0
            transaction.update(scoreRef, "score", currentScore + 1)
        }
    }
}

/** calculateTotalScores
 * Funktio, joka laskee kunkin vastauksen kokonaispisteet ja prosenttiosuudet.
 */

fun calculateTotalScores(onComplete: (Map<String, Float>) -> Unit) {
    val db = Firebase.firestore

    // Haetaan pisteet "scores" kokoelmasta.
    db.collection("scores")
        .get()
        .addOnSuccessListener { documents ->
            val totalScores = mutableMapOf<String, Long>()
            var totalCount = 0L
            var totalUsersCount = 0L

            // Läpiluetaan jokainen dokumentti kokoelmasta.
            for(document in documents) {
                val score = document.getLong("score") ?: 0
                totalCount += score
                val answer = document.getString("answer") ?: ""
                totalScores[answer] = score
            }
            // Haetaan käyttäjämäärät "answers" kokoelmasta.
            db.collection("answers")
                .get()
                .addOnSuccessListener { documents ->
                    totalUsersCount = documents.size().toLong()
                    // Lasketaan jokaisen vastauksen prosenttimäärä.
                    val percentages = mutableMapOf<String, Float>()
                    for ((answer, score) in totalScores) {
                        val percentage = (score.toFloat() / totalUsersCount) * 100
                        percentages[answer] = percentage
                    }
                    // Takaisinkutsu lasketuille prosenteille.
                    onComplete(percentages)
                }
                .addOnFailureListener { e ->
                    println("Error fetching scores: $e")
                    onComplete(emptyMap())
                }
        }
        .addOnFailureListener { e ->
            println("Error fetching scores: $e")
            onComplete(emptyMap())
        }
}

/** submitAnswers
 * Funktio lähettämään käyttäjien vastaukset tietokantaan.
 */

fun submitAnswers(userEmail: String, answers: List<String>, onComplete: () -> Unit) {
    val db = Firebase.firestore

    // Vastausten lähetys "answers" kokoelmaan Firebase:ssa.
    db.collection("answers")
        .add(mapOf("userEmail" to userEmail, "answers" to answers))
        .addOnSuccessListener { documentReference ->
            println("Answers submitted successfully with ID: ${documentReference.id}")
            onComplete()
        }
        .addOnFailureListener { e ->
            println("Error submitting answers: $e")
            onComplete()
        }
}
