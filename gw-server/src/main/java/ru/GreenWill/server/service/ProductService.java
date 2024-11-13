package ru.GreenWill.server.service;


import ru.GreenWill.Dto.model.Product.ProductDto;
import ru.GreenWill.Dto.model.Product.ProductOutDto;
import ru.GreenWill.server.model.Product;

import java.util.List;

public interface ProductService {
    List<ProductOutDto> getAll();
}
