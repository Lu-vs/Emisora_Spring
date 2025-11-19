package com.example.demo.application.usuario.commands;

import com.example.demo.domain.Usuario;
import com.example.demo.repository.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
public class UpdateUsuario {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(@PathVariable Integer id, 
                                                    @Valid @RequestBody Usuario usuarioActualizado) {
        return usuarioRepository.findById(id)
            .map(usuarioExistente -> {
                // Actualizar campos permitidos
                usuarioExistente.setNombre(usuarioActualizado.getNombre());
                usuarioExistente.setEmail(usuarioActualizado.getEmail());
                
                // Solo actualizar password si se proporciona una nueva
                if (usuarioActualizado.getPassword() != null && 
                    !usuarioActualizado.getPassword().trim().isEmpty()) {
                    usuarioExistente.setPassword(passwordEncoder.encode(usuarioActualizado.getPassword()));
                }
                
                Usuario usuarioGuardado = usuarioRepository.save(usuarioExistente);
                return ResponseEntity.ok(usuarioGuardado);
            })
            .orElse(ResponseEntity.notFound().build());
    }
}
