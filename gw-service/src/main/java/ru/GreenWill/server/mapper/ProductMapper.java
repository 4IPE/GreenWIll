package ru.GreenWill.server.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import ru.GreenWill.Dto.model.Product.ProductDto;
import ru.GreenWill.Dto.model.Product.ProductOutDto;
import ru.GreenWill.server.model.Product;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProductMapper {

    Product toProduct(ProductDto productDto);
    ProductOutDto toProductOutDto(Product product);
}
