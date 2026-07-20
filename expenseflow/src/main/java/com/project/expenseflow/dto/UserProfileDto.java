package com.project.expenseflow.dto;

public class UserProfileDto {

    private String fullName;
    private String email;
    private String phone;

    public UserProfileDto() {
    }

    public UserProfileDto(String fullName, String email, String phone) {
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;

    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
