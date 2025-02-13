package ru.GreenWill.Dto.model.User;

import jakarta.validation.constraints.*;

/**
 * Data Transfer Object (DTO), представляющий данные пользователя.
 * Используется для передачи имени пользователя и пароля.
 *
 * @param username Имя пользователя. Не должно быть пустым, null или состоять из пробелов.
 * @param password Пароль пользователя. Не должен быть пустым, null или состоять из пробелов.
 */
public record UserSingUpDto(@NotNull
                            @NotEmpty
                            @NotBlank
                            @Size(min = 5, max = 50, message = "Имя пользователя должно содержать от 5 до 50 символов")
                            String username,
                            @NotNull
                            @NotEmpty
                            @NotBlank
                            @Email
                            String email,
                            @NotNull
                            @NotEmpty
                            @NotBlank
                            @Size(max = 255, message = "Длина пароля должна быть не более 255 символов")
                            String password,
                            boolean termsAccepted) {
}
