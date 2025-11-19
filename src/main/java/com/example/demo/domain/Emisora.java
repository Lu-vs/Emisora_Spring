package com.example.demo.domain;

import lombok.*;
import jakarta.persistence.*;

@Entity
@Table(name = "emisoras")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Emisora {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;  // Long a Integer
    
    @Column(name = "nombre", nullable = false, columnDefinition = "TEXT")
    private String nombre;
    
    @Column(name = "canal", nullable = false, columnDefinition = "TEXT")
    private String canal;
    
    @Column(name = "banda_fm", columnDefinition = "TEXT")
    private String bandaFm;  // de Double a String
    
    @Column(name = "banda_am", columnDefinition = "TEXT")
    private String bandaAm;  //Integer a String
    
    @Column(name = "num_locutores", nullable = false)
    private Integer numLocutores;
    
    @Column(name = "genero", nullable = false, columnDefinition = "TEXT")
    private String genero;
    
    @Column(name = "horario", nullable = false, columnDefinition = "TEXT")
    private String horario;  
    
    @Column(name = "patrocinador", nullable = false, columnDefinition = "TEXT")
    private String patrocinador;  
    
    @Column(name = "pais", nullable = false, columnDefinition = "TEXT")
    private String pais;
    
    @Column(name = "descripcion", nullable = false, columnDefinition = "TEXT")
    private String descripcion;
    
    @Column(name = "num_programas", nullable = false)
    private Integer numProgramas;
    
    @Column(name = "num_ciudades", nullable = false)
    private Integer numCiudades;
    
   
    // Métodos de negocio
    public boolean estaActiva() {
        return horario != null && !horario.trim().isEmpty();
    }
    
    public boolean tieneBandaFm() {
        return bandaFm != null && !bandaFm.trim().isEmpty();
    }
    
    public boolean tieneBandaAm() {
        return bandaAm != null && !bandaAm.trim().isEmpty();
    }
}
