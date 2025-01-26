package ru.GreenWill.server.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.GreenWill.Dto.model.Order.OrderDto;
import ru.GreenWill.Dto.model.Order.OrderOutDto;
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
    public ResponseEntity<List<OrderOutDto>> getActiveOrders(HttpServletRequest request) {
        return ResponseEntity.ok(orderService.getActiveOrders(request));
    }

    @GetMapping("/orders/history")
    public ResponseEntity<List<OrderOutDto>> getOrderHistory(HttpServletRequest request) {
        return ResponseEntity.ok(orderService.getAllOrderHistory(request));
    }

    @PostMapping("/order/create")
    public ResponseEntity<?> createOrder(@RequestBody OrderDto orderDto){
        orderService.saveOrder(orderDto);
        return ResponseEntity.ok().body("Success");
    }

    @PatchMapping("/order/status")
    public ResponseEntity<?> setStatus(HttpServletRequest request, @RequestParam String status,
                                       @RequestParam Long idOrder){
        orderService.setStatusOrder(request,idOrder,status);
        return ResponseEntity.ok().body("Success");
    }

    @GetMapping("/orders/waiting")
    public ResponseEntity<List<OrderOutDto>> getWaitingOrders(HttpServletRequest request) {
        return ResponseEntity.ok(orderService.getOrdersByStatus(request, Status.WAITING));
    }

    @GetMapping("/orders/delivery")
    public ResponseEntity<List<OrderOutDto>> getDeliveryOrders(HttpServletRequest request) {
        return ResponseEntity.ok(orderService.getOrdersByStatus(request, Status.GOES));
    }

    @PatchMapping("/order/status/accept")
    public ResponseEntity<?> acceptOrder(HttpServletRequest request, @RequestParam Long orderId) {
        orderService.setStatusOrderWithCook(request, orderId, Status.ACTIVITY.name());
        return ResponseEntity.ok().body("Order accepted");
    }

    @PatchMapping("/order/status/ready")
    public ResponseEntity<?> readyOrder(HttpServletRequest request, @RequestParam Long orderId) {
        orderService.setStatusOrderWithCook(request, orderId, Status.GOES.name());
        return ResponseEntity.ok().body("Order ready for delivery");
    }

    @PatchMapping("/order/status/delivered")
    public ResponseEntity<?> deliveredOrder(HttpServletRequest request, @RequestParam Long orderId) {
        orderService.setStatusOrderWithCurier(request, orderId, Status.COMPLETED.name());
        return ResponseEntity.ok().body("Order delivered");
    }

    @GetMapping("/orders/running")
    public ResponseEntity<List<OrderOutDto>> getRunningOrders(HttpServletRequest request) {
        return ResponseEntity.ok(orderService.getOrdersByStatus(request, Status.RUN));
    }

    @PatchMapping("/order/status/take")
    public ResponseEntity<?> takeOrderForDelivery(HttpServletRequest request, @RequestParam Long orderId) {
        orderService.setStatusOrderWithCurier(request, orderId, Status.RUN.name());
        return ResponseEntity.ok().body("Order taken for delivery");
    }
}
