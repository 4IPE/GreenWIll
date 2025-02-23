package ru.GreenWill.Dto.model.User;

import lombok.Data;

@Data
public class UserNutritionDto {
    private int age;
    private double weight;
    private double height;
    private String gender;
    private String goal;
    private String activityLevel;
} 