package ru.GreenWill.server.service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.GreenWill.Dto.model.Cart.CartDto;
import ru.GreenWill.Dto.model.Cart.CartOutDto;
import ru.GreenWill.server.mapper.CartMapper;
import ru.GreenWill.server.model.Cart;
import ru.GreenWill.server.model.User;
import ru.GreenWill.server.repository.CartRepository;
import ru.GreenWill.server.service.inteface.CartService;
import ru.GreenWill.server.service.inteface.UserService;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final UserService userService;
    private final CartMapper cartMapper;

    @Override
    public void saveCart(CartDto cartDto) {
        Cart cart = cartMapper.toCart(cartDto);
        cartRepository.save(cart);
    }

    @Override
    public CartOutDto getCartUser(HttpServletRequest request) {
        User user = userService.getUserWithCookie(request);
        return cartMapper.toCartOutDto(cartRepository.findByUser_Id(user.getId()));
    }

    @Override
    public void deleteCartUser(HttpServletRequest request) {
        User user = userService.getUserWithCookie(request);
        cartRepository.deleteByUser_Id(user.getId());
    }
}
