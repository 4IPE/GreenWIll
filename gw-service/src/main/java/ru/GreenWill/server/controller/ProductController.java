package ru.GreenWill.server.controller;

import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.GreenWill.Dto.model.Product.ProductDtoSave;
import ru.GreenWill.Dto.model.Product.ProductOutDto;
import ru.GreenWill.server.enumarated.RoleName;
import ru.GreenWill.server.service.inteface.ProductService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@Validated
@Slf4j
public class ProductController {
    private final ProductService productService;

    @GetMapping("/products/all")
    public ResponseEntity<List<ProductOutDto>> getAll() {
        List<ProductOutDto> products = productService.getAll();
        log.info("Fetched products: {}", products);
        return ResponseEntity.ok(products);
    }

    @PostMapping("/admin/add")
    public ResponseEntity<?> saveProducts(@RequestBody ProductDtoSave productDtoSave) {
        productService.saveProduct(productDtoSave);
        return ResponseEntity.ok().body("Success");
    }

}
