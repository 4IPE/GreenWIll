package ru.GreenWill.server.model;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "products")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String name;
    @Column
    private String description;
    @Column
    private Integer price;
    @Column
    private Integer calories;
    @Column
    private String category;
    @Column
    private String img;

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", price=" + price +
                ", calories=" + calories +
                ", category='" + category + '\'' +
                ", img='" + img + '\'' +
                '}';
    }
}
