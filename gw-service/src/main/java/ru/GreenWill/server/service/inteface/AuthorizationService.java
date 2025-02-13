package ru.GreenWill.server.service.inteface;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import ru.GreenWill.Dto.model.User.UserSingInDto;
import ru.GreenWill.Dto.model.User.UserSingUpDto;

public interface AuthorizationService {



    @Transactional
    void singUp(UserSingUpDto userSingUpDto, HttpServletResponse response, HttpServletRequest request);

    @Transactional
    void singIn(UserSingInDto request, HttpServletResponse response);


    void logout(HttpServletResponse response);


    void createAndSendKeyAuthForUser(String username, String email);


    void finalizeLogin(String username, String key, HttpServletResponse response);

    boolean checkVerAccount(String username, String key, HttpServletResponse response);
}
