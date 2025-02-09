package ru.GreenWill.server.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import ru.GreenWill.Dto.model.User.UserDto;
import ru.GreenWill.Dto.model.User.UserEmail;
import ru.GreenWill.Dto.model.User.UserOutDto;
import ru.GreenWill.server.model.User;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = {RoleMapper.class,LocationMapper.class})

public interface UserMapper {

    User toUser(UserDto userDto);

    UserOutDto toUserOutDto(User user);

    UserEmail toUserEmail (User user);
}
