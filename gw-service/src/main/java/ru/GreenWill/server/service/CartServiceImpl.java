package ru.GreenWill.server.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.GreenWill.Dto.model.Cart.CartOutDto;
import ru.GreenWill.Dto.model.CartItem.CartItemDto;
import ru.GreenWill.server.exception.ResourceNotFoundException;
import ru.GreenWill.server.mapper.CartItemMapper;
import ru.GreenWill.server.mapper.CartMapper;
import ru.GreenWill.server.model.Cart;
import ru.GreenWill.server.model.CartItem;
import ru.GreenWill.server.model.User;
import ru.GreenWill.server.repository.CartItemRepository;
import ru.GreenWill.server.repository.CartRepository;
import ru.GreenWill.server.repository.ProductRepository;
import ru.GreenWill.server.service.inteface.CartService;
import ru.GreenWill.server.service.inteface.UserService;

import java.util.HashSet;

@Service
@RequiredArgsConstructor
@Slf4j
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserService userService;
    private final CartMapper cartMapper;
    private final CartItemMapper cartItemMapper;

    @Override
    public CartOutDto getCart(HttpServletRequest request) {
        User user = userService.getUserWithCookie(request);
        Cart cart = getOrCreateCart(user);
        return cartMapper.toCartOutDto(cart);
    }

    @Override
    public CartOutDto addToCart(CartItemDto item, HttpServletRequest request) {
        User user = userService.getUserWithCookie(request);
        Cart cart = getOrCreateCart(user);
        log.info("Проинцилизированные данный ");
        log.info(cart.toString());
        log.info(user.toString());
        cart.getCartItems().add(cartItemMapper.toCartItem(item));
        cartRepository.save(cart);
        log.info("Сохранненые данный ");
        log.info(cart.toString());
        return cartMapper.toCartOutDto(cart);
    }


    @Override
    @Transactional
    public CartOutDto updateCartItem(Long productId, Long quantity, HttpServletRequest request) {
        User user = userService.getUserWithCookie(request);
        Cart cart = getOrCreateCart(user);

        CartItem item = cartItemRepository.findByCart_IdAndProduct_Id(cart.getId(), productId);
        if (item == null) {
            throw new ResourceNotFoundException("Item not found in cart");
        }

        item.setCountProducts(quantity);
        cartItemRepository.save(item);

        return cartMapper.toCartOutDto(cart);
    }

    @Override
    @Transactional
    public CartOutDto removeFromCart(Long productId, HttpServletRequest request) {
        User user = userService.getUserWithCookie(request);
        Cart cart = getOrCreateCart(user);

        cartItemRepository.deleteByCart_IdAndProduct_Id(cart.getId(), productId);
        return cartMapper.toCartOutDto(cart);
    }

    @Override
    @Transactional
    public void clearCart(HttpServletRequest request) {
        User user = userService.getUserWithCookie(request);
        Cart cart = getOrCreateCart(user);
        cartItemRepository.deleteByCart_Id(cart.getId());
    }

    private Cart getOrCreateCart(User user) {
        log.info("Создание или поиск корзины");
        Cart cart = cartRepository.findByUser_Id(user.getId());
        log.info("Найдена вот такая корзина {}",cart);
        if (cart == null) {
            cart = new Cart();
            log.info("Создание  корзины");
            cart.setUser(user);
            cart.setCartItems(new HashSet<>());
            cart = cartRepository.save(cart);
            log.info("Создана вот такая корзина {}",cart);
        }

        return cart;
    }
}
