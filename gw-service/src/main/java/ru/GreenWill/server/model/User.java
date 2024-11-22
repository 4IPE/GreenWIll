package ru.GreenWill.server.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

/**
 * Класс, представляющий пользователя в системе.
 *
 * <p>Пользователь может иметь несколько ролей и проектов. Каждая роль и проект
 * связаны с пользователем через соответствующие таблицы.</p>
 *
 * @author Даниил
 * @version 1.0
 * @since 2024
 */
@Entity
@Table(name = "users")
@Getter
@Setter
public class User {

    /**
     * Уникальный идентификатор пользователя.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Имя пользователя, используемое для аутентификации.
     */
    @Column
    private String username;

    /**
     * Пароль пользователя для аутентификации.
     *
     * <p>Рекомендуется хранить пароль в зашифрованном виде.</p>
     */
    @Column
    private String password;

    /**
     * Множество ролей, назначенных пользователю.
     * Связь осуществляется через таблицу "roles_users".
     */
    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinTable(name = "roles_users",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private Set<Role> roles = new HashSet<Role>();


}
