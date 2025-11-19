package com.example.demo.application.commands;

import com.example.demo.domain.Emisora;
import com.example.demo.repository.EmisoraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
public class FindEmisora{


    @Autowired
    private EmisoraRepository emisoraRepository;

    @GetMapping("/emisoras/{id}")
    public ResponseEntity<Emisora> obtenerPorId(@PathVariable Integer id) {
        return emisoraRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}

