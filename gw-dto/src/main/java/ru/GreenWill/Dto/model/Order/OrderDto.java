package ru.GreenWill.Dto.model.Order;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import ru.GreenWill.Dto.model.Cart.CartDto;
import ru.GreenWill.Dto.model.User.UserDto;


public record OrderDto(@NotNull @NotEmpty @NotBlank UserDto user,
                       @NotNull @NotEmpty @NotBlank CartDto cart) {
}
