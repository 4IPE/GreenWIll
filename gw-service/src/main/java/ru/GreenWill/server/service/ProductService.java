package ru.GreenWill.server.service;


import ru.GreenWill.Dto.model.Product.ProductOutDto;

import java.util.List;

public interface ProductService {
    List<ProductOutDto> getAll();
}
