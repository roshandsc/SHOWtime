package com.bookmyshow.payment.service;

import com.bookmyshow.payment.entity.Payment;

import java.util.List;

public interface PaymentService {
    Payment processPayment(Payment payment);
    Payment getById(Long id);
    Payment getByBookingId(Long bookingId);
    Payment getByTransactionId(String transactionId);
    List<Payment> getByUserId(Long userId);
    Payment refund(String transactionId);
}
