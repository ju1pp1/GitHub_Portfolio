package com.example.kokoonpanohaku

data class JourneySection(
    val beginTimeTableRow: BeginTimeTableRow,
    val endTimeTableRow: EndTimeTableRow,
    val locomotives: List<Locomotive>,
    val maximumSpeed: Int,
    val totalLength: Int,
    val wagons: List<Wagon>
)