package ru.GreenWill.server.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import ru.GreenWill.Dto.model.Cart.CartDto;
import ru.GreenWill.Dto.model.Cart.CartOutDto;
import ru.GreenWill.server.model.Cart;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = {CartItemMapper.class, UserMapper.class})
public interface CartMapper {

    Cart toCart(CartDto cartDto);

    CartOutDto toCartOutDto(Cart cart);
}
