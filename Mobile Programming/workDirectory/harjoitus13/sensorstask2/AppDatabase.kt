package com.example.sensorstask2

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase

@Database(entities = [StepCount::class], version = 1)
abstract class AppDatabase : RoomDatabase() {
    abstract fun stepsDao(): StepsDao

    companion object {
        private var INSTANCE: AppDatabase? = null

        //Luodaan tietokantaobjektin ilmentymä
        fun getInstance(context: Context): AppDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    AppDatabase::class.java,
                    "steps_database"
                ).build()
                INSTANCE = instance
                instance
            }
        }
    }

}