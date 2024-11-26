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
public record UserSingInDto(@NotNull
                            @NotEmpty
                            @NotBlank
                            @Size(min = 5, max = 50, message = "Имя пользователя должно содержать от 5 до 50 символов")
                            String username,
                            @NotNull
                            @NotEmpty
                            @NotBlank
                            @Size(max = 255, message = "Длина пароля должна быть не более 255 символов")
                            String password) {
}
