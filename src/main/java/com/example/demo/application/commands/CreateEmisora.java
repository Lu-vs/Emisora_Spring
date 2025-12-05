package com.example.demo.application.commands;

import com.example.demo.domain.Emisora;
import com.example.demo.repository.EmisoraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
@RequestMapping("/emisoras")
public class CreateEmisora {

    @Autowired
    private EmisoraRepository emisoraRepository;

    @PostMapping
    public ResponseEntity<?> crearEmisora(@RequestBody Emisora emisora) {
        
        // VALIDAR REGLAS DE NEGOCIO ANTES DE GUARDAR
        Map<String, String> errores = validarEmisora(emisora);
        
        if (!errores.isEmpty()) {
            return ResponseEntity.badRequest().body(errores);
        }
        
        Emisora nuevaEmisora = emisoraRepository.save(emisora);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaEmisora);
    }
    
    private Map<String, String> validarEmisora(Emisora emisora) {
        Map<String, String> errores = new HashMap<>();
        
        // 1. Validar que tenga al menos una banda
        if (!emisora.tieneBandaFm() && !emisora.tieneBandaAm()) {
            errores.put("banda", "La emisora debe tener al menos una banda (FM o AM)");
        }
        
        // 2. Validar que tenga horario si está activa
        if (!emisora.estaActiva()) {
            errores.put("horario", "La emisora debe tener un horario definido");
        }
        
        // 3. Validar que no tenga ambas bandas con valores inválidos
        if (emisora.tieneBandaFm() && emisora.getBandaFm() != null) {
            try {
                double bandaFm = Double.parseDouble(emisora.getBandaFm());
                if (bandaFm < 87.5 || bandaFm > 108.0) {
                    errores.put("bandaFm", "La banda FM debe estar entre 87.5 y 108.0 MHz");
                }
            } catch (NumberFormatException e) {
                errores.put("bandaFm", "Formato inválido para banda FM");
            }
        }
        
        return errores;
    }
}
