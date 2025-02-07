package ru.GreenWill.Dto.model.User;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import ru.GreenWill.Dto.model.Location.LocationDto;
import ru.GreenWill.Dto.model.RoleDto;


public record UserOutDto(
        @NotNull @NotEmpty @NotBlank String username,
        @NotNull @NotEmpty RoleDto role,
        String email,
        String phone,
        String firstName,
        String lastName,
        LocationDto address
) {
}
