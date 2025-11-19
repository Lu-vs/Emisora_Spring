package com.example.demo.repository;

import com.example.demo.domain.Emisora;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmisoraRepository extends JpaRepository<Emisora, Integer> {
    
    // ejemplo pal documento :p
    @Query("SELECT e FROM Emisora e WHERE e.numLocutores >= :minLocutores")
    List<Emisora> findByMinLocutores(@Param("minLocutores") Integer minLocutores);
    
}
