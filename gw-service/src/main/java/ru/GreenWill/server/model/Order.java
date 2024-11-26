package ru.GreenWill.server.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ru.GreenWill.server.enumarated.Status;

@Entity
@Table(name = "orders")
@Getter
@Setter
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
    @OneToOne
    @JoinColumn(name = "cart_id", referencedColumnName = "id")
    private Cart cart;
    @Column
    @Enumerated(EnumType.STRING)
    private Status status;
}
