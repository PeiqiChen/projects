package com.onlineshopping.dto.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.web.bind.annotation.RequestParam;


@Data
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserCreationRequest {
    @NotBlank(message = "username cannot be blank")
    String username;
    @NotBlank(message = "name cannot be blank")
    String name;
    @NotBlank(message = "password cannot be blank")
    String password;
}
