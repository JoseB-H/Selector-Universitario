package com.example.SeleccionUniversitaria.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;



@Controller
public class VistaController {
    @GetMapping("/")
    public String index() {
        return "index"; 
    }

    @GetMapping("/TestVocacional")
    public String testVocacional() {
        return "TestVocacional"; 
    }

    @GetMapping("/ComenzarTest")
    public String ComenzarTest() {
        return "ComenzarTest";
    }
    
}