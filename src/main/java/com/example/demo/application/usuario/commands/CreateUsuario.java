package com.example.demo.application.usuario.commands;

import com.example.demo.domain.Usuario;
import com.example.demo.repository.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
public class CreateUsuario {

  @Autowired
  private UsuarioRepository usuarioRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @PostMapping
  public ResponseEntity<?> crearUsuario(@Valid @RequestBody Usuario usuario) {
    if (usuarioRepository.existsByEmail(usuario.getEmail())) {
      return ResponseEntity.badRequest().body("El email ya está registrado");
    }

    // Encriptar contraseña antes de guardar
    usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
    Usuario usuarioGuardado = usuarioRepository.save(usuario);

    return ResponseEntity.status(HttpStatus.CREATED).body(usuarioGuardado);
  }
}
