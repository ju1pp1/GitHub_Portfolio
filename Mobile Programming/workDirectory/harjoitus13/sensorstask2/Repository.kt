package com.example.sensorstask2

import java.time.Instant

class Repository(private val stepsDao: StepsDao) {

    //Toiminto askelmäärän tallentamiseksi tietokantaan
    suspend fun storeSteps(stepsSinceLastReboot: Long) {
        //Luo StepCount-objekti nykyisellä askelmäärällä ja aikaleimalla
        val stepCount = StepCount(steps = stepsSinceLastReboot, createdAt = Instant.now().toString())
        //Dao:n avulla lisätään StepCount objekti tietokantaan
        stepsDao.insertAll(stepCount)
    }
    //Tarkoituksena oli käyttää tätä hakemaan kaikki tallennettu data tietokannasta
    //Ohjeissa ei kuitenkaan mainittu näkymän luomisesta
    suspend fun getAllSteps(): List<StepCount> {
        return stepsDao.getAllSteps()
    }

}