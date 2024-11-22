package ru.GreenWill.Dto.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

/**
 * Data Transfer Object (DTO), представляющий роль пользователя.
 * Используется для передачи данных о роли.
 *
 * @param role Название роли. Не должно быть пустым, null или состоять из пробелов.
 */
public record RoleDto(@NotNull @NotEmpty @NotBlank String role) {
}
