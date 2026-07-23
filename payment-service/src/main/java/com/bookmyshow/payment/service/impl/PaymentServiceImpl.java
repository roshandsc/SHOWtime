package com.bookmyshow.payment.service.impl;

import com.bookmyshow.payment.entity.Payment;
import com.bookmyshow.payment.repository.PaymentRepository;
import com.bookmyshow.payment.service.PaymentService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository repo;

    public PaymentServiceImpl(PaymentRepository r) {
        this.repo = r;
    }

    @Override
    public Payment processPayment(Payment payment) {
        if (payment.getTransactionId() == null || payment.getTransactionId().isBlank()) {
            payment.setTransactionId("TXN-" + UUID.randomUUID().toString().substring(0, 10).toUpperCase());
        }
        if (payment.getPaymentTime() == null) {
            payment.setPaymentTime(LocalDateTime.now());
        }
        if (payment.getStatus() == null || payment.getStatus().isBlank()) {
            payment.setStatus("SUCCESS");
        }
        return repo.save(payment);
    }

    @Override
    public Payment getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment record not found with id: " + id));
    }

    @Override
    public Payment getByBookingId(Long bookingId) {
        return repo.findByBookingId(bookingId)
                .orElseThrow(() -> new RuntimeException("Payment record not found for booking id: " + bookingId));
    }

    @Override
    public Payment getByTransactionId(String transactionId) {
        return repo.findByTransactionId(transactionId)
                .orElseThrow(() -> new RuntimeException("Payment record not found for txn: " + transactionId));
    }

    @Override
    public List<Payment> getByUserId(Long userId) {
        return repo.findByUserId(userId);
    }

    @Override
    public Payment refund(String transactionId) {
        Payment payment = getByTransactionId(transactionId);
        payment.setStatus("REFUNDED");
        return repo.save(payment);
    }
}
