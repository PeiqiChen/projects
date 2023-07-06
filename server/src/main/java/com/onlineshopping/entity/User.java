package com.onlineshopping.entity;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.aspectj.weaver.ast.Or;
import org.springframework.security.core.parameters.P;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="user")
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String password;

    @Column(name = "is_active", nullable = false)
    @JsonProperty
    private boolean isActive;

    @Column(name = "role", nullable = false)
    private int role;

    @JsonManagedReference
    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER, cascade = CascadeType.ALL) // LAZY because ibernate.loader.MultipleBagFetchException: cannot simultaneously fetch multiple bags
    @ToString.Exclude
    private List<Permission> permissions = new ArrayList<>();
    public void addPermission(Permission permission) {
        this.permissions.add(permission);
        permission.setUser(this);
    }

    @JsonManagedReference
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<Order> orders = new ArrayList<>();
    public void addOrder(Order order) {
        this.orders.add(order);
        order.setUser(this);
    }

    @JsonManagedReference
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL) // LAZY because ibernate.loader.MultipleBagFetchException: cannot simultaneously fetch multiple bags
    @ToString.Exclude
    private List<WatchList> watchLists = new ArrayList<>();
    public void addWatchList(WatchList watchList) {
        this.watchLists.add(watchList);
        watchList.setUser(this);
    }

}