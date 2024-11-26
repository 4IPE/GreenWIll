package ru.GreenWill.server.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import ru.GreenWill.Dto.model.CartItem.CartItemDto;
import ru.GreenWill.Dto.model.CartItem.CartItemOutDto;
import ru.GreenWill.server.model.CartItem;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CartItemMapper {

    CartItem toCartItem(CartItemDto cartItemDto);

    CartItemOutDto toCartItemOutDto(CartItem cartItem);
}
