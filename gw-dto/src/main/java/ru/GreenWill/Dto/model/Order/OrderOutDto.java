package ru.GreenWill.Dto.model.Order;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import ru.GreenWill.Dto.model.Cart.CartOutDto;
import ru.GreenWill.Dto.model.User.UserOutDto;


public record OrderOutDto(@NotNull @NotEmpty @NotBlank UserOutDto user,
                          @NotNull @NotEmpty @NotBlank CartOutDto cart,
                          @NotNull Long id,
                          @NotNull @NotEmpty @NotBlank String status) {
}