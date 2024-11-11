package ru.GreenWill.Dto.model.CartItem;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import ru.GreenWill.Dto.model.Product.ProductDto;
import ru.GreenWill.Dto.model.Product.ProductOutDto;


public record CartItemOutDto(@NotNull @NotEmpty @NotBlank ProductOutDto product,
                          @NotNull @NotEmpty @NotBlank Long countProducts) {
}
//TODO