package ru.GreenWill.server.service.inteface;


import ru.GreenWill.Dto.model.Product.ProductOutDto;

import java.util.List;

public interface ProductService {
    List<ProductOutDto> getAll();
}
