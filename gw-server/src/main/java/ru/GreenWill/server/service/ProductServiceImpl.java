package ru.GreenWill.server.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.GreenWill.Dto.model.Product.ProductOutDto;
import ru.GreenWill.server.mapper.ProductMapper;
import ru.GreenWill.server.repository.ProductRepository;

import java.util.List;
@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService{

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    @Override
    public List<ProductOutDto> getAll() {

        return productRepository.findAll().stream().map(productMapper::toProductOutDto).toList();
    }
}
