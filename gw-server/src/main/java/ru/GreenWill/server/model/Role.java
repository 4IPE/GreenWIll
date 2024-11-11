package ru.GreenWill.server.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ru.GreenWill.server.enumarated.RoleName;


import java.util.HashSet;
import java.util.Set;

/**
 * Класс, представляющий сущность роли пользователя в системе.
 *
 * <p>Каждая роль может быть связана с несколькими пользователями через таблицу
 * "roles_users". Роли определяются с использованием перечисления {@link RoleName}.
 * </p>
 *
 * @author Даниил
 * @version 1.0
 * @since 2024
 */
@Entity
@Table(name = "roles")
@Getter
@Setter
public class Role {

    /**
     * Уникальный идентификатор роли.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Название роли, представленное как перечисление {@link RoleName}.
     */
    @Column
    @Enumerated(EnumType.STRING)
    private RoleName role;

    /**
     * Множество пользователей, обладающих данной ролью.
     * Связь осуществляется через таблицу "roles_users".
     */
    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinTable(name = "roles_users",
            joinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"))
    private Set<User> users = new HashSet<User>();
}
