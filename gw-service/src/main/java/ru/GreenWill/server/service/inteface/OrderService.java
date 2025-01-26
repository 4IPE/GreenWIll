package ru.GreenWill.server.service.inteface;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import ru.GreenWill.Dto.model.Order.OrderDto;
import ru.GreenWill.Dto.model.Order.OrderOutDto;
import ru.GreenWill.server.enumarated.Status;

import java.util.List;

public interface OrderService {

    @Transactional
    void saveOrder(OrderDto orderDto);

    List<OrderOutDto> getActiveOrders(HttpServletRequest request);

    List<OrderOutDto> getAllOrderHistory(HttpServletRequest request);
    @Transactional
    void setStatusOrder(HttpServletRequest request, Long id, String status);

    void setStatusOrderWithCook(HttpServletRequest request, Long id, String status);

    @Transactional
    void setStatusOrderWithCurier(HttpServletRequest request, Long id, String status);

    List<OrderOutDto> getOrdersByStatus(HttpServletRequest request, Status status);
}
