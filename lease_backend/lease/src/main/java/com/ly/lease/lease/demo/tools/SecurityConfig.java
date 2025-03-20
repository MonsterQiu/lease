package com.ly.lease.lease.demo.tools;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    // Use SecurityFilterChain to configure HTTP security
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Configure authorization for various URL patterns
                .authorizeHttpRequests(authz ->
                        authz
                                .requestMatchers("/", "/home", "/public/**").permitAll()  // Allow public access
                                .anyRequest().authenticated()  // All other requests need to be authenticated
                )
                // Enable form login
                .formLogin(form ->
                        form
                                .loginPage("/login") // Optional: specify a custom login page URL
                                .permitAll() // Allow everyone to access the login page
                )
                // Enable logout
                .logout(LogoutConfigurer::permitAll // Allow everyone to access the logout
                );

        return http.build(); // Build the security filter chain
    }
}
