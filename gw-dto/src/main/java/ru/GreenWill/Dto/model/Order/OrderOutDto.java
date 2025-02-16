package ru.GreenWill.Dto.model.Order;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import ru.GreenWill.Dto.model.Cart.CartOutDto;
import ru.GreenWill.Dto.model.Location.LocationDto;
import ru.GreenWill.Dto.model.User.UserOutDto;

public record OrderOutDto(
    @NotNull Long id,
    @NotNull @NotEmpty @NotBlank String status,
    @NotNull UserOutDto user,
    @NotNull CartOutDto cart,
    @NotNull LocationDto address,
    String phone
) {}