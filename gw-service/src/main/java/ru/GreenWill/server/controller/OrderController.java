package ru.GreenWill.server.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.GreenWill.Dto.model.Order.OrderDto;
import ru.GreenWill.Dto.model.Order.OrderOutDto;
import ru.GreenWill.server.annotation.RateLimit;
import ru.GreenWill.server.enumarated.Status;
import ru.GreenWill.server.service.inteface.OrderService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Validated
@Slf4j
public class OrderController {
    private final OrderService orderService;

    @GetMapping("/orders/active")
    @RateLimit
    public ResponseEntity<List<OrderOutDto>> getActiveOrders(HttpServletRequest request) {
        return ResponseEntity.ok(orderService.getActiveOrders(request));
    }

    @GetMapping("/orders/history")
    @Cacheable(value = "orders")
    public ResponseEntity<List<OrderOutDto>> getOrderHistory(HttpServletRequest request) {
        return ResponseEntity.ok(orderService.getAllOrderHistory(request));
    }

    @PostMapping("/order/create")
    @RateLimit(1)
    public ResponseEntity<?> createOrder(@RequestBody OrderDto orderDto) {
        orderService.saveOrder(orderDto);
        return ResponseEntity.ok().body("Success");
    }

    @PatchMapping("/order/status")
    @RateLimit
    public ResponseEntity<?> setStatus(HttpServletRequest request, @RequestParam String status,
                                       @RequestParam Long idOrder) {
        orderService.setStatusOrder(request, idOrder, status);
        return ResponseEntity.ok().body("Success");
    }

    @GetMapping("/orders/waiting")
    @RateLimit
    public ResponseEntity<List<OrderOutDto>> getWaitingOrders(HttpServletRequest request) {
        return ResponseEntity.ok(orderService.getOrdersByStatus(request, Status.WAITING));
    }

    @GetMapping("/orders/delivery")
    @RateLimit
    public ResponseEntity<List<OrderOutDto>> getDeliveryOrders(HttpServletRequest request) {
        return ResponseEntity.ok(orderService.getOrdersByStatus(request, Status.GOES));
    }

    //Принят
    @PatchMapping("/order/status/accept")
    @RateLimit
    public ResponseEntity<?> acceptOrder(HttpServletRequest request, @RequestParam Long orderId) {
        orderService.setStatusOrderWithCook(request, orderId, Status.ACTIVITY.name());
        return ResponseEntity.ok().body("Order accepted");
    }

    //Готов
    @PatchMapping("/order/status/ready")
    @RateLimit
    public ResponseEntity<?> readyOrder(HttpServletRequest request, @RequestParam Long orderId) {
        orderService.setStatusOrderWithCook(request, orderId, Status.GOES.name());
        return ResponseEntity.ok().body("Order ready for delivery");
    }

    //Отправлен в доставку
    @PatchMapping("/order/status/delivered")
    @RateLimit
    public ResponseEntity<?> deliveredOrder(HttpServletRequest request, @RequestParam Long orderId) {
        orderService.setStatusOrderWithCurier(request, orderId, Status.COMPLETED.name());
        return ResponseEntity.ok().body("Order delivered");
    }

    //Доставляется
    @GetMapping("/orders/running")
    @RateLimit
    public ResponseEntity<List<OrderOutDto>> getRunningOrders(HttpServletRequest request) {
        return ResponseEntity.ok(orderService.getOrdersByStatus(request, Status.RUN));
    }

    //Доставлен
    @PatchMapping("/order/status/take")
    @CacheEvict(value = "orders", allEntries = true)
    public ResponseEntity<?> takeOrderForDelivery(HttpServletRequest request, @RequestParam Long orderId) {
        orderService.setStatusOrderWithCurier(request, orderId, Status.RUN.name());
        return ResponseEntity.ok().body("Order taken for delivery");
    }
}
