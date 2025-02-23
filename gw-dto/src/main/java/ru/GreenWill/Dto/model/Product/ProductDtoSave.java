package ru.GreenWill.Dto.model.Product;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDtoSave {
    @NotNull
    @NotEmpty
    @NotBlank
    String name;
    @NotNull
    @NotEmpty
    @NotBlank
    String description;
    @NotNull
    @NotEmpty
    @NotBlank
    @PositiveOrZero
    Integer price;
    @NotNull
    @NotEmpty
    @NotBlank
    @PositiveOrZero
    Integer calories;
    @NotNull
    @NotEmpty
    @NotBlank
    String category;
    @NotNull
    @NotEmpty
    @NotBlank
    String img;
    @NotNull
    @NotEmpty
    @NotBlank
    Integer fats;
    @NotNull
    @NotEmpty
    @NotBlank
    Integer proteins;
    @NotNull
    @NotEmpty
    @NotBlank
    Integer carbohydrates;

}
