package ru.GreenWill.server.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.GreenWill.Dto.model.Cart.CartOutDto;
import ru.GreenWill.server.exception.ResourceNotFoundException;
import ru.GreenWill.server.mapper.CartMapper;
import ru.GreenWill.server.model.Cart;
import ru.GreenWill.server.model.CartItem;
import ru.GreenWill.server.model.Product;
import ru.GreenWill.server.model.User;
import ru.GreenWill.server.repository.CartItemRepository;
import ru.GreenWill.server.repository.CartRepository;
import ru.GreenWill.server.repository.ProductRepository;
import ru.GreenWill.server.service.inteface.CartService;
import ru.GreenWill.server.service.inteface.UserService;

import java.util.HashSet;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserService userService;
    private final CartMapper cartMapper;

    @Override
    public CartOutDto getCart(HttpServletRequest request) {
        User user = userService.getUserWithCookie(request);
        Cart cart = cartRepository.findByUser_Id(user.getId());
        if (cart == null) {
            cart = new Cart();
            cart.setUser(user);
            cart.setCartItems(new HashSet<>());
            cart = cartRepository.save(cart);
        }
        return cartMapper.toCartOutDto(cart);
    }

    @Override
    public CartOutDto addToCart() {
        return null;
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
        Cart cart = cartRepository.findByUser_Id(user.getId());
        if (cart == null) {
            cart = new Cart();
            cart.setUser(user);
            cart.setCartItems(new HashSet<>());
            cart = cartRepository.save(cart);
        }
        return cart;
    }
}
