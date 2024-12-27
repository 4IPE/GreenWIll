package ru.GreenWill.server.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.GreenWill.Dto.model.Order.OrderOutDto;
import ru.GreenWill.server.service.inteface.OrderService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Validated
@Slf4j
public class OrderController {
    private final OrderService orderService;

    @GetMapping("/orders")
    public ResponseEntity<List<OrderOutDto>> getUserOrders(HttpServletRequest request) {
        return ResponseEntity.ok(orderService.getAllOrderUser(request));
    }


}
