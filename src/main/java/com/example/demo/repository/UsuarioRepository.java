package com.example.demo.repository;

import com.example.demo.domain.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    
    // Equivalente a buscar por email
    Optional<Usuario> findByEmail(String email);
    
    // Verificar si existe por email
    boolean existsByEmail(String email);
    
    // Buscar por nombre (ignorando mayúsculas/minúsculas)
    List<Usuario> findByNombreContainingIgnoreCase(String nombre);
    

   }
