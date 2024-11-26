package ru.GreenWill.Dto.model.Product;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;


public record ProductDto(@NotNull @NotEmpty @NotBlank String name,
                         @NotNull @NotEmpty @NotBlank String description,
                         @NotNull @NotEmpty @NotBlank @PositiveOrZero Integer price,
                         @NotNull @NotEmpty @NotBlank @PositiveOrZero Integer calories,
                         @NotNull @NotEmpty @NotBlank String category,
                         @NotNull @NotEmpty @NotBlank String img) {
}
