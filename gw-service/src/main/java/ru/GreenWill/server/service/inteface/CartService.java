package ru.GreenWill.server.service.inteface;

import jakarta.servlet.http.HttpServletRequest;
import ru.GreenWill.Dto.model.Cart.CartDto;
import ru.GreenWill.Dto.model.Cart.CartOutDto;
import ru.GreenWill.Dto.model.CartItem.CartItemDto;

public interface CartService {
    CartOutDto getCart(HttpServletRequest request);
    CartOutDto addToCart();
    CartOutDto updateCartItem(Long productId, Long quantity, HttpServletRequest request);
    CartOutDto removeFromCart(Long productId, HttpServletRequest request);
    void clearCart(HttpServletRequest request);
}
