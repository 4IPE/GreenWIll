package ru.GreenWill.server.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ru.GreenWill.Dto.model.User.UserNutritionDto;
import ru.GreenWill.server.service.RecommendationServiceImpl;

@RestController
@RequiredArgsConstructor
public class NutritionController {
    private final RecommendationServiceImpl recommendationService;

    @PostMapping("/nutrition/plan")
    public ResponseEntity<?> getMealPlan(@RequestBody UserNutritionDto userDto) {
        return ResponseEntity.ok(recommendationService.getMealPlan(userDto));
    }
} 