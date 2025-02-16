package ru.GreenWill.server.service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.GreenWill.Dto.model.Order.OrderDto;
import ru.GreenWill.Dto.model.Order.OrderOutDto;
import ru.GreenWill.server.enumarated.RoleName;
import ru.GreenWill.server.enumarated.Status;
import ru.GreenWill.server.exception.FewRightsException;
import ru.GreenWill.server.exception.ResourceNotFoundException;
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
        order.setStatus(Status.WAITING);
        order.setCook(null);
        order.setCourier(null);
        orderRepository.save(order);
    }

    @Override
    public List<OrderOutDto> getActiveOrders(HttpServletRequest request) {
        User user = userService.getUserWithCookie(request);
        return orderRepository.findByUser_IdAndStatusIn(
                        user.getId(),
                        List.of(Status.WAITING, Status.ACTIVITY, Status.GOES, Status.RUN)
                )
                .stream()
                .map(orderMapper::toOrderOutDto)
                .toList();
    }

    @Override
    public List<OrderOutDto> getAllOrderHistory(HttpServletRequest request) {
        User user = userService.getUserWithCookie(request);
        return orderRepository.findByUser_IdAndStatusIn(
                        user.getId(),
                        List.of(Status.COMPLETED, Status.REJECTED)
                )
                .stream()
                .map(orderMapper::toOrderOutDto)
                .toList();
    }

    @Override
    public void setStatusOrder(HttpServletRequest request, Long id, String status) {
        User user = userService.getUserWithCookie(request);
        if (status.equals(Status.ACTIVITY.name()) || status.equals(Status.GOES.name())
                || status.equals(Status.REJECTED.name())) {
            if (!user.getRole().getRole().equals(RoleName.ROLE_COOK)) {
                throw new FewRightsException("Только повар может изменить этот статус");
            }
        } else if (status.equals(Status.COMPLETED.name())) {
            if (!user.getRole().getRole().equals(RoleName.ROLE_COURIER)) {
                throw new FewRightsException("Только курьер может изменить этот статус");
            }
        }

        Order order = orderRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Заказ не был найден"));
        order.setStatus(Status.valueOf(status));
        orderRepository.save(order);
    }

    @Override
    public void setStatusOrderWithCook(HttpServletRequest request, Long id, String status) {
        User user = userService.getUserWithCookie(request);
        if (status.equals(Status.ACTIVITY.name()) || status.equals(Status.GOES.name())) {
            if (!user.getRole().getRole().equals(RoleName.ROLE_COOK)) {
                throw new FewRightsException("Только повар может изменить этот статус");
            }
        }

        Order order = orderRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Заказ не был найден"));
        order.setCook(user);
        order.setStatus(Status.valueOf(status));
        orderRepository.save(order);
    }

    @Override
    public void setStatusOrderWithCurier(HttpServletRequest request, Long id, String status) {
        User user = userService.getUserWithCookie(request);
        if (!user.getRole().getRole().equals(RoleName.ROLE_COURIER)) {
            throw new FewRightsException("Только курьер может изменить этот статус");
        }
        Order order = orderRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Заказ не был найден"));
        order.setCourier(user);
        order.setStatus(Status.valueOf(status));
        orderRepository.save(order);
    }


    @Override
    public List<OrderOutDto> getOrdersByStatus(HttpServletRequest request, Status status) {
        User user = userService.getUserWithCookie(request);

        if (status == Status.WAITING && !user.getRole().getRole().equals(RoleName.ROLE_COOK)) {
            throw new FewRightsException("Only cooks can view waiting orders");
        }
        if ((status == Status.GOES || status == Status.RUN) &&
                !user.getRole().getRole().equals(RoleName.ROLE_COURIER)) {
            throw new FewRightsException("Only couriers can view delivery orders");
        }

        if (user.getRole().getRole().equals(RoleName.ROLE_COOK) && status == Status.WAITING) {
            return orderRepository.findByStatusIn(List.of(Status.WAITING, Status.ACTIVITY))
                    .stream()
                    .map(orderMapper::toOrderOutDto)
                    .toList();
        }

        if (user.getRole().getRole().equals(RoleName.ROLE_COURIER)) {
            if (status == Status.GOES) {
                return orderRepository.findByStatus(Status.GOES)
                        .stream()
                        .map(orderMapper::toOrderOutDto)
                        .toList();
            }
            if (status == Status.RUN) {
                return orderRepository.findByStatus(Status.RUN)
                        .stream()
                        .map(orderMapper::toOrderOutDto)
                        .toList();
            }
        }

        return orderRepository.findByStatus(status)
                .stream()
                .map(orderMapper::toOrderOutDto)
                .toList();
    }
}
