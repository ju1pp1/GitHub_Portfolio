package com.example.sensorstask2

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "steps")
data class StepCount(
    @PrimaryKey(autoGenerate = true)
    val id: Int = 0,
    val steps: Long = 0,
    val createdAt: String
)
