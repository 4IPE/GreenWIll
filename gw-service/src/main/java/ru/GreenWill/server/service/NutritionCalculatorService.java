package ru.GreenWill.server.service;

import org.springframework.stereotype.Service;
import ru.GreenWill.Dto.model.User.UserNutritionDto;

@Service
public class NutritionCalculatorService {
    
    public NutritionPlan calculateDailyNeeds(UserNutritionDto user) {
        // Формула Миффлина-Сан Жеора для базового метаболизма (BMR)
        double bmr;
        if (user.getGender().equals("MALE")) {
            bmr = 10 * user.getWeight() + 6.25 * user.getHeight() - 5 * user.getAge() + 5;
        } else {
            bmr = 10 * user.getWeight() + 6.25 * user.getHeight() - 5 * user.getAge() - 161;
        }

        // Учитываем уровень активности
        double tdee = switch (user.getActivityLevel()) {
            case "LOW" -> bmr * 1.2;
            case "MEDIUM" -> bmr * 1.55;
            case "HIGH" -> bmr * 1.725;
            default -> bmr * 1.2;
        };

        // Корректируем калории в зависимости от цели
        double targetCalories = switch (user.getGoal()) {
            case "LOSE_WEIGHT" -> tdee * 0.85;    // Дефицит 15%
            case "GAIN_WEIGHT" -> tdee * 1.15;    // Профицит 15%
            default -> tdee;                       // Поддержание веса
        };

        return new NutritionPlan(
            (int) targetCalories,
            (int) (targetCalories * 0.3),  // 30% на завтрак
            (int) (targetCalories * 0.4),  // 40% на обед
            (int) (targetCalories * 0.3)   // 30% на ужин
        );
    }
}

record NutritionPlan(
    int totalCalories,
    int breakfastCalories,
    int lunchCalories,
    int dinnerCalories
) {} 