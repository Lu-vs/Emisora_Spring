package com.example.demo.application.commands;

import com.example.demo.repository.EmisoraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
@RequestMapping("/emisoras")
public class DeleteEmisora {

    @Autowired
    private EmisoraRepository emisoraRepository;

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarEmisora(@PathVariable Integer id) {
        return emisoraRepository.findById(id)
            .map(emisora -> {
                emisoraRepository.delete(emisora);
                
                Map<String, String> response = new HashMap<>();
                response.put("message", "Emisora eliminada correctamente");
                response.put("id", id.toString());
                
                return ResponseEntity.ok(response);
            })
            .orElse(ResponseEntity.notFound().build());
    }
}
