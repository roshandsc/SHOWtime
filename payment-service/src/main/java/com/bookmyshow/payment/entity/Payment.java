package com.bookmyshow.payment.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long bookingId;
    private Long userId;
    private BigDecimal amount;
    private String paymentMethod;
    private String transactionId;
    private String status;
    private LocalDateTime paymentTime;

    public Payment() {}

    public Payment(Long id, Long bookingId, Long userId, BigDecimal amount, String paymentMethod, String transactionId, String status, LocalDateTime paymentTime) {
        this.id = id;
        this.bookingId = bookingId;
        this.userId = userId;
        this.amount = amount;
        this.paymentMethod = paymentMethod;
        this.transactionId = transactionId;
        this.status = status;
        this.paymentTime = paymentTime;
    }

    public static PaymentBuilder builder() {
        return new PaymentBuilder();
    }

    public static class PaymentBuilder {
        private Long id;
        private Long bookingId;
        private Long userId;
        private BigDecimal amount;
        private String paymentMethod;
        private String transactionId;
        private String status;
        private LocalDateTime paymentTime;

        public PaymentBuilder id(Long id) { this.id = id; return this; }
        public PaymentBuilder bookingId(Long bookingId) { this.bookingId = bookingId; return this; }
        public PaymentBuilder userId(Long userId) { this.userId = userId; return this; }
        public PaymentBuilder amount(BigDecimal amount) { this.amount = amount; return this; }
        public PaymentBuilder paymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; return this; }
        public PaymentBuilder transactionId(String transactionId) { this.transactionId = transactionId; return this; }
        public PaymentBuilder status(String status) { this.status = status; return this; }
        public PaymentBuilder paymentTime(LocalDateTime paymentTime) { this.paymentTime = paymentTime; return this; }

        public Payment build() {
            return new Payment(id, bookingId, userId, amount, paymentMethod, transactionId, status, paymentTime);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    public String getTransactionId() { return transactionId; }
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getPaymentTime() { return paymentTime; }
    public void setPaymentTime(LocalDateTime paymentTime) { this.paymentTime = paymentTime; }
}
