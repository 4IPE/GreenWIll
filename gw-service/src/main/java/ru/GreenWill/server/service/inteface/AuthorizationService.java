package ru.GreenWill.server.service.inteface;


import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import ru.GreenWill.Dto.model.User.UserSingInDto;
import ru.GreenWill.Dto.model.User.UserSingUpDto;

public interface AuthorizationService {


    @Transactional
    void singUp(UserSingUpDto request, HttpServletResponse response);

    @Transactional
    void singIn(UserSingInDto request, HttpServletResponse response);
}
