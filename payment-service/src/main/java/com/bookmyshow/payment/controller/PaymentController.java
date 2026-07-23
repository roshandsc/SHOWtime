package com.bookmyshow.payment.controller;

import com.bookmyshow.payment.entity.Payment;
import com.bookmyshow.payment.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    private final PaymentService service;

    public PaymentController(PaymentService s) {
        this.service = s;
    }

    @PostMapping({"", "/process"})
    public ResponseEntity<Payment> processPayment(@RequestBody Payment payment) {
        return ResponseEntity.ok(service.processPayment(payment));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Payment> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<Payment> getByBookingId(@PathVariable Long bookingId) {
        return ResponseEntity.ok(service.getByBookingId(bookingId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Payment>> getByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getByUserId(userId));
    }

    @GetMapping("/{transactionId}/status")
    public ResponseEntity<Payment> getStatus(@PathVariable String transactionId) {
        return ResponseEntity.ok(service.getByTransactionId(transactionId));
    }

    @PostMapping("/{transactionId}/refund")
    public ResponseEntity<Payment> refund(@PathVariable String transactionId) {
        return ResponseEntity.ok(service.refund(transactionId));
    }
}
