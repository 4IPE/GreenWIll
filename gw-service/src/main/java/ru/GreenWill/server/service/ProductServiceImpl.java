package ru.GreenWill.server.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.GreenWill.Dto.model.Product.ProductDtoSave;
import ru.GreenWill.Dto.model.Product.ProductOutDto;
import ru.GreenWill.server.mapper.ProductMapper;
import ru.GreenWill.server.model.Product;
import ru.GreenWill.server.repository.ProductRepository;
import ru.GreenWill.server.service.inteface.ProductService;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    @Override
    public List<ProductOutDto> getAll() {

        return productRepository.findAll().stream().map(productMapper::toProductOutDto).toList();
    }

    @Override
    public void saveProduct(ProductDtoSave productDtoSave){
        Product product = productMapper.toProductForSave(productDtoSave);
        productRepository.save(product);
    }

}
