package ru.GreenWill.server.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import ru.GreenWill.Dto.model.CartItem.CartItemDto;
import ru.GreenWill.server.model.CartItem;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = {ProductMapper.class})
public interface CartItemMapper {

    @Mapping(source = "product", target = "product")
    @Mapping(source = "countProducts", target = "countProducts")
    CartItem toCartItem(CartItemDto cartItemDto);

    @Mapping(source = "product", target = "product")
    @Mapping(source = "countProducts", target = "countProducts")
    CartItemDto toCartItemOutDto(CartItem cartItem);
}
