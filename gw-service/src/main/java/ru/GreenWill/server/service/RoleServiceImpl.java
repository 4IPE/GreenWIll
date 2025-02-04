package ru.GreenWill.server.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.GreenWill.Dto.model.RoleDto;
import ru.GreenWill.server.enumarated.RoleName;
import ru.GreenWill.server.exception.ResourceNotFoundException;
import ru.GreenWill.server.mapper.RoleMapper;
import ru.GreenWill.server.model.Role;
import ru.GreenWill.server.repository.RoleRepository;
import ru.GreenWill.server.service.inteface.RoleService;
import ru.GreenWill.server.service.inteface.UserService;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleMapper roleMapper;
    private final RoleRepository roleRepository;
    private final UserService userService;

    @Transactional
    @Override
    public void saveRole(RoleDto role) {
        roleMapper.toRole(role);
    }


    @Override
    public Role getRoleWithName(RoleName name) {
        return roleRepository.findByRole(name).orElseThrow(()->new ResourceNotFoundException("Роль была не найдена"));
    }

    @Override
    public void updateRoleWithUser(String username, String roleName){
        RoleName roleNameEnum = RoleName.valueOf(roleName);
        Role role = getRoleWithName(roleNameEnum);
        userService.updateUserRole(username,role);
    }

}
