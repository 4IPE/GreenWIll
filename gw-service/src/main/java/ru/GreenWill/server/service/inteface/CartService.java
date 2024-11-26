package ru.GreenWill.server.service.inteface;

import jakarta.servlet.http.HttpServletRequest;
import ru.GreenWill.Dto.model.Cart.CartDto;
import ru.GreenWill.Dto.model.Cart.CartOutDto;

public interface CartService {
    void saveCart(CartDto cartDto);

    CartOutDto getCartUser(HttpServletRequest request);

    void deleteCartUser(HttpServletRequest request);
}
