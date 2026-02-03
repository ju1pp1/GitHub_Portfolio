package com.example.junankokoonpanohaku

data class kokoonpano2(
    val departureDate: String,
    val journeySections: List<JourneySectionX>,
    val operatorShortCode: String,
    val operatorUICCode: Int,
    val trainCategory: String,
    val trainNumber: Int,
    val trainType: String,
    val version: Long
)