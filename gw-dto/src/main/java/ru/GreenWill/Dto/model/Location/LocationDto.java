package ru.GreenWill.Dto.model.Location;

public record LocationDto(
    String city,
    String street,
    String house,
    String apartment,
    Integer floor,
    Integer entrance,
    Double latitude,
    Double longitude
) {} 