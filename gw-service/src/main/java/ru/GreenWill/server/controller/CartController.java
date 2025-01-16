package ru.GreenWill.server.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.GreenWill.Dto.model.Cart.CartOutDto;
import ru.GreenWill.Dto.model.CartItem.CartItemDto;
import ru.GreenWill.server.service.inteface.CartService;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
@Slf4j
public class CartController {
    private final CartService cartService;

    @GetMapping
    public ResponseEntity<CartOutDto> getCart(HttpServletRequest request) {
        log.info("Получение корзины пользователя");
        return ResponseEntity.ok(cartService.getCart(request));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody CartItemDto itemDto, HttpServletRequest request) {
        log.info("Добавление товара в корзину: {}", itemDto);
        cartService.addToCart(itemDto,request);
        return ResponseEntity.ok("cartService.addToCart(itemDto,request)");
    }

    @PutMapping("/update")
    public ResponseEntity<CartOutDto> updateCartItem(
            @RequestParam Long productId,
            @RequestParam Long quantity,
            HttpServletRequest request) {
        log.info("Обновление количества товара в корзине");
        return ResponseEntity.ok(cartService.updateCartItem(productId, quantity, request));
    }

    @DeleteMapping("/remove")
    public ResponseEntity<CartOutDto> removeFromCart(
            @RequestParam Long productId,
            HttpServletRequest request) {
        log.info("Удаление товара из корзины");
        return ResponseEntity.ok(cartService.removeFromCart(productId, request));
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart(HttpServletRequest request) {
        log.info("Очистка корзины");
        cartService.clearCart(request);
        return ResponseEntity.ok().build();
    }
}
