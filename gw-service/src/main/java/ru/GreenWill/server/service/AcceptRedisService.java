package ru.GreenWill.server.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;


@Service
@RequiredArgsConstructor
@Slf4j
public class AcceptRedisService {
    private final StringRedisTemplate redisTemplate;

    private static final String MANAGER_LOAD_KEY = "key-auth";

    public void saveAcceptedCodeAuth(String key, String val) {
        try {
            redisTemplate.opsForHash().put(MANAGER_LOAD_KEY, val, key);
            redisTemplate.expire(MANAGER_LOAD_KEY, Duration.ofMinutes(10));
            log.info("Код сохранен для пользователя: {}", val);
        } catch (Exception e) {
            log.error("Ошибка при сохранении кода: {}", e.getMessage(), e);
            throw new RuntimeException("Ошибка при сохранении кода подтверждения", e);
        }
    }

    public boolean isAcceptedKeyValid(String key, String val) {
        try {
            Object storedKey = redisTemplate.opsForHash().get(MANAGER_LOAD_KEY, val);

            if (storedKey == null) {
                log.warn("Код не найден для пользователя: {}", val);
                return false;
            }

            boolean isValid = key.equals(storedKey.toString());

            if (!isValid) {
                log.warn("Код не совпадает для пользователя: {}", val);
            } else {
                log.info("Код успешно подтвержден для пользователя: {}", val);
                redisTemplate.opsForHash().delete(MANAGER_LOAD_KEY, val);
            }

            return isValid;
        } catch (Exception e) {
            log.error("Ошибка при проверке кода: {}", e.getMessage(), e);
            throw new RuntimeException("Ошибка при проверке кода подтверждения", e);
        }
    }

}
