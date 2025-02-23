package ru.GreenWill.server.service;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import ru.GreenWill.Dto.model.Product.ProductOutDto;
import ru.GreenWill.Dto.model.User.UserNutritionDto;
import ru.GreenWill.server.mapper.ProductMapper;
import ru.GreenWill.server.repository.ProductRepository;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecommendationServiceImpl {
    private static final Logger log = LoggerFactory.getLogger(RecommendationServiceImpl.class);
    private final ProductRepository productRepository;
    private final NutritionCalculatorService calculatorService;
    private final ProductMapper productMapper;

    public MealPlan getMealPlan(UserNutritionDto user) {
        NutritionPlan nutritionPlan = calculatorService.calculateDailyNeeds(user);
        List<ProductOutDto> allProducts = productRepository.findAll()
            .stream()
            .map(productMapper::toProductOutDto)
            .collect(Collectors.toList());
        MealPlan mealPlan = new MealPlan(
                selectMeals(allProducts, nutritionPlan.breakfastCalories(), "breakfast"),
                selectMeals(allProducts, nutritionPlan.lunchCalories(), "main"),
                selectMeals(allProducts, nutritionPlan.dinnerCalories(), "dinner")
        );
        log.info(mealPlan.toString());
        return mealPlan;
    }

    private List<ProductOutDto> selectMeals(List<ProductOutDto> products, int targetCalories, String mealType) {
        log.debug("Selecting meals for: {} with target calories: {}", mealType, targetCalories);
        
        // Фильтруем продукты в зависимости от приема пищи
        List<ProductOutDto> suitableProducts = switch (mealType.toLowerCase()) {
            case "breakfast" -> products.stream()
                .filter(p -> (
                    p.category().equalsIgnoreCase("Напитки") ||
                    p.category().equalsIgnoreCase("Перекус") ||
                    p.category().equalsIgnoreCase("Десерты")
                ))
                .collect(Collectors.toList());
                
            case "main" -> products.stream()
                .filter(p -> (
                    p.category().equalsIgnoreCase("Смузи") ||
                    p.category().equalsIgnoreCase("Перекус") ||
                    p.category().equalsIgnoreCase("Основные блюда")
                ))
                .collect(Collectors.toList());
                
            case "dinner" -> products.stream()
                .filter(p -> (
                    p.category().equalsIgnoreCase("Смузи") ||
                    p.category().equalsIgnoreCase("Основные блюда")
                ))
                .collect(Collectors.toList());
                
            default -> products;
        };

        log.debug("Found {} suitable products for {}", suitableProducts.size(), mealType);

        List<ProductOutDto> selected = new ArrayList<>();
        int currentCalories = 0;

        // Сначала добавляем напиток, если это завтрак
        if (mealType.equalsIgnoreCase("breakfast")) {
            Optional<ProductOutDto> drink = suitableProducts.stream()
                .filter(p -> p.category().equalsIgnoreCase("Напитки") || 
                           p.category().equalsIgnoreCase("Смузи"))
                .findFirst();
                
            if (drink.isPresent()) {
                selected.add(drink.get());
                currentCalories += drink.get().calories();
                suitableProducts.remove(drink.get());
            }
        }

        while (currentCalories < targetCalories && !suitableProducts.isEmpty()) {
            ProductOutDto product = findBestFit(suitableProducts, targetCalories - currentCalories);
            if (product == null) break;

            selected.add(product);
            currentCalories += product.calories();
            suitableProducts.remove(product);
        }

        log.debug("Selected {} products with total calories: {}", selected.size(), currentCalories);
        return selected;
    }

    private ProductOutDto findBestFit(List<ProductOutDto> products, int remainingCalories) {
        log.debug("Finding best fit for remaining calories: {}", remainingCalories);
        return products.stream()
            .filter(p -> p.calories() <= remainingCalories)
            .peek(p -> log.debug("Candidate: {} with calories: {}", p.name(), p.calories()))
            .max(Comparator.comparingInt(ProductOutDto::calories))
            .orElse(null);
    }
}

record MealPlan(
    List<ProductOutDto> breakfast,
    List<ProductOutDto> lunch,
    List<ProductOutDto> dinner
) {} 