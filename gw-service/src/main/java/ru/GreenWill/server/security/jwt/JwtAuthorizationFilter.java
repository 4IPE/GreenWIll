package ru.GreenWill.server.security.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;

import jakarta.servlet.http.Cookie;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        // Пропускаем публичные URL
        if (request.getRequestURI().startsWith("/login") || request.getRequestURI().startsWith("/register") ||
                request.getRequestURI().startsWith("/products/all") || request.getRequestURI().startsWith("/user/status") ||
                request.getRequestURI().startsWith("/user/check-email") || request.getRequestURI().startsWith("/user/check") ||
                request.getRequestURI().startsWith("/user/check-phone") || request.getRequestURI().startsWith("/login/verify") ||
                request.getRequestURI().startsWith("/user/get") || request.getRequestURI().startsWith("/req/password") ||
                request.getRequestURI().startsWith("/edit/accepted")||request.getRequestURI().startsWith("/create")||request.getRequestURI().startsWith("/check")) {
            filterChain.doFilter(request, response);
            return;
        }

        if (request.getRequestURI().startsWith("/edit/password")) {
            String token = jwtTokenProvider.resolveTokenForSmallVal(request);
            if (!jwtTokenProvider.validateToken(token)) {
                SecurityContextHolder.clearContext();
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
            String email = jwtTokenProvider.getVal(token);
            SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(email, null, new ArrayList<>())
            );
            filterChain.doFilter(request, response);
            return;
        }

        String token = jwtTokenProvider.resolveToken(request);
        if (token != null && jwtTokenProvider.validateToken(token)) {
            String username = jwtTokenProvider.getVal(token);
            SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(username, null, new ArrayList<>())
            );
        } else {
            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(request, response);
    }
}

