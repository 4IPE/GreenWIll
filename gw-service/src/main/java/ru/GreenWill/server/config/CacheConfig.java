package ru.GreenWill.server.config;

import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.concurrent.TimeUnit;

@Configuration
@EnableCaching
public class CacheConfig {

    @Bean
    public CacheManager cacheManager() {
        CaffeineCacheManager cacheManager = new CaffeineCacheManager();

        cacheManager.setCacheNames(Arrays.asList(
                "users",           // Базовая информация о пользователях
                "userProfiles",    // Полные профили пользователей
                "userChecks",      // Результаты проверок username
                "emailChecks",     // Результаты проверок email
                "products",        // Кэш для продуктов
                "orders",          // Кэш для заказов
                "cart"            // Кэш для корзины
        ));

        // Создаем билдер с разными настройками для разных кэшей
        Caffeine<Object, Object> caffeineBuilder = Caffeine.newBuilder();

        // Настраиваем дефолтные параметры
        caffeineBuilder
                .expireAfterWrite(10, TimeUnit.MINUTES)
                .maximumSize(500)
                .recordStats();

        cacheManager.setCaffeine(caffeineBuilder);

        // Настраиваем специфичные кэши
        cacheManager.registerCustomCache("products",
                Caffeine.newBuilder()
                        .expireAfterWrite(2, TimeUnit.HOURS)
                        .maximumSize(500)
                        .recordStats()
                        .build()
        );
        cacheManager.registerCustomCache("orders",
                Caffeine.newBuilder()
                        .expireAfterWrite(1, TimeUnit.HOURS)
                        .maximumSize(500)
                        .recordStats()
                        .build()
        );
        return cacheManager;
    }

    @Bean
    public CacheMetrics cacheMetrics(CacheManager cacheManager) {
        return new CacheMetrics(cacheManager);
    }
}

class CacheMetrics {
    private final CacheManager cacheManager;

    public CacheMetrics(CacheManager cacheManager) {
        this.cacheManager = cacheManager;
    }

    public void logCacheStatistics() {
        CaffeineCacheManager caffeineCacheManager = (CaffeineCacheManager) cacheManager;
        caffeineCacheManager.getCacheNames().forEach(cacheName -> {
            var nativeCache = caffeineCacheManager.getCache(cacheName).getNativeCache();
            var stats = ((com.github.benmanes.caffeine.cache.Cache<?, ?>) nativeCache).stats();

            System.out.printf("""
                            Cache: %s
                            Hit rate: %.2f
                            Miss rate: %.2f
                            Load success count: %d
                            Load failure count: %d
                            Total load time: %d ms
                            Eviction count: %d
                            """,
                    cacheName,
                    stats.hitRate(),
                    stats.missRate(),
                    stats.loadSuccessCount(),
                    stats.loadFailureCount(),
                    stats.totalLoadTime() / 1_000_000,
                    stats.evictionCount()
            );
        });
    }
} 