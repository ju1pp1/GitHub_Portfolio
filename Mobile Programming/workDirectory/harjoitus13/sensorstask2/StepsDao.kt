package com.example.sensorstask2

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query

@Dao
interface StepsDao {

    @Insert
    suspend fun insertAll(stepCount: StepCount)

    @Query("SELECT * FROM steps")
    suspend fun getAllSteps(): List<StepCount>

}