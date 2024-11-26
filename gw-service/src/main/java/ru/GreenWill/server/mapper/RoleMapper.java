package ru.GreenWill.server.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import ru.GreenWill.Dto.model.RoleDto;
import ru.GreenWill.server.enumarated.RoleName;
import ru.GreenWill.server.model.Role;

import java.util.Set;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface RoleMapper {

    Role toRole(RoleDto roleDto);


    RoleDto toRoleDto(Role role);


    Set<RoleDto> toSetRoleDto(Set<Role> role);

    default String mapRoleNameToString(Role role) {
        return role != null ? role.getRole().toString() : null;
    }

    default RoleName mapStringToRoleName(String role) {
        return role != null ? RoleName.valueOf(role) : null;
    }
}
