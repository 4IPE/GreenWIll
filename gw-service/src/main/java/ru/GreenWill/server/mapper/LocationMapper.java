package ru.GreenWill.server.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import ru.GreenWill.Dto.model.Location.LocationDto;
import ru.GreenWill.server.model.Location;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface LocationMapper {
    Location toLocation(LocationDto locationDto);
    LocationDto toLocationDto(Location location);
}
