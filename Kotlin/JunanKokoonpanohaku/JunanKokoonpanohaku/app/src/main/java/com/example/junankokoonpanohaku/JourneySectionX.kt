package com.example.junankokoonpanohaku

data class JourneySectionX(
    val beginTimeTableRow: BeginTimeTableRowX,
    val endTimeTableRow: EndTimeTableRowX,
    val locomotives: List<LocomotiveX>,
    val maximumSpeed: Int,
    val totalLength: Int,
    val wagons: List<WagonX>
)