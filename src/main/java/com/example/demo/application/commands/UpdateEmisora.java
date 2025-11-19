package com.example.demo.application.commands;



import com.example.demo.domain.Emisora;
import com.example.demo.repository.EmisoraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/emisoras")
public class UpdateEmisora {

    @Autowired
    private EmisoraRepository emisoraRepository;

    @PutMapping("/{id}")
    public ResponseEntity<Emisora> actualizarEmisora(@PathVariable Integer id, 
                                                    @RequestBody Emisora emisoraActualizada) {
        return emisoraRepository.findById(id)
            .map(emisoraExistente -> {
                // Actualizar solo los campos que permitimos modificar
                emisoraExistente.setNombre(emisoraActualizada.getNombre());
                emisoraExistente.setCanal(emisoraActualizada.getCanal());
                emisoraExistente.setBandaFm(emisoraActualizada.getBandaFm());
                emisoraExistente.setBandaAm(emisoraActualizada.getBandaAm());
                emisoraExistente.setNumLocutores(emisoraActualizada.getNumLocutores());
                emisoraExistente.setGenero(emisoraActualizada.getGenero());
                emisoraExistente.setHorario(emisoraActualizada.getHorario());
                emisoraExistente.setPatrocinador(emisoraActualizada.getPatrocinador());
                emisoraExistente.setPais(emisoraActualizada.getPais());
                emisoraExistente.setDescripcion(emisoraActualizada.getDescripcion());
                emisoraExistente.setNumProgramas(emisoraActualizada.getNumProgramas());
                emisoraExistente.setNumCiudades(emisoraActualizada.getNumCiudades());
                
                Emisora emisoraGuardada = emisoraRepository.save(emisoraExistente);
                return ResponseEntity.ok(emisoraGuardada);
            })
            .orElse(ResponseEntity.notFound().build());
    }
}
