package ru.GreenWill.server.controller;

import jakarta.annotation.security.PermitAll;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.GreenWill.Dto.model.Product.ProductOutDto;
import ru.GreenWill.server.service.inteface.ProductService;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@Validated
@Slf4j
public class ProductController {
    private final ProductService productService;

    @GetMapping("/all")
    @PermitAll
    public ResponseEntity<List<ProductOutDto>> getAll() {
        List<ProductOutDto> products = productService.getAll();
        log.info("Fetched products: {}", products);
        return ResponseEntity.ok(products);
    }


}
