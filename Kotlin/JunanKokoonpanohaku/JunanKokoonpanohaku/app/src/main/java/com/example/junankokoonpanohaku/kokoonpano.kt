package com.example.junankokoonpanohaku

data class kokoonpano(
    val departureDate: String,
    val journeySections: List<JourneySection>,
    val operatorShortCode: String,
    val operatorUICCode: Int,
    val trainCategory: String,
    val trainNumber: Int,
    val trainType: String,
    val version: Long
)