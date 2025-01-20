package ru.GreenWill.server.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ru.GreenWill.Dto.model.Order.OrderDto;
import ru.GreenWill.Dto.model.Order.OrderOutDto;
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


}
