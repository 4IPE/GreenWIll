package ru.GreenWill.server.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "locations")
@Getter
@Setter
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String city;
    
    @Column(nullable = false)
    private String street;
    
    @Column(nullable = false)
    private String house;
    
    @Column
    private String apartment;
    
    @Column
    private Integer floor;
    
    @Column
    private Integer entrance;
    
    @Column
    private Double latitude;
    
    @Column
    private Double longitude;
} 