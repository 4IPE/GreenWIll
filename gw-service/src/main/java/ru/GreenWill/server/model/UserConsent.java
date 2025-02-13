package ru.GreenWill.server.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ru.GreenWill.server.enumarated.ConsentType;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_consents")
@Getter
@Setter
public class UserConsent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "consent_type")
    @Enumerated(EnumType.STRING)
    private ConsentType consentType;

    @Column(name = "accepted_at")
    private LocalDateTime acceptedAt;

    @Column(name = "ip_address")
    private String ipAddress;

    @Column(name = "user_agent")
    private String userAgent;

    @Column(name = "consent_version")
    private String consentVersion;
}