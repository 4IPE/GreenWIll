package ru.GreenWill.server.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import ru.GreenWill.Dto.model.Order.OrderDto;
import ru.GreenWill.Dto.model.Order.OrderOutDto;
import ru.GreenWill.server.enumarated.Status;
import ru.GreenWill.server.model.Order;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = {UserMapper.class, CartMapper.class})

public interface OrderMapper {
    @Mapping(target = "status", ignore = true)
    Order toOrder(OrderDto orderDto);

    OrderOutDto toOrderOutDto(Order order);

    default String mapStatusToString(Order order) {
        return order != null ? order.getStatus().toString() : null;
    }

    default Status mapStringToStatus(String status) {
        return status != null ? Status.valueOf(status) : null;
    }
}
