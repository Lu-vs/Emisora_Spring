package com.example.demo.application.commands;

import com.example.demo.domain.Emisora;
import com.example.demo.repository.EmisoraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
@RequestMapping("/emisoras")
public class ListEmisora {



    @Autowired
    private EmisoraRepository emisoraRepository;

    // SOLO ESTOS 2 ENDPOINTS
    @GetMapping
    public List<Emisora> listarTodas() {
        return emisoraRepository.findAll();
    



}
}
