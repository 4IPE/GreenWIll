package ru.GreenWill.server.mapper;

import lombok.extern.slf4j.Slf4j;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;
import org.springframework.beans.factory.annotation.Autowired;
import ru.GreenWill.Dto.model.Cart.CartDto;
import ru.GreenWill.Dto.model.Order.OrderDto;
import ru.GreenWill.Dto.model.Order.OrderOutDto;
import ru.GreenWill.Dto.model.User.UserDto;
import ru.GreenWill.server.enumarated.Status;
import ru.GreenWill.server.exception.ResourceNotFoundException;
import ru.GreenWill.server.model.Cart;
import ru.GreenWill.server.model.Order;
import ru.GreenWill.server.model.User;
import ru.GreenWill.server.repository.CartRepository;
import ru.GreenWill.server.repository.UserRepository;

@Slf4j
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = {UserMapper.class, CartMapper.class})
public abstract class OrderMapper {

    @Autowired
    protected UserRepository userRepository;
    @Autowired
    protected CartRepository cartRepository;

    @Mapping(target = "status", ignore = true)
    @Mapping(target = "user", source = "user", qualifiedByName = "findUserByUsername")
    @Mapping(target = "cart", source = "cart", qualifiedByName = "findCartByUserId")
    public abstract Order toOrder(OrderDto orderDto);

    public abstract OrderOutDto toOrderOutDto(Order order);

    @Named("findUserByUsername")
    protected User findUserByUsername(UserDto userDto) {
        if (userDto != null && userDto.username() != null) {
            return userRepository.findByUsername(userDto.username())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        }
        return null;
    }

    @Named("findCartByUserId")
    protected Cart findCartByUserId(CartDto cartDto) {
        if (cartDto != null && cartDto.user() != null) {
            Long id = userRepository.findByUsername(cartDto.user().username())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found")).getId();
            return cartRepository.findByUser_IdAndIsActiveTrue(id).orElseThrow(() -> new ResourceNotFoundException("Корзина не была найдена"));
        }
        return null;
    }

    protected String mapStatusToString(Order order) {
        return order != null ? order.getStatus().toString() : null;
    }

    protected Status mapStringToStatus(String status) {
        return status != null ? Status.valueOf(status) : null;
    }
}
