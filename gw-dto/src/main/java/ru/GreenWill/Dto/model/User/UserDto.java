package ru.GreenWill.Dto.model.User;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * Data Transfer Object (DTO), представляющий данные пользователя.
 * Используется для передачи имени пользователя и пароля.
 *
 * @param username Имя пользователя. Не должно быть пустым, null или состоять из пробелов.
 * @param password Пароль пользователя. Не должен быть пустым, null или состоять из пробелов.
 */
public record UserDto(@NotNull @NotEmpty @NotBlank @Size(max = 255,message = "Слишком длинное имя !") String username,
                      @NotNull @NotEmpty @NotBlank String password) {
}
