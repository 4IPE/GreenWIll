package ru.GreenWill.Dto.model.User;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import ru.GreenWill.Dto.model.RoleDto;

import java.util.Set;


public record UserOutDto(@NotNull @NotEmpty @NotBlank String username,
                         @NotNull @NotEmpty RoleDto role,
                         String email,
                         String phone,
                         String firstName,
                         String lastName,
                         String address) {
}
