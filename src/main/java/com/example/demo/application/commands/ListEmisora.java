package com.example.demo.application.commands;

import com.example.demo.domain.Emisora;
import com.example.demo.repository.EmisoraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
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
