package ru.GreenWill.server.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import ru.GreenWill.Dto.model.Cart.CartDto;
import ru.GreenWill.Dto.model.Cart.CartOutDto;
import ru.GreenWill.server.model.Cart;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = {CartItemMapper.class, UserMapper.class})
public interface CartMapper {

    Cart toCart(CartDto cartDto);

    @Mapping(source = "user", target = "user")
    @Mapping(source = "cartItems", target = "cartItem")
    CartOutDto toCartOutDto(Cart cart);
}
