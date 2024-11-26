package ru.GreenWill.server.service.inteface;

import jakarta.servlet.http.HttpServletRequest;
import ru.GreenWill.Dto.model.Order.OrderDto;
import ru.GreenWill.Dto.model.Order.OrderOutDto;

import java.util.List;

public interface OrderService {


    void saveOrder(OrderDto orderDto);

    List<OrderOutDto> getAllOrderUser(HttpServletRequest request);
}
