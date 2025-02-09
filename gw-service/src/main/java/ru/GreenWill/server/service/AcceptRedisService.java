package ru.GreenWill.server.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Slf4j
public class AcceptRedisService {
    private final StringRedisTemplate redisTemplate;

    private static final String MANAGER_LOAD_KEY = "key-auth";

    public void saveAcceptedCodeAuth(String key, String username) {
        try {
            redisTemplate.opsForHash().put(MANAGER_LOAD_KEY, username, key);
            redisTemplate.expire(MANAGER_LOAD_KEY, Duration.ofMinutes(10));
            log.info("Код сохранен для пользователя: {}", username);
        } catch (Exception e) {
            log.error("Ошибка при сохранении кода: {}", e.getMessage(), e);
            throw new RuntimeException("Ошибка при сохранении кода подтверждения", e);
        }
    }

    public boolean isAcceptedKeyValid(String key, String username) {
        try {
            Object storedKey = redisTemplate.opsForHash().get(MANAGER_LOAD_KEY, username);
            
            if (storedKey == null) {
                log.warn("Код не найден для пользователя: {}", username);
                return false;
            }

            boolean isValid = key.equals(storedKey.toString());
            
            if (!isValid) {
                log.warn("Код не совпадает для пользователя: {}", username);
            } else {
                log.info("Код успешно подтвержден для пользователя: {}", username);
                // Удаляем использованный код
                redisTemplate.opsForHash().delete(MANAGER_LOAD_KEY, username);
            }

            return isValid;
        } catch (Exception e) {
            log.error("Ошибка при проверке кода: {}", e.getMessage(), e);
            throw new RuntimeException("Ошибка при проверке кода подтверждения", e);
        }
    }

}
