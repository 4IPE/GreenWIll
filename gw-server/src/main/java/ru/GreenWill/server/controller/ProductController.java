package ru.GreenWill.server.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.GreenWill.Dto.model.Product.ProductOutDto;
import ru.GreenWill.server.service.ProductService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/gw-service/product")
@Validated
@Slf4j
public class ProductController {

    private final ProductService productService;

    @GetMapping("/all")
    private ResponseEntity<List<ProductOutDto>> getAll(){
        return ResponseEntity.ok().body(productService.getAll());
    }
}
