package ru.GreenWill.server.service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.GreenWill.server.enumarated.ConsentType;
import ru.GreenWill.server.model.UserConsent;
import ru.GreenWill.server.repository.UserConsentRepository;
import ru.GreenWill.server.service.inteface.UserService;

import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
public class UserConsentService {
    
    private final UserConsentRepository consentRepository;
    private final UserService userService;


    public void saveUserConsent(String username, HttpServletRequest request) {
        UserConsent consent = new UserConsent();
        consent.setUser(userService.getUserByUsername(username));
        consent.setConsentType(ConsentType.PRIVACY_POLICY);
        consent.setAcceptedAt(LocalDateTime.now());
        consent.setIpAddress(request.getRemoteAddr());
        consent.setUserAgent(request.getHeader("User-Agent"));
        consent.setConsentVersion("1.0");

        consentRepository.save(consent);
    }
} 