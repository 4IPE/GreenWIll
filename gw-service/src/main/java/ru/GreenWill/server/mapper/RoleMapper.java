package ru.GreenWill.server.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import ru.GreenWill.Dto.model.RoleDto;
import ru.GreenWill.server.enumarated.RoleName;
import ru.GreenWill.server.model.Role;


import java.util.Set;

/**
 * Интерфейс для маппинга объектов класса Role и его DTO.
 *
 * <p>Содержит методы для преобразования сущностей Role в различные представления DTO и обратно.</p>
 *
 * @version 1.0
 * @see Role
 * @see RoleDto
 *
 * <p>Основной используемый компонент - Spring.</p>
 * @since 2024
 */
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface RoleMapper {

    /**
     * Преобразует объект RoleDto в Role.
     *
     * @param roleDto DTO роли для преобразования
     * @return объект Role
     */
    Role toRole(RoleDto roleDto);

    /**
     * Преобразует объект Role в RoleDto.
     *
     * @param role роль для преобразования
     * @return объект RoleDto
     */
    RoleDto toRoleDto(Role role);

    /**
     * Преобразует множество объектов Role в множество RoleDto.
     *
     * @param role роли для преобразования
     * @return множество RoleDto
     */
    Set<RoleDto> toSetRoleDto(Set<Role> role);

    /**
     * Преобразует имя роли в строку.
     *
     * @param role объект Role для преобразования
     * @return строковое представление роли или null, если роль отсутствует
     */
    default String mapRoleNameToString(Role role) {
        return role != null ? role.getRole().toString() : null;
    }

    /**
     * Преобразует строку в объект RoleName.
     *
     * @param role строковое представление роли
     * @return объект RoleName или null, если строка пустая
     */
    default RoleName mapStringToRoleName(String role) {
        return role != null ? RoleName.valueOf(role) : null;
    }
}
