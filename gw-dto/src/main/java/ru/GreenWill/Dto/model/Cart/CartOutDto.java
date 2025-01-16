package ru.GreenWill.Dto.model.Cart;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import ru.GreenWill.Dto.model.CartItem.CartItemDto;
import ru.GreenWill.Dto.model.CartItem.CartItemOutDto;
import ru.GreenWill.Dto.model.User.UserOutDto;

import java.util.Set;

public record CartOutDto(@NotNull @NotEmpty @NotBlank UserOutDto user,
                        @NotNull @NotEmpty @NotBlank Set<CartItemDto> cartItem) {
}
