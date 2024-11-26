package ru.GreenWill.server.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.GreenWill.Dto.model.RoleDto;
import ru.GreenWill.server.enumarated.RoleName;
import ru.GreenWill.server.mapper.RoleMapper;
import ru.GreenWill.server.model.Role;
import ru.GreenWill.server.repository.RoleRepository;
import ru.GreenWill.server.service.inteface.RoleService;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleMapper roleMapper;
    private final RoleRepository roleRepository;

    @Transactional
    @Override
    public void saveRole(RoleDto role) {
        roleMapper.toRole(role);
    }


    @Override
    public Role getRoleWithName(RoleName name) {
        return roleRepository.findByRole(name);
    }

}
