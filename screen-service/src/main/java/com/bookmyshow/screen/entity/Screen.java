package com.bookmyshow.screen.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "screens")
public class Screen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String theatreName;
    private String location;
    private int totalSeats;

    public Screen() {}

    public Screen(Long id, String name, String theatreName, String location, int totalSeats) {
        this.id = id;
        this.name = name;
        this.theatreName = theatreName;
        this.location = location;
        this.totalSeats = totalSeats;
    }

    public static ScreenBuilder builder() {
        return new ScreenBuilder();
    }

    public static class ScreenBuilder {
        private Long id;
        private String name;
        private String theatreName;
        private String location;
        private int totalSeats;

        public ScreenBuilder id(Long id) { this.id = id; return this; }
        public ScreenBuilder name(String name) { this.name = name; return this; }
        public ScreenBuilder theatreName(String theatreName) { this.theatreName = theatreName; return this; }
        public ScreenBuilder location(String location) { this.location = location; return this; }
        public ScreenBuilder totalSeats(int totalSeats) { this.totalSeats = totalSeats; return this; }

        public Screen build() {
            return new Screen(id, name, theatreName, location, totalSeats);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getTheatreName() { return theatreName; }
    public void setTheatreName(String theatreName) { this.theatreName = theatreName; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public int getTotalSeats() { return totalSeats; }
    public void setTotalSeats(int totalSeats) { this.totalSeats = totalSeats; }
}
