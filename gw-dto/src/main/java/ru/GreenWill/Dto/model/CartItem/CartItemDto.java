package ru.GreenWill.Dto.model.CartItem;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import ru.GreenWill.Dto.model.Product.ProductDto;

public record CartItemDto(
    @NotNull ProductDto product,
    @NotNull Long countProducts
) {}
