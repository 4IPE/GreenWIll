package ru.GreenWill.Dto.model.Cart;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import ru.GreenWill.Dto.model.CartItem.CartItemDto;
import ru.GreenWill.Dto.model.User.UserDto;

import java.util.Set;

public record CartDto(@NotNull @NotEmpty @NotBlank UserDto user,
                     @NotNull @NotEmpty @NotBlank Set<CartItemDto> cartItems) {
}
