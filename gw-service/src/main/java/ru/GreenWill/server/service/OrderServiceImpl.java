package ru.GreenWill.server.service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.GreenWill.Dto.model.Order.OrderDto;
import ru.GreenWill.Dto.model.Order.OrderOutDto;
import ru.GreenWill.server.enumarated.Status;
import ru.GreenWill.server.mapper.OrderMapper;
import ru.GreenWill.server.model.Order;
import ru.GreenWill.server.model.User;
import ru.GreenWill.server.repository.OrderRepository;
import ru.GreenWill.server.service.inteface.OrderService;
import ru.GreenWill.server.service.inteface.UserService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;
    private final UserService userService;

    @Override
    public void saveOrder(OrderDto orderDto) {
        Order order = orderMapper.toOrder(orderDto);
        order.setStatus(Status.ACTIVITY);
        orderRepository.save(order);
    }

    @Override
    public List<OrderOutDto> getAllOrderUser(HttpServletRequest request) {
        User user = userService.getUserWithCookie(request);
        return orderRepository.findByUser_Id(user.getId()).stream().map(orderMapper::toOrderOutDto).toList();
    }
}
